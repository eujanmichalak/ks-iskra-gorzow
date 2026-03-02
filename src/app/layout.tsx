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

// TUTAJ ZMIENIAMY:
export const metadata: Metadata = {
  title: "ISKRA GORZÓW | Oficjalna Strona Klubu",
  description: "Duma Zawarcia - KS Iskra Gorzów. Oficjalny serwis informacyjny klubu.",
  icons: {
    icon: "/photos/iskra.png", // Next.js sam to ogarnie jako fawikonkę
    apple: "/photos/iskra.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl"> {/* Zmienione na pl */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}