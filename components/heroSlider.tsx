"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BecomeDiscordMember from "@/components/buttons/becomeDiscordMember";

async function getHeroSliders() {
  const res = await fetch(
    `https://strapi.rc-garage.nl/hero-sliders`,
    { next: { revalidate: 60 } }
  );
  return await res.json();
}

export default function HeroSection() {
  const [sliders, setSliders] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getHeroSliders().then((data) => setSliders(data));
  }, []);

  useEffect(() => {
    if (!sliders.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliders.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [sliders]);

  if (!sliders.length) return null;

  return (
    <section className="hero-background text-center py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {sliders.map((slider, index) => {
          const media = slider.media[0];
          if (!media) return null;

          const imageUrl =
            "https://strapi.rc-garage.nl" +
            (media.formats.large?.url || media.url);

          return (
            <div
              key={slider.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={imageUrl}
                alt={media.alternativeText || "Hero image"}
                fill
                className="object-cover w-full h-full"
                priority={index === 0}
              />
            </div>
          );
        })}
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
