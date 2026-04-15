import Link from "next/link";

const sections = [
  ["Analytics", "/admin/analytics"],
  ["Create Order", "/admin/orders/new"],
  ["All Orders", "/admin/orders"],
  ["Shipment / Generate AWB", "/admin/shipment/generate-awb"],
  ["Inventory / Products", "/admin/inventory/products"],
  ["Finance", "/admin/finance"],
  ["Commission", "/admin/commission"],
  ["User", "/admin/users"],
  ["Setting", "/admin/settings"],
] as const;

export function Sidebar() {
  return (
    <aside className="h-screen w-64 border-r border-border bg-[#091226] p-4 sticky top-0">
      <div className="mb-6 text-lg font-semibold text-white">Luxana OMS</div>
      <nav className="space-y-1 text-sm">
        {sections.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
