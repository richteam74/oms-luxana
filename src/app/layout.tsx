import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxana OMS",
  description: "Order Management System for Malaysian COD businesses",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
