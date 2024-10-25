import { Metadata } from "next";

const metadataMap: Record<string, Metadata> = {
  'en': {
    title: 'Introduction to Basic Concepts and Strategies on Reddit | Subrise',
    description: 'Introduction to Basic Concepts of Reddit: Posts, Comments, Karma System, Reddit Premium, and Reddit Coins',
        keywords: 'Reddit,Basic Concepts,Gameplay Introduction,Comments,Karma Mechanism,Reddit Premium,Reddit Coins',
    metadataBase: new URL('https://subrise.co'),
    alternates: {
      canonical: '/en/concept',
    },
  },
  'zh': {
    title: "Reddit 基础概念和玩法介绍｜Subrise",
    description: '详细介绍 Reddit 的基础概念， Post，Comment，Karma 机制，Reddit Premium、Reddit Coins等',
    keywords: 'Reddit, 基础概念, 玩法介绍, 帖子, 评论, Karma 机制, Reddit Premium, Reddit Coins',
    metadataBase: new URL('https://subrise.co'),
    alternates: {
      canonical: '/zh/concept',
    },
  },
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return metadataMap[params.locale] || metadataMap['en'] // 默认返回英文 metadata
}

export default function ConceptsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
