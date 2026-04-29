import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phamo's Wash and Detailing | Houston, TX",
  description:
    "Professional drop-off detailing in Houston. Ceramic-safe washes, paint protection, and same-day quote replies.",
  icons: {
    icon: "/strawberry-logo.png",
    shortcut: "/strawberry-logo.png",
    apple: "/strawberry-logo.png",
  },
  openGraph: {
    title: "Phamo's Wash and Detailing | Houston, TX",
    description:
      "Professional drop-off detailing in Houston. Ceramic-safe washes, paint protection, and same-day quote replies.",
    url: "https://phamosdetailing.com",
    siteName: "Phamo's Wash and Detailing",
    images: [
      {
        url: "/phamos-logo-with-car.jpg",
        alt: "Phamo's Wash and Detailing logo with car",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phamo's Wash and Detailing | Houston, TX",
    description:
      "Professional drop-off detailing in Houston. Ceramic-safe washes, paint protection, and same-day quote replies.",
    images: ["/phamos-logo-with-car.jpg"],
  },
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
