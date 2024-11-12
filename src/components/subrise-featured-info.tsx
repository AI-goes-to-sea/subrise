import { Info, Star, List } from 'lucide-react';
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
    <div className="space-y-12 px-8">
      { /* Description */}
      <section className="py-8">
          {/* <div className="flex items-center mb-6">
            <Info className="relative -top-0.5 h-8 w-8 text-orange-500 mr-2" />
            <h2 className="text-2xl font-bold text-orange-500">{t('description')}</h2>
          </div> */}
          <pre className="text-lg leading-8 text-zinc-500 dark:text-white whitespace-pre-wrap">{info.description?.replace(/\\n/g, '\n')}</pre>
      </section>

      <hr className="my-8 border-zinc-300 dark:border-zinc-600" />

      {/* Promotion */}
      <section className="py-8">
        <div className="flex items-center mb-6">
          <Star className="relative -top-[1px] h-6 w-6 text-orange-500 mr-2" />
          <h2 className="text-2xl font-bold text-orange-500">{t('promotion')}</h2>
        </div>
        <pre className="text-lg text-zinc-500 dark:text-white whitespace-pre-wrap">{info.promotion?.replace(/\\n/g, '\n\n')}</pre>
      </section>

      <hr className="my-8 border-zinc-300 dark:border-zinc-600" />

      {/* Featured Reasons - 瀑布流布局 */}
      {
        reasons.length > 0 && (
          <section className="py-8">
            <div className="flex items-center mb-6">
              <List className="relative -top-[1px] h-6 w-6 text-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-orange-500">{t('featuredReason')}</h2>
            </div>
            <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
              {reasons.map((reason, index) => (
                <Link key={index} href={`/reddit-list/${reason.name}`}>
                  <div  className="relative break-inside-avoid border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6 rounded-lg mb-6">
                    <div className="flex items-center mb-6">
                      <img src={reason.iconUrl} alt={reason.name} className="h-12 w-12 rounded-full mr-4 bg-white" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xl font-bold  dark:text-white"> {reason.name} </h3>
                          <span className="text-zinc-500 dark:text-white">#{reason.rank}</span>
                        </div>
                        <TagComp tags={reason.category.split(',')} />
                      </div>
                    </div>
                    <div className="mb-2">
                      {/* <h4 className="text-lg font-semibold text-zinc-800 dark:text-white">{t('description')}</h4> */}
                      <p className="text-zinc-500 dark:text-white mt-2">{reason.description}</p>
                    </div>
                    <hr className="my-4 border-zinc-300 dark:border-zinc-600" />
                    <div>
                      <h4 className="text-lg font-semibold text-zinc-800 dark:text-white">{t('featuredReason')}</h4>
                      <p className="text-sm text-zinc-500 dark:text-white mt-2">{reason.featuredReason}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
          </section>
        )
      }
      
    </div>
  )
}