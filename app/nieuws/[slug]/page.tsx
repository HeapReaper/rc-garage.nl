import Link from "next/link";
import { formatDate } from "@/lib/formatDate";
import { markdownToHtml } from "@/lib/markdownToHtml";
import { getStrapiData } from "@/lib/strapi";
import ShowMarkdown from "@/components/showMarkdown";

type Props = {
  params: { slug: string };
};

async function getNewsArticle(slug: string) {
  const data = await getStrapiData(`articles?filters[slug][$eq]=${slug}&populate=*`, true);

  // @ts-ignore
  return data.data[0]
}

export default async function ShowNews({ params }: Props) {
  const {slug} = params;
  const article = (await getNewsArticle(slug));

  if (!article) {
    return (
      <section className="max-w-5xl mx-auto py-20 px-8 text-center">
        <p className="text-gray-400">
          Artikel niet gevonden.
        </p>
        <Link href="/nieuws" className="mt-8 inline-block text-blue-600 hover:text-blue-700 font-semibold">
          &larr; Terug naar nieuws
        </Link>
      </section>
    );
  }

  const htmlContent = await markdownToHtml(article.content);

  return (
    <section
      className="
      max-w-5xl mx-auto py-20 px-8 text-left"
    >
      <h1 className="text-4xl font-bold">
        {article.title}
      </h1>

      <p className="text-gray-400 mb-6">
        {formatDate(article.publishedAt)}
      </p>

      <ShowMarkdown content={htmlContent || ""} classes="md:prose-xl" />

      <Link href="/nieuws" className="mt-8 inline-block text-blue-600 hover:text-blue-700 font-semibold">&larr; Terug
        naar nieuws</Link>
    </section>
  );
}