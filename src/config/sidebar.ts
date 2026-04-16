import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Boxes,
  Cog,
  CreditCard,
  FileText,
  Package,
  Settings,
  Shield,
  ShoppingCart,
  Truck,
  Users,
  Webhook,
} from "lucide-react";

export type SidebarItem = {
  title: string;
  href: string;
};

export type SidebarSection = {
  title: string;
  href?: string;
  icon: LucideIcon;
  items?: SidebarItem[];
};

export const richAppsSidebar: SidebarSection[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  {
    title: "Orders",
    icon: ShoppingCart,
    items: [
      { title: "All Orders", href: "/admin/orders/all" },
      { title: "Create Order", href: "/admin/orders/create" },
      { title: "Duplicate Review", href: "/admin/orders/duplicate-review" },
    ],
  },
  {
    title: "Shipping",
    icon: Truck,
    items: [
      { title: "Push Orders", href: "/admin/shipping/push-orders" },
      { title: "Generate AWB", href: "/admin/shipping/generate-awb" },
      { title: "Postcode Checker", href: "/admin/shipping/postcode-checker" },
      { title: "Pickup Locations", href: "/admin/shipping/pickup-locations" },
      { title: "Couriers", href: "/admin/shipping/couriers" },
      { title: "Shipment Logs", href: "/admin/shipping/shipment-logs" },
    ],
  },
  {
    title: "Inventory",
    icon: Boxes,
    items: [
      { title: "Products", href: "/admin/inventory/products" },
      { title: "Brands", href: "/admin/inventory/brands" },
      { title: "Bundles", href: "/admin/inventory/bundles" },
      { title: "Stock Adjustment", href: "/admin/inventory/stock-adjustment" },
      { title: "Stock Log", href: "/admin/inventory/stock-log" },
      { title: "Pending Stock", href: "/admin/inventory/pending-stock" },
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    items: [
      { title: "Sales Overview", href: "/admin/reports/sales-overview" },
      { title: "Profit Overview", href: "/admin/reports/profit-overview" },
      { title: "Sales Breakdown", href: "/admin/reports/sales-breakdown" },
      { title: "Sales Channels", href: "/admin/reports/sales-channels" },
      { title: "Seller Summary", href: "/admin/reports/seller-summary" },
      { title: "Seller Detail", href: "/admin/reports/seller-detail" },
      { title: "SKU Report", href: "/admin/reports/sku-report" },
      { title: "Product Trend", href: "/admin/reports/product-trend" },
      { title: "Stock Summary", href: "/admin/reports/stock-summary" },
      { title: "Stock Movement", href: "/admin/reports/stock-movement" },
      { title: "Delivery Report", href: "/admin/reports/delivery-report" },
      { title: "State Report", href: "/admin/reports/state-report" },
      { title: "Export Orders", href: "/admin/reports/export-orders" },
    ],
  },
  {
    title: "Finance",
    icon: CreditCard,
    items: [
      { title: "COD Tracker", href: "/admin/finance/cod-tracker" },
      { title: "Net Profit", href: "/admin/finance/net-profit" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    items: [
      { title: "My Profile", href: "/admin/users/my-profile" },
      { title: "Users List", href: "/admin/users/list" },
      { title: "Recruitment Tree", href: "/admin/users/recruitment-tree" },
      { title: "Role Manager", href: "/admin/users/role-manager" },
      { title: "Activity Logs", href: "/admin/users/activity-logs" },
    ],
  },
  {
    title: "Integrations",
    icon: Webhook,
    items: [
      { title: "Webhooks", href: "/admin/integrations/webhooks" },
      { title: "Custom API", href: "/admin/integrations/custom-api" },
      { title: "Couriers", href: "/admin/integrations/couriers" },
    ],
  },
  { title: "Settings", href: "/admin/settings", icon: Settings },
  { title: "Docs", href: "/admin/docs/quick-start", icon: Shield },
  { title: "Roadmap", href: "/admin/roadmap", icon: Cog },
  { title: "Schema", href: "/admin/schema", icon: Package },
];
