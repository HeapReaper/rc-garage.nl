import Image from "next/image";
import { getStrapiData } from "@/lib/strapi";

async function getChannels() {
  const data =  await getStrapiData("kanalens?populate=*", false);

  // @ts-ignore
  return data.data
}

export default async function Channels() {
  const channels = await getChannels();
  return (
    <>
      <div className="flex flex-col items-center gap-2 mt-8 sm:flex-row sm:justify-center mt-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
             className="w-11 h-11 text-blue-600">
          <path fillRule="evenodd"
                d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z"
                clipRule="evenodd"/>
        </svg>
        <h2 className="text-4xl font-bold text-center sm:text-left">
          Onze Kanalen
        </h2>
      </div>

      {channels.map((channel: any, index: number) => {
        const imageUrl =
          process.env.STRAPI_API_URL + `${channel.afbeelding.formats.small.url}`;

        const isReversed = index % 2 === 1;

        return (
          <section
            key={channel.id}
            className="max-w-5xl mx-auto py-20 px-8 text-center"
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="100"
          >
            <div
              className={`flex flex-col-reverse md:flex-row items-center gap-10 ${
                isReversed ? "md:flex-row-reverse" : ""
              }`}
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-delay="100"
            >
              <div
                className={`md:w-1/2 text-center ${
                  isReversed ? "md:text-left" : "md:text-right"
                }`}
              >
                <h2 className="text-3xl font-bold mb-3">
                  <a href={channel.link} target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-blue-700 transition-colors duration-400" style={{ textDecorationColor: '#1D4ED8' }}>
                    # {channel.naam}
                  </a>
                </h2>
                <p className="text-gray-300">{channel.beschrijving}</p>
              </div>
              <Image
                src={imageUrl}
                width={460}
                height={360}
                alt="Kanaal afbeelding"
                className="w-full md:w-1/2 rounded-2xl custom-shadow transition-transform duration-300 hover:scale-102"
                loading="lazy"
              />
            </div>
          </section>
        );
      })}
    </>
  );
}