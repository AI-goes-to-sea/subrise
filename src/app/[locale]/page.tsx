

import { LogoTitle } from '@/constants'
import LandingTypeWrite from '@/components/LandingTypeWrite';
import Image from 'next/image';
import summaryImg from '@/../public/summary.svg'
import conceptsImg from '@/../public/concept.svg'
import catalogImg from '@/../public/catalog.svg'
import subriseLogo from '@/../public/subrise_icon.svg';
import { ChevronsRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export const runtime = 'edge';

export default function Home() {

  const t = useTranslations('Pages');

  return (
    <>
      <div className="flex flex-col w-full min-h-[700px] justify-center">
        
        <section className="text-center md:mt-10 lg:mt-0 flex justify-center items-center">
          <div className="flex w-full items-center justify-center text-black">
            <div className="flex justify-end">
              <Image src={subriseLogo.src} className="h-[64px] md:h-[96px] md:w-[96px]" width={64} height={74} alt="图片" loading='lazy'/>
            </div>
            <div className="flex flex-col space-y-2 flex-1 md:flex-none ml-2 h-[64px] md:h-[96px] justify-center text-left md:ml-10">
              <h1 className="text-md mt-0 md:text-2xl lg:text-4xl font-normal dark:text-white md:mt-2 line-clamp-1">{t('home.title', {LogoTitle})}</h1>
              <h2 className="
                  text-sm md:text-xl font-bold bg-gradient-to-r
                  from-orange-500 to-rose-400 bg-clip-text text-transparent
                  dark:from-orange-500 dark:to-rose-400
                  leading-4 md:leading-8
                  md:mt-2 md:h-7 line-clamp-2
                ">
                  <LandingTypeWrite arrs={[t('home.subTitle', {LogoTitle})]}/>
                </h2>
            </div>
          </div>
          
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 md:mt-10 lg:mt-14">
          {[
            { title: t('home.concepts_title'), description: t('home.concepts_description'), href: '/concept', img: conceptsImg, alt:t('home.concepts_title') },
            { title: t('home.subreddits_title'), description: t('home.subreddits_description'), href: '/reddit-list', img: catalogImg, alt:t('home.subreddits_title') },
            { title: t('home.tips_title'), description: t('home.tips_description'), href: '/blog', img: summaryImg, alt:t('home.tips_title') },
            // { title: 'Reddit工具', description: '了解有用的第三方工具和浏览器插件', href: '/tools', img: toolsImg },
          ].map((item, index) => (
            <Link key={index} href={item.href} className="block bg-white 
              rounded-xl overflow-hidden md:*:text-center pb-5
              border border-zinc-200 shadow-sm hover:shadow-lg
              dark:border-none dark:ring-[#171E2D] transition-all duration-100
              group hover:bg-orange-500 hover:border-orange-500
              relative
            ">
              <Image 
                src={item.img.src} 
                className="w-full h-[200px] bg-zinc-50 dark:bg-zinc-100 object-contain dark:bg-transparent" 
                width={64}
                height={200}
                alt={item.alt}
                loading="lazy"
              />
              <div className="md:hidden absolute z-10 right-0 bottom-5 w-10 h-10 text-orange-500 group-hover:text-white">
                <ChevronsRight />
              </div>
              <h2 className="group-hover:text-white text-base md:text-xl font-semibold line-clamp-1 px-5 md:leading-8 text-orange-500 mt-5">{item.title}</h2>
              <p className="group-hover:text-white text-zinc-500 text-sm md:text-md pl-5 pr-8 md:px-5 line-clamp-2 md:leading-6 mt-1 md:mt-2 dark:text-zinc-400">{item.description}</p>
            </Link>
          ))}
        </section>

      </div>
    </>
  )
}
