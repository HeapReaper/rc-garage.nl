import Image from "next/image";
import { getStrapiData } from "@/lib/strapi";

async function getContestWinners() {
  const data =  await getStrapiData("foto-webstrijds?populate=*", false);

  // @ts-ignore
  return data.data
}

export default async function Winners() {
  const contestWinners = await getContestWinners();

  return (
    <>
      {contestWinners.map((winner: any, index: number) => {
        const imageUrl =
          process.env.STRAPI_API_URL + `${winner.afbeelding.formats.small.url}`;

        const isReversed = index % 2 === 1;

        return (
          <section
            key={winner.id}
            className="max-w-5xl mx-auto py-20 px-8 text-center"
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="100"
          >
            <div className="flex flex-col items-center gap-2 mb-12 sm:flex-row sm:justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-11 h-11 text-blue-600"
              >
                <path
                  fillRule="evenodd"
                  d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="text-4xl font-bold text-center sm:text-left">
                {winner.type}
              </h2>
            </div>

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
                <h2 className="text-3xl font-bold mb-3">{winner.gebruikersnaam}</h2>
                <p className="text-gray-300">{winner.beschrijving}</p>
              </div>
              <Image
                src={imageUrl}
                width={460}
                height={360}
                alt={winner.gebruikersnaam}
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