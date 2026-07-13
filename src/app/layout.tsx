import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Mariel Martínez — Estética Femenina",
  description:
    "Belleza que te hace sentir bien. Depilación definitiva, tratamientos faciales y corporales en Parque Batlle, Montevideo. Reservá tu turno online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-UY"
      className={`${playfair.variable} ${dancing.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-100 text-ink-700">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--color-cream-50)",
              border: "1px solid var(--color-blush-200)",
              color: "var(--color-ink-700)",
            },
          }}
        />
      </body>
    </html>
  );
}
