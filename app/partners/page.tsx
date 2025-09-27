import Image from "next/image";
import { getStrapiData } from "@/lib/strapi";
import { markdownToHtml } from "@/lib/markdownToHtml";
import ShowMarkdown from "@/components/showMarkdown";

async function getPartners() {
  const data = await getStrapiData("partners?populate=*", false);

  // @ts-ignore
  const partners = data.data;

  // Sort alphabetic by name
  partners.sort((a: any, b: any) => a.naam.localeCompare(b.naam));

  for (const partner of partners) {
    partner.beschrijving = await markdownToHtml(partner.beschrijving);
  }

  return partners;
}

export default async function Partners() {
  const partners = await getPartners();

  return (
    <>
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center mt-20">
        <h1 className="text-5xl font-bold mb-12">Partners</h1>
      </div>

      {partners.map((partner: any, index: number) => {
        const imageUrl =
          partner.afbeelding?.formats?.small?.url &&
          process.env.STRAPI_API_URL + partner.afbeelding.formats.small.url;

        const isReversed = index % 2 === 1;

        return (
          <section
            key={partner.id}
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
                <h2 className="text-3xl font-bold mb-3 text-center ">
                  {partner.link ? (
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white underline hover:text-blue-600 transition-colors duration-400"
                      style={{ textDecorationColor: "#1D4ED8" }}
                    >
                      {partner.naam}
                    </a>
                  ) : (
                    partner.naam
                  )}
                </h2>

                <ShowMarkdown
                  content={partner.beschrijving || ""}
                  classes="text-center"
                />
              </div>

              {imageUrl && (
                <Image
                  src={imageUrl}
                  width={460}
                  height={360}
                  alt="Partner logo"
                  className="w-full md:w-1/2 rounded-2xl custom-shadow transition-transform duration-300 hover:scale-102"
                  priority
                />
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
