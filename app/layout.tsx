import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PlausibleAnalytics from "@/components/analytics";

export const metadata: Metadata = {
  title: 'RC Garage',
  description: 'Dé Nederlandse RC community',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <PlausibleAnalytics />

      <body className="bg-black text-white font-sans carbon-bg">
        <Navbar />

        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
