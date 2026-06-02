import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata = {
  title: "Aditech Global Service — Luxury Tech Agency & Software House",
  description: "Aditech Global Service transforms enterprise complexity into high-performance software. We build cross-platform mobile apps, bespoke fintech solutions, and high-yield Admob networks.",
  keywords: ["Aditech", "software house", "fintech", "Admob utility apps", "app development", "custom SaaS", "Lagos tech agency"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-brand-canvas text-brand-slateDark font-sans relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
