-- RichApps Supabase PostgreSQL schema
create extension if not exists pgcrypto;

create type app_role as enum ('super_admin','admin','operation','marketer','warehouse','finance','seller_viewer');
create type order_status as enum ('new','pending','in_transit','completed','returned','rejected');
create type push_status as enum ('ready_to_push','pushed','awb_generated','failed_push','failed_awb','self_pickup');
create type payment_method as enum ('cod','bank_transfer','foc','cash');

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  role_key app_role unique not null,
  label text not null
);

create table if not exists permissions (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  description text not null
);

create table if not exists role_permissions (
  role_id uuid references roles(id) on delete cascade,
  permission_id uuid references permissions(id) on delete cascade,
  primary key(role_id, permission_id)
);

create table if not exists user_roles (
  user_id uuid references profiles(id) on delete cascade,
  role_id uuid references roles(id) on delete cascade,
  primary key(user_id, role_id)
);

create table if not exists sellers (
  id uuid primary key default gen_random_uuid(),
  seller_code text unique not null,
  name text not null,
  owner_user_id uuid references profiles(id),
  created_at timestamptz default now()
);

create table if not exists source_channels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  source_type text not null check (source_type in ('webhook','custom_api')),
  base_url text,
  owner_user_id uuid references profiles(id),
  created_at timestamptz default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text not null,
  normalized_phone text not null,
  created_at timestamptz default now(),
  unique(normalized_phone)
);

create table if not exists customer_addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  address_line_1 text not null,
  address_line_2 text,
  normalized_address text not null,
  postcode text not null,
  city text not null,
  state text not null,
  country text not null default 'MY',
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_no text unique not null,
  source_order_id text not null,
  source_channel_id uuid not null references source_channels(id),
  seller_id uuid references sellers(id),
  customer_id uuid not null references customers(id),
  customer_address_id uuid not null references customer_addresses(id),
  ingestion_method text not null check (ingestion_method in ('webhook','custom_api','manual','bulk_csv')),
  source_payload jsonb not null,
  payment_method payment_method not null,
  shipping_method text not null,
  status order_status not null default 'new',
  courier_push_status push_status not null default 'ready_to_push',
  awb_status text not null default 'pending',
  duplicate_flag boolean not null default false,
  duplicate_score numeric(5,2) not null default 0,
  selling_price numeric(12,2) not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(source_channel_id, source_order_id)
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  sku text not null,
  product_name text,
  quantity integer not null,
  unit_price numeric(12,2) not null,
  line_total numeric(12,2) generated always as (quantity * unit_price) stored
);

create table if not exists order_status_logs (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  from_status order_status,
  to_status order_status not null,
  changed_by uuid references profiles(id),
  note text,
  created_at timestamptz default now()
);

create table if not exists duplicate_reviews (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  group_key text not null,
  confidence_score numeric(5,2) not null,
  reasons jsonb not null,
  reviewed_by uuid references profiles(id),
  reviewed_at timestamptz,
  ignored boolean not null default false
);

create table if not exists couriers (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  created_at timestamptz default now()
);

create table if not exists courier_accounts (
  id uuid primary key default gen_random_uuid(),
  courier_id uuid not null references couriers(id),
  owner_user_id uuid references profiles(id),
  environment text not null check (environment in ('sandbox','production')),
  is_enabled boolean not null default true,
  credentials jsonb not null,
  cod_enabled boolean not null default true,
  prepaid_enabled boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists shipments (
  id uuid primary key default gen_random_uuid(),
  courier_provider text not null,
  courier_account_id uuid not null references courier_accounts(id),
  order_id uuid not null references orders(id) on delete cascade,
  courier_order_id text,
  awb_number text,
  tracking_number text,
  label_url text,
  shipment_status text not null,
  raw_request jsonb,
  raw_response jsonb,
  error_message text,
  retry_count integer not null default 0,
  pushed_at timestamptz,
  awb_generated_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists webhook_endpoints (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references profiles(id),
  name text not null,
  callback_url text not null,
  secret_hash text not null,
  subscribed_events text[] not null,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists webhook_logs (
  id uuid primary key default gen_random_uuid(),
  endpoint_id uuid not null references webhook_endpoints(id) on delete cascade,
  event_name text not null,
  headers jsonb not null,
  payload jsonb not null,
  response_status integer,
  response_body text,
  delivery_status text not null,
  retry_count integer default 0,
  delivered_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists api_keys (
  id uuid primary key default gen_random_uuid(),
  integration_name text not null,
  owner_user_id uuid references profiles(id),
  key_prefix text not null,
  key_hash text not null,
  status text not null check(status in ('active','inactive')),
  last_used_at timestamptz,
  rate_limit_per_minute integer not null default 60,
  created_at timestamptz default now()
);

create table if not exists api_request_logs (
  id uuid primary key default gen_random_uuid(),
  api_key_id uuid references api_keys(id),
  endpoint text not null,
  request_headers jsonb,
  request_payload jsonb,
  response_status integer,
  response_body jsonb,
  created_at timestamptz default now()
);
