import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PlausibleAnalytics from "@/components/analytics";
import {getStrapiData} from "@/lib/strapi";

async function getData() {
  const data = await getStrapiData('global')

  // @ts-ignore
  return data.data;
}

const data = await getData();

export const metadata: Metadata = {
  title: data.siteName,
  description: data.siteDescription,
  authors: [
    { name: "RC Garage" }
  ],
  openGraph: {
    title: "RC Garage – De plek voor RC fans!",
    description: data.siteDescription,
    url: "https://rc-garage.nl",
    type: "website",
    images: [
      {
        url: "https://rc-garage.nl/assets/img/IMG-20250811-WA0016.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RC Garage – De plek voor RC fans!",
    description: data.siteDescription,
    images: ["https://rc-garage.nl/assets/img/IMG-20250811-WA0016.jpg"],
  },
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
