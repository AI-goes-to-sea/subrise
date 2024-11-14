import { Link } from "@/i18n/routing";
import { getSubredditFeaturedList } from "@/server/featured";
import { Metadata } from "next";

const metadataMap: Record<string, Metadata> = {
  'en': {
    title: 'Subrise Featured, Curated high-quality Reddit communities | Subrise',
    description: 'Explore the list of Reddit communities on Subrise, helping you quickly filter, search, and find Subreddits that meet your needs.',
    keywords: 'Reddit,  communities, Subrise Featured, Subreddits',
    metadataBase: new URL('https://subrise.co'),
    alternates: {
      canonical: '/en/subrise-featured',
    },
  },
  'zh': {
    title: "Subrise精选, 帮助你快速筛选、搜索、查找符合你需求的Subreddit | Subrise",
    description: '在 Subrise  上探索 Reddit 社区清单，帮助您快速筛选、搜索、查找符合你需求的 Subreddit',
    keywords: 'Reddit, 社区, Subrise精选, Subreddit',
    metadataBase: new URL('https://subrise.co'),
    alternates: {
      canonical: '/zh/subrise-featured',
    },
  },
};
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return metadataMap[params.locale] || metadataMap['en'] // 默认返回英文 metadata
}

export default async function SubriseFeatured({ params }: { params: { locale: string } }) {

  const featuredList = await getSubredditFeaturedList(params.locale);

  return (
    <div className="flex flex-1 flex-col space-y-8">
      {featuredList.map((item, index) => {
        return (
          <Link key={index} href={`/subrise-featured/${item.featuredUrl}`}>
            <div className="flex flex-col md:flex-row justify-between p-6 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative order-1 border-l-4 border-orange-500 ">
              <div className="hidden flex-shrink-0 md:flex justify-center w-24 h-24 rounded-lg">
                <span className="text-6xl font-semibold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  {index + 1}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between ml-4">
                <h2 className="text-2xl font-semibold text-black">{item.name}</h2>
                <p className="text-zinc-500 mt-4 line-clamp-3">{item.description}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}