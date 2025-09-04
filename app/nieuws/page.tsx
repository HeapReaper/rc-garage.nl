import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/formatDate";
import { markdownToHtml } from "@/lib/markdownToHtml";
import { getStrapiData } from "@/lib/strapi";

async function getNews() {
  const data = await getStrapiData("articles?populate=*&sort=createdAt:desc", true);

  await Promise.all(
    // @ts-ignore
    data.data.map(async (article: any) => {
      if (!article.blocks) return

      article.blocks = await Promise.all(
        article.blocks.map(async (block: any) => ({
          ...block,
          body: await markdownToHtml(block.body),
        }))
      );

    })
  );

  // @ts-ignore
  return data.data;
}

export default async function News() {
  const articles = await getNews();

  return (
    <section className="max-w-5xl mx-auto py-20 px-8 text-center">
      <h1 className="text-5xl font-bold mb-12">
        Nieuws
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {articles.map((article: any) => (
          <Link
            href={`/nieuws/${article.slug}`}
            key={article.id}
            className="block bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={`${process.env.STRAPI_API_URL}${article.cover.formats.thumbnail.url}`}
              width={200}
              height={200}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-left">
              <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{article.title}</h2>
              <p className="text-gray-400 text-xs sm:text-sm">{formatDate(article.createdAt)}</p>
              <p
                className="mt-1 sm:mt-2 text-gray-300 line-clamp-3 text-sm"
                dangerouslySetInnerHTML={{ __html: `${article.content.slice(0, 40)}...` }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
