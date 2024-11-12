import SubriseFeaturedInfo from "@/components/subrise-featured-info";
import TagComp from "@/components/TagComp";
import { MetadataMap } from "@/lib/utils";
import { getSubredditFeaturedDetail } from "@/server/featured";
import { Metadata } from "next";

export const runtime = 'edge';

const metadataMap: MetadataMap = {
  'en': (name: string) => ({
    title: `${name} | Helps you discover the best-matched Reddit communities | Subrise`,
    description: `${name} | Explore the list of Reddit communities on Subrise, helping you quickly filter, search, and find Subreddits that meet your needs | Subreddit`,
  }),
  'zh': (name: string) => ({
    title: `${name} | 帮助你发现最佳匹配的 Reddit 社区 | Subrise`,
    description: `${name} | 在Subrise上探索 Reddit 社区清单，帮助您快速筛选、搜索、查找符合你需求的 | Subreddit`,
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
  const metadataFunction = metadataMap[params.locale] || metadataMap['en'];
  return metadataFunction(name ?? '') // 默认返回英文 metadata
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

      {/* <SubriseFeaturedInfo info={info} reasons={reasons} /> */}
    </div>
  )
}