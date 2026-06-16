import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VamosRicci",
  description: "Post YouTube Shorts to multiple accounts at once",
  other: {
    "google-site-verification": "0hxn08INCvuhBqumAPDzk4JgoX281OV3Gw2QJcVkWSc",
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