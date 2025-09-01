import Image from "next/image";
import BecomeDiscordMember from "@/components/buttons/becomeDiscordMember";
import HeroSection from "@/components/heroSlider";
import Winners from "@/components/winners";
import Channels from "@/components/channels";

async function getContestWinners() {
  const res = await fetch(
    `${process.env.STRAPI_API_URL}/foto-winnaars`,
    {
      next: { revalidate: 60 },
    }
  );

  return await res.json();
}

export default async function Home() {
  const contestWinners = await getContestWinners();

  return (
    <>
      <HeroSection />

      <Channels />

      <Winners />

      <section className="text-center py-20 bg-gradient-to-b" data-aos="fade-up"
               data-aos-duration="700" data-aos-delay="100">
        <BecomeDiscordMember/>
      </section>
    </>
  );
}
