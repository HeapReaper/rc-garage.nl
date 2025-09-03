import BecomeDiscordMember from "@/components/buttons/becomeDiscordMember";
import HeroSection from "@/components/heroSlider";
import Winners from "@/components/winners";
import Channels from "@/components/channels";
import OurTeam from "@/components/ourTeam";
import GuildStats from "@/components/guildStats";

export default async function Home() {
  return (
    <>
      <HeroSection />

      <Channels />

      <GuildStats />

      <OurTeam />

      <Winners />

      <section
        className="text-center py-20 bg-gradient-to-b" data-aos="fade-up"
        data-aos-duration="700" data-aos-delay="100"
      >
        <BecomeDiscordMember/>
      </section>
    </>
  );
}
