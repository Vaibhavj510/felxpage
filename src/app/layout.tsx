import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlexPage — Your page. Your story. Your flex.",
  description: "Create a beautiful shareable personal page in minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
