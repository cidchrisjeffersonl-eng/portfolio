import webpush from "web-push";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Action = "get-settings" | "save-settings" | "save-push" | "remove-push" | "stock-alert";

type RequestBody = {
  action: Action;
  email?: string;
  phone?: string;
  smsEnabled?: boolean;
  smsConsent?: boolean;
  subscription?: {
    endpoint: string;
    keys: { p256dh: string; auth: string };
  };
  endpoint?: string;
  event?: {
    eventKey: string;
    ingredient: string;
    name?: string;
    status: "low" | "critical";
    level: number;
    unit: string;
  };
};

const required = (name: string) => {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing required server setting: ${name}`);
  return value;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function supabaseRequest(path: string, method: string, body?: unknown, prefer?: string) {
  const baseUrl = required("SUPABASE_URL").replace(/\/$/, "");
  const serviceRoleKey = required("SUPABASE_SERVICE_ROLE_KEY");
  const response = await fetch(`${baseUrl}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Supabase request failed (${response.status}): ${text}`);
  return text ? JSON.parse(text) : null;
}

async function verifyUser(request: Request) {
  const token = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const baseUrl = required("SUPABASE_URL").replace(/\/$/, "");
  const response = await fetch(`${baseUrl}/auth/v1/user`, {
    headers: {
      apikey: required("SUPABASE_ANON_KEY"),
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) return null;
  return await response.json() as { id: string; email?: string };
}

function isOwner(userId: string) {
  return userId === required("OWNER_USER_ID");
}

function isStockWriter(userId: string) {
  const ids = (Deno.env.get("STOCK_WRITER_USER_IDS") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  return userId === required("OWNER_USER_ID") || ids.includes(userId);
}

async function saveSettings(body: RequestBody, ownerId: string) {
  const enabled = body.smsEnabled === true;
  const phone = enabled ? body.phone?.trim() : null;
  if (enabled && (!body.smsConsent || !phone || !/^\+[1-9]\d{7,14}$/.test(phone))) {
    return json({ error: "Confirm SMS consent and provide a valid E.164 phone number." }, 400);
  }

  await supabaseRequest(
    "owner_alert_settings?on_conflict=owner_user_id",
    "POST",
    {
      owner_user_id: ownerId,
      sms_phone: phone,
      sms_enabled: enabled,
      sms_consent_at: enabled ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    },
    "resolution=merge-duplicates",
  );
  return json({ ok: true });
}

async function getSettings(ownerId: string) {
  const [settings, subscriptions] = await Promise.all([
    supabaseRequest(
      `owner_alert_settings?owner_user_id=eq.${encodeURIComponent(ownerId)}&select=sms_phone,sms_enabled`,
      "GET",
    ),
    supabaseRequest(
      `owner_push_subscriptions?owner_user_id=eq.${encodeURIComponent(ownerId)}&select=id`,
      "GET",
    ),
  ]) as [{ sms_phone: string | null; sms_enabled: boolean }[], { id: string }[]];
  return json({
    smsPhone: settings[0]?.sms_phone ?? "",
    smsEnabled: settings[0]?.sms_enabled ?? false,
    pushDeviceCount: subscriptions.length,
  });
}

async function savePush(body: RequestBody, ownerId: string) {
  const subscription = body.subscription;
  if (!subscription?.endpoint || !subscription.keys?.p256dh || !subscription.keys?.auth) {
    return json({ error: "A valid browser push subscription is required." }, 400);
  }
  await supabaseRequest(
    "owner_push_subscriptions?on_conflict=endpoint",
    "POST",
    {
      owner_user_id: ownerId,
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
    },
    "resolution=merge-duplicates",
  );
  return json({ ok: true });
}

async function sendSms(phone: string, message: string) {
  const accountSid = required("TWILIO_ACCOUNT_SID");
  const authToken = required("TWILIO_AUTH_TOKEN");
  const from = required("TWILIO_FROM_NUMBER");
  const form = new URLSearchParams({ To: phone, From: from, Body: message });
  const credentials = btoa(`${accountSid}:${authToken}`);
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form,
    },
  );
  if (!response.ok) throw new Error(`Twilio rejected the SMS (${response.status}).`);
}

async function sendPush(subscriptions: Record<string, unknown>[], message: string, eventKey: string) {
  const publicKey = required("VAPID_PUBLIC_KEY");
  const privateKey = required("VAPID_PRIVATE_KEY");
  const subject = required("VAPID_SUBJECT");
  webpush.setVapidDetails(subject, publicKey, privateKey);

  const failures: string[] = [];
  await Promise.all(subscriptions.map(async (row) => {
    const subscription = {
      endpoint: row.endpoint as string,
      keys: { p256dh: row.p256dh as string, auth: row.auth as string },
    };
    try {
      await webpush.sendNotification(
        subscription,
        JSON.stringify({
          title: "Lurk: low stock",
          body: message,
          url: "/lurk-pos-demo.html",
          tag: eventKey,
        }),
      );
    } catch (error) {
      const statusCode = (error as { statusCode?: number }).statusCode;
      if (statusCode === 404 || statusCode === 410) {
        await supabaseRequest(
          `owner_push_subscriptions?endpoint=eq.${encodeURIComponent(subscription.endpoint)}`,
          "DELETE",
        );
      } else {
        failures.push(error instanceof Error ? error.message : "Push delivery failed.");
      }
    }
  }));
  if (failures.length) throw new Error(failures.join("; "));
}

async function claimDelivery(eventKey: string, channel: "sms" | "push") {
  const result = await supabaseRequest(
    "rpc/claim_stock_alert_delivery",
    "POST",
    { p_event_key: eventKey, p_channel: channel },
  );
  return result === true;
}

async function finishDelivery(eventKey: string, channel: "sms" | "push", error?: string) {
  await supabaseRequest("rpc/finish_stock_alert_delivery", "POST", {
    p_event_key: eventKey,
    p_channel: channel,
    p_status: error ? "failed" : "sent",
    p_error: error ?? null,
  });
}

async function deliverStockAlert(body: RequestBody, ownerId: string) {
  const event = body.event;
  if (
    !event ||
    !/^[a-z0-9_-]+:[0-9]+:(low|critical)$/.test(event.eventKey) ||
    !/^[a-z0-9_-]+$/.test(event.ingredient) ||
    typeof event.name !== "string" ||
    !event.name.trim() ||
    event.name.length > 80 ||
    !["low", "critical"].includes(event.status) ||
    !Number.isFinite(event.level) ||
    event.level < 0 ||
    typeof event.unit !== "string" ||
    event.unit.length > 10
  ) {
    return json({ error: "Invalid low-stock event." }, 400);
  }

  await supabaseRequest(
    "stock_alert_events?on_conflict=event_key",
    "POST",
    {
      event_key: event.eventKey,
      ingredient: event.ingredient,
      status: event.status,
      level: event.level,
      unit: event.unit,
    },
    "resolution=ignore-duplicates",
  );

  const [settingsRows, subscriptions] = await Promise.all([
    supabaseRequest(
      `owner_alert_settings?owner_user_id=eq.${encodeURIComponent(ownerId)}&select=sms_phone,sms_enabled`,
      "GET",
    ) as Promise<{ sms_phone: string | null; sms_enabled: boolean }[]>,
    supabaseRequest(
      `owner_push_subscriptions?owner_user_id=eq.${encodeURIComponent(ownerId)}&select=endpoint,p256dh,auth`,
      "GET",
    ) as Promise<Record<string, unknown>[]>,
  ]);
  const settings = settingsRows[0];
  const message = `${event.name} is ${event.status} (${event.level} ${event.unit} left).`;
  const failures: string[] = [];
  const channels = [
    ...(settings?.sms_enabled && settings.sms_phone ? ["sms" as const] : []),
    ...(subscriptions.length ? ["push" as const] : []),
  ];

  await Promise.all(channels.map(async (channel) => {
    if (!await claimDelivery(event.eventKey, channel)) return;
    try {
      if (channel === "sms") await sendSms(settings.sms_phone!, message);
      else await sendPush(subscriptions, message, event.eventKey);
      await finishDelivery(event.eventKey, channel);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Delivery failed.";
      await finishDelivery(event.eventKey, channel, detail);
      failures.push(`${channel}: ${detail}`);
    }
  }));

  if (failures.length) return json({ error: failures.join("; ") }, 502);
  return json({ ok: true, channels });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);

  try {
    const user = await verifyUser(request);
    if (!user?.id) return json({ error: "Sign in with the configured Supabase account." }, 401);
    const body = await request.json() as RequestBody;

    switch (body.action) {
      case "get-settings":
        if (!isOwner(user.id)) return json({ error: "Only the configured owner can view alert settings." }, 403);
        return await getSettings(user.id);
      case "save-settings":
        if (!isOwner(user.id)) return json({ error: "Only the configured owner can change alert settings." }, 403);
        return await saveSettings(body, user.id);
      case "save-push":
        if (!isOwner(user.id)) return json({ error: "Only the configured owner can register push devices." }, 403);
        return await savePush(body, user.id);
      case "remove-push":
        if (!isOwner(user.id)) return json({ error: "Only the configured owner can remove push devices." }, 403);
        if (!body.endpoint) return json({ error: "Push endpoint is required." }, 400);
        await supabaseRequest(
          `owner_push_subscriptions?owner_user_id=eq.${encodeURIComponent(user.id)}&endpoint=eq.${encodeURIComponent(body.endpoint)}`,
          "DELETE",
        );
        return json({ ok: true });
      case "stock-alert":
        if (!isStockWriter(user.id)) return json({ error: "This account cannot report stock changes." }, 403);
        return await deliverStockAlert(body, required("OWNER_USER_ID"));
      default:
        return json({ error: "Unknown action." }, 400);
    }
  } catch (error) {
    console.error("Low-stock alert request failed:", error);
    return json({ error: error instanceof Error ? error.message : "Alert request failed." }, 500);
  }
});
