import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maulana Faqih",
  description:
    "Computer Engineering student at Bina Nusantara. IT Support specialist with 1 year experience at Triputra Agro Persada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.0.0/dist/tabler-icons.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}