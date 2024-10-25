"use client";
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Logo from './logo';
import { Link, usePathname } from '@/i18n/routing';
import { NavItems } from '@/constants';
import { cn } from '@/lib/utils';
// import { usePathname } from 'next/navigation'

export default function Footer() {

  const t = useTranslations('Components.footer');
  const tRoutes = useTranslations('Routes');
  const [isHome, setIsHome] = useState(false);
  const pathname = usePathname();
  // console.log('pathname', pathname)
  useEffect(() => {
    setIsHome(pathname === '/' || pathname === '/en' || pathname === '/zh');
  }, [pathname]);

  const supportLinks = [
    { label: 'AI Just Works', href: '', title: 'AI Just Works' },
    { label: 'AIToolly', href: 'https://AIToolly.com/', title: 'Best AI Tools Directory' },
    { label: 'Dir2AI', href: 'https://www.dir2ai.com', title: 'Dir2AI Tools Directory' },
    { label: 'RightAI Tools Diresctory', href: 'https://right-ai.com/', title: 'RightAI Tools Diresctory' },
    { label: 'All in AI Tools', href: 'https://allinai.tools', title: 'The Best AI Tools' },
    { label: 'AIPURE AI', href: 'https://aipure.ai/', title: 'AIPURE AI' },
    { label: 'Bai.tools', href: 'https://bai.tools/', title: 'Best AI Tools Directory' },
    { label: 'AIEasy.life AI Tools', href: 'https://aieasy.life/', title: 'aieasy.life' },
    { label: 'AI With Me', href: 'https://aiwith.me/', title: 'AI With Me: Discover thousands of AI Tools' },
    { label: 'MagicBox.Tools - AI Tools Diresctory', href: 'https://magicbox.tools/', title: 'MagicBox.Tools - AI Tools Diresctory' },
    { label: 'iuu AI', href: 'https://iuu.ai/', title: 'iuu AI' },
    { label: 'Flux Image AI', href: 'https://tap4.ai/ai/flux-ai-io', title: 'Flux Image AI' },
  ];

  // const navLinks = [
  //   { label: 'Home', href: '/', title: 'Home' },
  //   { label: 'Concept', href: '/concept', title: 'Concept' },
  //   { label: 'Explore Reddit', href: '/reddit-', title: 'Concept' },
  //   { label: 'Concept', href: '/concept', title: 'Concept' },
  //   { label: 'Privacy Policy', href: '/privacy-policy', title: 'Privacy Policy' },
  //   { label: 'Terms of Service', href: '/terms-of-service', title: 'Terms of Service' },
  // ];

  const commonClasses = 'border-b border-zinc-100 dark:border-zinc-800 pb-3 lg:pb-0 lg:border-none';

  return (
    <footer className=" bg-white shadow-lg mt-10 border-t border-zinc-200 dark:bg-black dark:border-zinc-700 transition-all duration-300">
      <div className="container mx-auto max-w-7xl px-5 py-8 text-gray-600 flex flex-col lg:flex-row lg:justify-between">
        <div className={cn("flex flex-col space-y-3 ", commonClasses)}>
          <div className="flex"><Logo /> </div>
          <span className="hidden text-sm lg:block lg:text-md mt-0 md:mt-1 dark:text-white">{t('copyright')}</span>
        </div>
        <div className="flex flex-col space-x-0 lg:flex-row lg:space-x-20 mt-5 lg:mt-0">

          <div className={cn("flex flex-col lg:space-x-0 lg:items-start lg:flex-col lg:space-y-2 ", commonClasses)}>
            <label className="text-sm lg:text-md mb-2 lg:mb-0 font-semibold leading-6 footer-leading-text dark:text-white">{t('nav')} </label>
            <div className="flex flex-wrap flex-1 lg:justify-start lg:space-x-0 lg:items-start lg:flex-col lg:space-y-2">
              <Link className="text-sm mr-4 mb-2 lg:mb-0 text-zinc-500 dark:text-white hover:text-orange-500 transition-all duration-300" href="/">{tRoutes('home')}</Link>
              {
                NavItems.map((item) => <Link className="text-sm mr-4 mb-2 lg:mb-0 text-zinc-500 dark:text-white hover:text-orange-500 transition-all duration-300" href={item.link} key={`nav_${item.link}`}>{tRoutes(item.title)}</Link>)
              }
              <Link className="text-sm mr-4 mb-2 lg:mb-0 text-zinc-500 dark:text-white hover:text-orange-500 transition-all duration-300" href="/privacy-policy">{t('privacy_policy')}</Link>
              <Link className="text-sm mr-4 mb-2 lg:mb-0 text-zinc-500 dark:text-white hover:text-orange-500 transition-all duration-300" href="/terms-of-service">{t('terms_of_service')}</Link>
            </div>
            
          </div>

          {
            isHome && (
              <div className={cn("flex flex-col space-y-2 mt-4 lg:mt-0 ", commonClasses)}>
                <label className="text-sm lg:text-md font-semibold leading-6 footer-leading-text dark:text-white">{t('support')} </label>
                {/* <Link href="https://www.instagram.com/">b'bb</Link>
                <Link href="https://www.facebook.com/">aaa</Link> */}
                <div className="flex flex-wrap flex-1 lg:justify-start lg:space-x-0 lg:items-start lg:flex-col lg:space-y-2">
                  {
                    supportLinks.map((link) => (
                      <a className="text-sm mr-4 mb-2 lg:mb-0 text-zinc-500 dark:text-white hover:text-orange-500 transition-all duration-300" target="_blank" key={link.href} href={link.href} title={link.title}>{link.label}</a>
                    ))
                  }
                </div>
                
              </div>
            )
          }
          
          
          <span className="block text-sm mt-4 lg:hidden lg:text-md dark:text-white">{t('copyright')}</span>
        </div>
        
      </div>
      {/* <div className="container mx-auto max-w-7xl px-5 py-8 text-center">
        <div>
          <Logo />

        </div>
      </div> */}
      
    </footer>
  )
}