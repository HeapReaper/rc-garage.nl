import Link from "next/link";
import {formatDate} from "@/lib/formatDate";
import Image from "next/image";
import { markdownToHtml } from "@/lib/markdownToHtml";

type Props = {
  params: { id: string };
};

async function getNewsArticle(id: string) {
  const res = await fetch(`https://strapi.rc-garage.nl/news-articles/${id}`, {
    next: {revalidate: 120}
  });

  return await res.json();
}

export default async function ShowNews({ params }: Props) {
  const {id} = params;

  const article = await getNewsArticle(id);
  const htmlContent = await markdownToHtml(article.content);

  if (!article) {
    return (
      <section className="max-w-5xl mx-auto py-20 px-8 text-center">
        <p className="text-gray-400">Artikel niet gevonden.</p>
        <Link href="/nieuws" className="mt-8 inline-block text-blue-600 hover:text-blue-700 font-semibold">
          &larr; Terug naar nieuws
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto py-20 px-8 text-left">
      <h1 className="text-5xl font-bold mb-2">
        {article.titel}
      </h1>

      {article.tags.map((tag: any) => (
        <span
          key={tag.id}
          className="bg-gray-800  text-gray-200 px-2 py-1 rounded-full text-xs"
        >
          {tag.name}
        </span>
      ))}

      <p className="text-gray-400 mb-6 mt-2">
        {formatDate(article.publishedAt)}
      </p>

      <div className="text-gray-300 space-y-4">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

      <Link href="/nieuws" className="mt-8 inline-block text-blue-600 hover:text-blue-700 font-semibold">&larr; Terug
        naar nieuws</Link>
    </section>
  );
}