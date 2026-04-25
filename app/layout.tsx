import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phamo's Wash and Detailing | Houston, TX",
  description:
    "Professional drop-off detailing in Houston. Ceramic-safe washes, paint protection, and same-day quote replies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
