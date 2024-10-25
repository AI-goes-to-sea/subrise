
import './globals.css'
import type { Metadata } from 'next'
import React from 'react';
import { GeistSans } from "geist/font/sans";
import Navigation from '@/components/Navigation'
import { ScrollToTop } from '@/components/ScrollToTop'
import Footer from '@/components/Footer'
// import { LogoTitle } from '@/constants'
import { ThemeProvider } from '@/components/ThemeProvider'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { GoogleAnalytics } from '@next/third-parties/google'

export const runtime = 'edge';

interface ExtendedMetadata extends Metadata {
  metadataMap?: {
    canonical?: string
  }
}

const metadataMap: Record<string, ExtendedMetadata> = {
  'en': {
    title: 'Subrise: A Professional Reddit Traffic Monetization Tool For You',
    description: 'Subrise is meticulously crafted as a Reddit operations tool for entrepreneurs expanding overseas. It selects and categorizes high-quality Reddit information and operational insights. We help you discover high-quality, business-relevant Reddit communities and share frontline operational know-how, assisting you in monetizing Reddit traffic.',
    keywords: 'Reddit, traffic acquisition, ultimate guide, using Reddit',
    metadataBase: new URL('https://subrise.co'),
    alternates: {
      canonical: '/en',
    },
  },
  'zh': {
    title: "Subrise: Reddit流量掘金工具",
    description: 'Subrise精心为出海创业者打造Reddit运营工具，挑选并分类优质的Reddit 资讯，运营干货。我们帮助你发现高质、与业务匹配的Reddit 流量社区，分享一线实操运营干货，帮助您实现 Reddit 流量掘金。',
    keywords: 'Reddit, 流量获取, 终极指南, 使用Reddit',
    metadataBase: new URL('https://subrise.co'),
    alternates: {
      canonical: '/zh',
    },
  },
  // 可以添加更多语言的 metadata
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return metadataMap[params.locale] || metadataMap['en'] // 默认返回英文 metadata
}

interface RootLayoutIProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({children, modal, params}: RootLayoutIProps)  {
  const messages = await getMessages();

  return (
    <html lang={params.locale}>
      <body className={`${GeistSans.variable} flex justify-between flex-col min-h-screen bg-white dark:bg-black dark:text-whte`}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <header className="bg-white h-20 shadow-md sticky top-0 z-50 dark:bg-black backdrop-blur-lg">
            <Navigation />
          </header>

          {/* flex-grow container mx-auto px-4 py-8 max-w-7xl  */}
          <main className="flex flex-1 relative container mx-auto px-4 py-8 max-w-7xl">
            {children}
            {modal}
          </main>
            <ScrollToTop />
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>

        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ''} />
      </body>
    </html>
  )
}

// export default RootLayout;