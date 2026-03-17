import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Consent Manager Perú 🇵🇪",
  description:
    "Sistema ligero para gestionar consentimientos de datos personales en sitios web, alineado con la Ley N° 29733 de Perú.",
  keywords: [
    "Consentimiento",
    "Protección de Datos",
    "Ley 29733",
    "Perú",
    "Next.js",
    "Prisma",
  ],
  authors: [{ name: "Franco Caballero", url: "https://francocaballero.dev" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}