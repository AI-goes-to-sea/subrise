import { Info, Star, List, ExternalLink } from 'lucide-react';
import { useTranslations } from "next-intl";

import { Metadata } from "next";
import { Link } from '@/i18n/routing';
import TagComp from './TagComp';

const metadataMap: Record<string, Metadata> = {
  'en': {
    title: 'Helps you discover the best-matched Reddit communities | Subrise',
    description: 'Explore the list of Reddit communities on Subrise, helping you quickly filter, search, and find Subreddits that meet your needs.',
    keywords: 'Reddit, communities, Subreddits',
    metadataBase: new URL('https://subrise.co'),
    alternates: {
      canonical: '/en/reddit-list',
    },
  },
  'zh': {
    title: "帮助你发现最佳匹配的Reddit社区 | Subrise",
    description: '在 Subrise  上探索 Reddit 社区清单，帮助您快速筛选、搜索、查找符合你需求的 Subreddit',
    keywords: 'Reddit, 社区, Subreddit',
    metadataBase: new URL('https://subrise.co'),
    alternates: {
      canonical: '/zh/reddit-list',
    },
  },
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return metadataMap[params.locale] || metadataMap['en'] // 默认返回英文 metadata
}

export default function SubriseFeaturedInfo({
  info,
  reasons
}: {
  info: Record<string, any>,
  reasons: Record<string, any>[]
}) {

  const t = useTranslations('Pages.featured');

  return (
    <div className="space-y-12 px-4 sm:px-8">
      { /* Description */}
      <section className="py-6">
        <pre className="text-base sm:text-lg leading-7 sm:leading-8 text-zinc-500 dark:text-white whitespace-pre-wrap">{info.description?.replace(/\\n/g, '\n')}</pre>
      </section>

      {
        reasons.length > 0 && (
          <hr className="my-6 sm:my-8 border-zinc-300 dark:border-zinc-600" />
        )
      }
      

      {/* Featured Reasons - 瀑布流布局 */}
      {
        reasons.length > 0 && (
          <section className="py-6">
            <div className="flex items-center mb-4">
              <List className="relative -top-[1px] h-5 w-5 sm:h-6 sm:w-6 text-orange-500 mr-2" />
              <h2 className="text-xl sm:text-2xl font-bold text-orange-500">{t('subMenu')}</h2>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-6">
              {reasons.map((reason, index) => (
                // <Link key={index} href={`/reddit-list/${reason.name}`}>
                  <div key={index} className="relative break-inside-avoid border shadow-md hover:shadow-lg transition-shadow duration-300 border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                    <div className="flex items-center mb-4">
                      <img src={reason.iconUrl} alt={reason.name} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full mr-3 sm:mr-4 bg-white" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg sm:text-xl font-bold dark:text-white"> {reason.name} </h3>
                          <Link href={`https://reddit.com${reason.href}`} className="flex ml-2 items-center text-xs text-zinc-500 hover:underline hover:text-orange-500" target="_blank"><ExternalLink className="w-4 h-4 ml-1" /></Link>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <TagComp tags={reason.category.split(',')} /> 
                          <span className="text-zinc-500 w-20 text-right dark:text-white"># {reason.rank}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm text-zinc-500 dark:text-white mt-2">{reason.description}</p>
                    </div>
                    <hr className="my-3 sm:my-4 border-zinc-300 dark:border-zinc-600" />
                    <div>
                      <h4 className="text-lg font-semibold text-zinc-800 dark:text-white">{t('featuredReason')}</h4>
                      <p className="text-zinc-500 dark:text-white mt-2">{reason.featuredReason}</p>
                    </div>
                  </div>
                // </Link>
              ))}
            </div>
          </section>
        )
      }

      {/* Promotion */}
      <hr className="my-6 sm:my-8 border-zinc-300 dark:border-zinc-600" />
      <section className="py-6">
        <div className="flex items-center mb-4">
          <Star className="relative -top-[1px] h-5 w-5 sm:h-6 sm:w-6 text-orange-500 mr-2" />
          <h2 className="text-xl sm:text-2xl font-bold text-orange-500">{t('promotion')}</h2>
        </div>
        <pre className="text-base sm:text-lg text-zinc-500 dark:text-white whitespace-pre-wrap">{info.promotion?.replace(/\\n/g, '\n\n')}</pre>
      </section>

      
      
    </div>
  )
}