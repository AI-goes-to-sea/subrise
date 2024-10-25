import SubredditDetail from "@/components/subreddit-detail";
import { redirect } from "@/i18n/routing";
import { MetadataMap } from "@/lib/utils";
import { getSubredditByName } from "@/server/subreddits";
import { Metadata } from "next";

export const runtime = 'edge';

const metadataMap: MetadataMap = {
  'en': (name: string) => {
    return {
      title: `${name} | Helps you discover the best-matched Reddit communities | Subrise`,
      description: `${name} | Explore the list of Reddit communities on Subrise, helping you quickly filter, search, and find Subreddits that meet your needs | Subreddit`,
    }
  },
  'zh': (name: string) => {
    return {
      title: `${name} | 帮助你发现最佳匹配的 Reddit 社区 | Subrise`,
      description: `${name} | 在Subrise上探索 Reddit 社区清单，帮助您快速筛选、搜索、查找符合你需求的 | Subreddit`,
    }
  }
}

export async function generateMetadata ({
  params, 
  searchParams 
}: { 
  params: { locale: string }, 
  searchParams: { [key: string]: string | string[] | undefined } 
}): Promise<Metadata> {
  const name = Array.isArray(searchParams.url) ? searchParams.url.join('/') : searchParams.url
  const metadataFunction = metadataMap[params.locale] || metadataMap['en'];
  return metadataFunction(name??'') // 默认返回英文 metadata
}

export default async function SubredditProfilePage({
  params,
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const locale = params.locale
  const url = searchParams?.url

  // 处理 locale 和 url 的逻辑
  if (!locale || !url) return redirect(`/${locale || 'en'}/reddit-list`)

  const name = Array.isArray(url) ? url.join('/') : url
  // console.log('name===>>>', name)

  const subreddit = await getSubredditByName(name, locale)
  const item = subreddit[0]??{};

  return (
      <div className="flex flex-1 flex-col mx-auto">
        <SubredditDetail item={item} />
      </div>
  )
}
