import { Info, Star, List } from 'lucide-react';
import { useTranslations } from "next-intl";

import { Metadata } from "next";

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
    <div className="space-y-8">
      { /* Description */}
      <section className="p-8 rounded-lg shadow-md border dark:border-zinc-500 dark:text-white dark:bg-zinc-700">
        <div className="flex items-center mb-4">
          <Info className="relative -top-0.5 h-8 w-8 text-orange-500 mr-2" />
          <h2 className="text-3xl font-bold text-orange-500">{t('description')}</h2>
        </div>
        <pre className="text-lg leading-8 text-zinc-500 dark:text-white whitespace-pre-wrap">{info.description?.replace(/\\n/g, '\n')}</pre>
      </section>

      {/* Promotion */}
      <section className="p-8 rounded-lg shadow-md border dark:border-zinc-500 dark:text-white dark:bg-zinc-700">
        <div className="flex items-center mb-4">
          <Star className="relative -top-0.5 h-8 w-8 text-orange-500 mr-2" />
          <h2 className="text-3xl font-bold text-orange-500">{t('promotion')}</h2>
        </div>
        <pre className="text-lg text-zinc-500 dark:text-white whitespace-pre-wrap">{info.promotion?.replace(/\\n/g, '\n\n')}</pre>
      </section>

      {/* Featured Reasons - 时间轴布局 */}
      {
        reasons.length > 0 && (
          <section className="p-8 rounded-lg shadow-md border dark:border-zinc-500 dark:text-white dark:bg-zinc-700">
            <div className="flex items-center mb-4">
              <List className="relative -top-0.5 h-8 w-8 text-orange-500 mr-2" />
              <h2 className="text-3xl font-bold text-orange-500">{t('featuredReason')}</h2>
            </div>
            <div className="relative mt-10">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-orange-300 dark:border-orange-600"></div>
              {reasons.map((reason, index) => (
                <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="order-1 w-5/12"></div>
                  <div className="z-20 flex items-center order-1 bg-orange-500 dark:bg-orange-600 shadow-xl w-8 h-8 rounded-full">
                    <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
                  </div>
                  <div className="order-1 border-l-4 border-orange-500 rounded-lg shadow-md w-5/12 px-6 py-4">
                    <p className="text-lg text-zinc-500 dark:text-white">{reason.featuredReason}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      }
      
    </div>
  )
}