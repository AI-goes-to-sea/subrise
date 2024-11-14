import SubriseFeaturedInfo from "@/components/subrise-featured-info";
import TagComp from "@/components/TagComp";
import { MetadataMap } from "@/lib/utils";
import { getSubredditFeaturedDetail, getSubredditFeaturedTitleAndDescription } from "@/server/featured";
import { Metadata } from "next";

export const runtime = 'edge';

const metadataMap: MetadataMap = {
  'en': (name: string, description?: string) => ({
    title: `${name} | Subrise`,
    description: `${description ?? 'Default description'} | Subreddit`,
  }),
  'zh': (name: string, description?: string) => ({
    title: `${name} | Subrise`,
    description: `${description ?? '默认描述'} | Subreddit`,
  })
}

export async function generateMetadata ({
  params, 
  searchParams 
}: { 
  params: { locale: string }, 
  searchParams: { [key: string]: string } 
}): Promise<Metadata> {
  const name = searchParams.slug
  const [{ title, description }] = await getSubredditFeaturedTitleAndDescription({ language: params.locale, slug: name })
  const metadataFunction = metadataMap[params.locale] || metadataMap['en'];
  return metadataFunction(title ?? '', description ?? '') // 默认返回英文 metadata
}

export default async function SubriseFeaturedSlug({
  params,
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string }
}) {
  
  const locale = params.locale
  const slug = searchParams.slug

  const { info, reasons } = await getSubredditFeaturedDetail({ language: locale, featuredUrl: slug })

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl font-extrabold text-center text-black dark:text-white py-10">{info.name}</h1>
      
      {
        reasons.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-10 justify-center">
            {
              reasons.map((reason, index) => (
                <TagComp key={`tag_${index}`} tags={[reason.category || '']} />
              ))
            }
          </div>
        )
      }

      <SubriseFeaturedInfo info={info} reasons={reasons} />
    </div>
  )
}