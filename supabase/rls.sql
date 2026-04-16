-- RichApps baseline RLS policies
alter table profiles enable row level security;
alter table orders enable row level security;
alter table shipments enable row level security;
alter table api_keys enable row level security;
alter table webhook_endpoints enable row level security;

create policy "profile_self_select" on profiles
for select using (auth.uid() = id);

create policy "profile_admin_manage" on profiles
for all using (
  exists (
    select 1 from user_roles ur
    join roles r on r.id = ur.role_id
    where ur.user_id = auth.uid() and r.role_key in ('super_admin','admin')
  )
);

create policy "orders_read_by_team" on orders
for select using (
  exists (
    select 1 from user_roles ur
    join roles r on r.id = ur.role_id
    where ur.user_id = auth.uid() and r.role_key in ('super_admin','admin','operation','warehouse','finance','marketer','seller_viewer')
  )
);

create policy "orders_write_operation" on orders
for all using (
  exists (
    select 1 from user_roles ur
    join roles r on r.id = ur.role_id
    where ur.user_id = auth.uid() and r.role_key in ('super_admin','admin','operation')
  )
);

create policy "shipments_write_warehouse" on shipments
for all using (
  exists (
    select 1 from user_roles ur
    join roles r on r.id = ur.role_id
    where ur.user_id = auth.uid() and r.role_key in ('super_admin','admin','warehouse','operation')
  )
);

create policy "integrations_admin_only" on api_keys
for all using (
  exists (
    select 1 from user_roles ur
    join roles r on r.id = ur.role_id
    where ur.user_id = auth.uid() and r.role_key in ('super_admin','admin')
  )
);

create policy "webhooks_admin_only" on webhook_endpoints
for all using (
  exists (
    select 1 from user_roles ur
    join roles r on r.id = ur.role_id
    where ur.user_id = auth.uid() and r.role_key in ('super_admin','admin')
  )
);
