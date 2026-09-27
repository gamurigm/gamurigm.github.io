import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gabriel Murillo | Software Engineer",
  description: "Portfolio de Gabriel Murillo: software, inteligencia artificial y sistemas seguros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
