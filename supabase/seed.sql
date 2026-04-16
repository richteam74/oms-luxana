-- RichApps Malaysian seed examples
insert into roles(role_key, label) values
('super_admin','Super Admin'),
('admin','Admin'),
('operation','Operation'),
('marketer','Marketer'),
('warehouse','Warehouse'),
('finance','Finance'),
('seller_viewer','Seller Viewer')
on conflict (role_key) do nothing;

insert into couriers(code, name) values
('jnt','J&T Express'),
('spx','SPX Express'),
('self_pickup','Self Pickup')
on conflict (code) do nothing;

insert into source_channels(name, source_type, base_url) values
('KL Glow Landing', 'custom_api', 'https://orders.klglow.my/api/orders'),
('MajuDropship Webhook', 'webhook', 'https://dropship.maju.my/hooks/order'),
('JB Beauty API', 'custom_api', 'https://api.jbbeauty.my/richapps/orders')
on conflict do nothing;
