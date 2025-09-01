import Link from "next/link";
import { formatDate } from "@/lib/formatDate";
import { markdownToHtml } from "@/lib/markdownToHtml";

async function getNews() {
  const res = await fetch("https://strapi.rc-garage.nl/news-articles", {
    next: {revalidate: 60}
  });

  return await res.json();
}

export default async function News({  }) {
  const newsArticles = await getNews();

  return (
    <section className="max-w-5xl mx-auto py-20 px-8 text-center">
      <h1 className="text-5xl font-bold mb-12">Nieuws</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

        {newsArticles.map(async (article: any) => (
          <Link href={`/nieuws/${article.id}`} key={article.id}
             className="block bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
            <img src={`https://strapi.rc-garage.nl${article.banner.formats.thumbnail.url}`} alt={`Artikel ${article.id}`} className="w-full h-48 object-cover"/>
            <div className="p-4 text-left">
              <h2 className="text-xl font-bold mb-2">{article.titel}</h2>
              <p className="text-gray-400 text-sm">{formatDate(article.publishedAt)}</p>
              <p className="mt-2 text-gray-300 line-clamp-3" dangerouslySetInnerHTML={{__html: (await markdownToHtml(article.content)).slice(0, 30)}}></p>

              <div className="mt-3 flex flex-wrap gap-2">
                {article.tags.map((tag: any) => (
                  <span
                    key={tag.id}
                    className="bg-gray-800 text-gray-200 px-2 py-1 rounded-full text-xs"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}

      </div>
    </section>
  );
}