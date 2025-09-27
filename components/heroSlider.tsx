"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BecomeDiscordMember from "@/components/buttons/becomeDiscordMember";

async function getData() {
  const res: Response = await fetch(
    `https://strapi.rc-garage.nl/api/hero-sliders?populate=*`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  return data.data;
}

export default function HeroSection() {
  const [sliders, setSliders] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  // Load image URLs
  useEffect(() => {
    getData().then((data: any) => {
      if (data.length > 0 && data[0].media) {
        const urls = data[0].media.map(
          (item: any) =>
            "https://strapi.rc-garage.nl" +
            (item.formats?.large?.url || item.url)
        );
        setSliders(urls);
      }
    });
  }, []);

  // Autoplay logic
  useEffect(() => {
    if (sliders.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliders.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [sliders.length]);

  if (!sliders.length) return null;

  return (
    <section className="hero-background text-center py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {sliders.map((url, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={url}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover w-full h-full"
              priority
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/70 z-10 pointer-events-none"></div>

      <div className="relative z-20">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-blue-600 hover:text-blue-700 transition-colors duration-400">
            RC
          </span>
          <span className="ml-3 text-blue-600 hover:text-blue-700 transition-colors duration-400">
            G
          </span>
          arage
        </h1>

        <p className="text-lg text-gray-300 mb-8 p-2 sm:p-0">
          <span className="font-bold">Dé</span> Nederlandse Discord{" "}
          <span className="font-bold">community</span> voor alles wat met{" "}
          <span className="font-bold">RC</span> te maken heeft.
        </p>

        <BecomeDiscordMember />
      </div>
    </section>
  );
}
