import { getAllTips } from "@/server/tips";
import TipsPageComp from "@/components/TipsPageComp";
import { Metadata } from "next";

export const runtime = 'edge';

const metadataMap: Record<string, Metadata> = {
  'en': {
    title: 'Reddit Traffic Strategies and Practical Tips | Reddit Karma Earning | Subrise',
    description: 'Share valuable insights on driving traffic and earning Karma on Reddit, helping you find the right Subreddits and sharing frontline hands-on experience in demand mining and product promotion within the Reddit community.',
    keywords: 'Reddit, Traffic Generation, Earning Karma, Valuable Insights, Demand Discovery, Product Promotion',
    metadataBase: new URL('https://subrise.co'),
    alternates: {
      canonical: '/en/blog',
    },
  },
  'zh': {
    title: "Reddit搞流量经验干货 ｜ Reddit赚 Karma ｜ Subrise ",
    description: '分享在 Reddit 搞流量、赚 Karma的干货经验，帮助你找到合适的 Subreddit，分享在 Reddit中进行需求挖掘，产品推广的一线实操经验。',
    keywords: 'Reddit, 搞流量, 赚 Karma, 干货经验, 需求挖掘, 产品推广',
    metadataBase: new URL('https://subrise.co'),
    alternates: {
      canonical: '/zh/blog',
    },
  },
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return metadataMap[params.locale] || metadataMap['en'] // 默认返回英文 metadata
}

export default async function Tips({ params }: { params: { locale: string } }) {
  // await sleep(100000);
  const data = await getAllTips(params.locale);
  return (
    <TipsPageComp initData={data || []} />
  )
}
