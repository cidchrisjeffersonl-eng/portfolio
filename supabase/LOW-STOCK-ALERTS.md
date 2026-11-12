# Lurk POS low-stock alerts

This integration uses Supabase Auth for the owner, a Supabase Edge Function for
delivery, Twilio for SMS, and browser push subscriptions for web push. Provider
credentials belong only in Supabase Function secrets; never put them in the
public HTML config.

## 1. Configure Supabase

1. Link the Supabase CLI to your project and apply the migration:

   ```text
   supabase link --project-ref <project-ref>
   supabase db push
   ```

2. Enable email magic-link sign-in in Supabase Auth and add the deployed Lurk POS
   URL to the Auth redirect URL allow-list.
3. Create or identify the owner Auth user. Set its UUID as `OWNER_USER_ID`.
4. Add the project URL and publishable/anon key to
   `public/lurk-pos-alert-config.js`. These are browser-visible values; RLS and
   the Edge Function enforce access.
5. Add Supabase Auth user UUIDs for POS clients that report stock changes to
   `STOCK_WRITER_USER_IDS` (comma-separated). The owner UUID is always allowed.
6. Deploy the Edge Function with `supabase functions deploy low-stock-alert`.
   JWT verification is enabled in `config.toml`.

Set these Edge Function secrets:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
OWNER_USER_ID
STOCK_WRITER_USER_IDS
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_FROM_NUMBER
VAPID_PUBLIC_KEY
VAPID_PRIVATE_KEY
VAPID_SUBJECT
```

Generate a VAPID key pair with a trusted Web Push key generator. Set the public
key in `public/lurk-pos-alert-config.js` and keep the private key only as a
Supabase Function secret. `VAPID_SUBJECT` should be a `mailto:` contact or
website URL. Configure a Twilio sender number before enabling SMS.

## 2. Owner opt-in

Open the Owner tab on an HTTPS deployment, sign in with the configured Supabase
owner email, then save an E.164 phone number and explicitly opt in to SMS. Use
the Web Push button on every browser/device that should receive alerts; each
device must grant notification permission. SMS and push can be turned off in
the Owner panel.

The demo's existing low-stock transition detection reports a new low or severity
increase to the Edge Function. Delivery is deduplicated per ingredient, low-stock
episode, and severity. Failed channel deliveries are recorded and may be retried
when the same event is reported again. A POS client with a valid Supabase Auth
session must remain connected to report stock changes; if all POS clients are
closed or offline, this client-reported integration cannot observe new changes.

This does not replace the POS's existing host-provided stock database. If stock
changes are made outside this page, those writes must also report an event to
the Edge Function (or be moved to a server-side database trigger) for alerts to
be generated.
