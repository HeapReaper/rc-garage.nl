import { getStrapiData } from "@/lib/strapi";
import Image from "next/image";
import MemberStatusIndicator from "@/components/statusIndicator";

export async function getData() {
  const data = await getStrapiData("ons-teams?populate=*", true);

  // @ts-ignore
  const teamMembers =  data.data

  teamMembers.sort((a: any, b: any) =>
    a.gebruikersnaam.localeCompare(b.gebruikersnaam)
  );

  return teamMembers;
}

export default async function OurTeam() {
  const teamMembers = await getData();

  return (
    <>
      <section id="teamSection" className="max-w-5xl mx-auto py-10 px-8 text-center" data-aos="fade-up"
               data-aos-duration="700" data-aos-delay="100">
        <div className="flex flex-col items-center gap-2 mb-12 sm:flex-row sm:justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
               className="w-11 h-11 text-blue-600">
            <path fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"/>
          </svg>
          <h2 className="text-4xl font-bold text-center sm:text-left">
            Het Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {teamMembers.map((member: any, index: number) => (
            <div className="flex flex-col items-center" key={index}>
              <div className="relative inline-block transition-transform duration-300 hover:scale-105 shadow-lg drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]">
                <Image
                  width={128}
                  height={128}
                  src={process.env.STRAPI_API_URL + member.profielfoto.formats.thumbnail.url}
                  alt="profielfoto"
                  className="w-32 h-32 rounded-full mb-4 "
                  loading="lazy"
                />
                <MemberStatusIndicator memberId={member.UUID} />
              </div>

              <h3 className="text-xl font-semibold">
                {member.gebruikersnaam}
              </h3>

              <div className="flex gap-2 mt-2">
                {member.rollens.map((rol: any, index: number) => (
                  <span
                    key={index}
                    className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]">
                      {rol.naam}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}