import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RichApps",
  description: "RichApps internal ecommerce operations platform for Malaysia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
