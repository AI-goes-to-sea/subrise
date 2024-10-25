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

export default function RedditListLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
