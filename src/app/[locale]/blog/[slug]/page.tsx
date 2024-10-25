import { getTipBySlug } from "@/server/tips";
import ArticleComp from "@/components/ArticleComp";
import { ArticleItems } from "@/constants";
// import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { MetadataMap } from "@/lib/utils";

export const runtime = 'edge';

const metadataMap: MetadataMap = {
  'en': (title: string, description?: string) => {
    return {
      title: `${title} | Subrise`,
      description: `${description} | Subrise`,
    }
  },
  'zh': (title: string, description?: string) => {
    return {
      title: `${title} | Subrise`,
      description: `${description} | Subreddit`,
    }
  }
}

const fetchData = async (slug: string, locale: string) => {
  const result = await getTipBySlug(slug, locale)
  return Array.isArray(result) ? result[0] : {}
}

export async function generateMetadata({ 
  params,
  searchParams,
}: { 
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const slug = searchParams?.slug;
  const { locale } = params
  // const result = await getTipBySlug(slug as string, locale)
  const data = await fetchData(slug as string, locale);
  const metadataFunction = metadataMap[params.locale] || metadataMap['en'];
  return metadataFunction(data?.title ?? '', data?.description ?? '')
}

export default async function TipDetail({
  params,
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { locale } = params
  const slug = searchParams?.slug;
  if (!locale || !slug) return redirect(`/${locale}/blog`);
  const data = await fetchData(slug as string, locale);

  return (
    <div className="flex flex-1 justify-center mx-auto">
      <ArticleComp article={data as ArticleItems || {}} />
    </div>
  )
}