import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PlausibleAnalytics from "@/components/analytics";


export const metadata: Metadata = {
  title: "RC Garage – Discord community voor Auto's, Drones, Helikopters, Boten en Vliegtuigen!",
  description:
    "Dé plek voor liefhebbers van radiografisch vliegen, rijden, varen en bouwen! Of je nu hulp zoekt, tips wilt delen, of gewoon je nieuwste RC-project wilt showen – je bent hier aan het juiste adres.",
  keywords: "RC Garage, RC auto's, RC vliegtuigen, drones, helikopters, boten, Discord, Nederlands, Community",
  authors: [{ name: "RC Garage" }],
  openGraph: {
    title: "RC Garage – De plek voor RC fans!",
    description:
      "Sluit je aan bij RC Garage, de Discord community voor alles wat met RC te maken heeft.",
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
    description:
      "Sluit je aan bij RC Garage – de Discord community voor alles wat met RC te maken heeft.",
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
