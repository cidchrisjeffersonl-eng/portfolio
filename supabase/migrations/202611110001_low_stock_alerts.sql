create table if not exists public.owner_alert_settings (
  owner_user_id uuid primary key references auth.users (id) on delete cascade,
  sms_phone text,
  sms_enabled boolean not null default false,
  sms_consent_at timestamptz,
  updated_at timestamptz not null default now(),
  constraint owner_alert_settings_phone_e164
    check (sms_phone is null or sms_phone ~ '^\+[1-9][0-9]{7,14}$')
);

create table if not exists public.owner_push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users (id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.stock_alert_events (
  event_key text primary key,
  ingredient text not null,
  status text not null check (status in ('low', 'critical')),
  level numeric not null check (level >= 0),
  unit text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.stock_alert_deliveries (
  event_key text not null references public.stock_alert_events (event_key) on delete cascade,
  channel text not null check (channel in ('sms', 'push')),
  status text not null check (status in ('pending', 'sending', 'sent', 'failed')),
  attempts integer not null default 0,
  last_error text,
  updated_at timestamptz not null default now(),
  primary key (event_key, channel)
);

alter table public.owner_alert_settings enable row level security;
alter table public.owner_push_subscriptions enable row level security;
alter table public.stock_alert_events enable row level security;
alter table public.stock_alert_deliveries enable row level security;

drop policy if exists "Owners manage their alert settings" on public.owner_alert_settings;
create policy "Owners manage their alert settings"
  on public.owner_alert_settings
  for all
  to authenticated
  using (auth.uid() = owner_user_id)
  with check (auth.uid() = owner_user_id);

drop policy if exists "Owners manage their push subscriptions" on public.owner_push_subscriptions;
create policy "Owners manage their push subscriptions"
  on public.owner_push_subscriptions
  for all
  to authenticated
  using (auth.uid() = owner_user_id)
  with check (auth.uid() = owner_user_id);

revoke all on public.stock_alert_events from anon, authenticated;
revoke all on public.stock_alert_deliveries from anon, authenticated;
grant select, insert, update, delete on public.owner_alert_settings to authenticated;
grant select, insert, update, delete on public.owner_push_subscriptions to authenticated;
grant all on public.stock_alert_events to service_role;
grant all on public.stock_alert_deliveries to service_role;

create or replace function public.claim_stock_alert_delivery(
  p_event_key text,
  p_channel text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  claimed boolean;
begin
  insert into public.stock_alert_deliveries (event_key, channel, status, attempts)
  values (p_event_key, p_channel, 'sending', 1)
  on conflict (event_key, channel) do nothing;

  if found then
    return true;
  end if;

  update public.stock_alert_deliveries
  set status = 'sending',
      attempts = attempts + 1,
      last_error = null,
      updated_at = now()
  where event_key = p_event_key
    and channel = p_channel
    and (
      status = 'failed'
      or (status = 'sending' and updated_at < now() - interval '2 minutes')
    )
  returning true into claimed;

  return coalesce(claimed, false);
end;
$$;

create or replace function public.finish_stock_alert_delivery(
  p_event_key text,
  p_channel text,
  p_status text,
  p_error text default null
)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.stock_alert_deliveries
  set status = p_status,
      last_error = p_error,
      updated_at = now()
  where event_key = p_event_key
    and channel = p_channel;
$$;

revoke all on function public.claim_stock_alert_delivery(text, text) from public, anon, authenticated;
revoke all on function public.finish_stock_alert_delivery(text, text, text, text) from public, anon, authenticated;
grant execute on function public.claim_stock_alert_delivery(text, text) to service_role;
grant execute on function public.finish_stock_alert_delivery(text, text, text, text) to service_role;
