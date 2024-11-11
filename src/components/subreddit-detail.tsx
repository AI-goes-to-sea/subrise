import { useTranslations } from "next-intl";
import { Check, CircleAlert, Flame } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import {Link} from "@/i18n/routing";
import { ExternalLink } from "lucide-react";

interface SubredditDetailProps {
  item: Record<string, any>;
}

export default function SubredditDetail({item}: SubredditDetailProps) {

  const t = useTranslations('Pages.subredditsDetail');

  const RenderItem = ({
    title,
    value,
    description
  }: {
    title: string,
    value: string | number,
    description: string
  }) => {
    return (
      <div className="flex flex-col py-8 px-5 shadow-md rounded-md border border-zinc-200 dark:border-zinc-500">
        <h2 className="mb-1 text-lg font-bold text-orange-500 dark:text-white">{title}</h2>
        <p className="text-2xl font-semibold text-black line-clamp-1 dark:text-orange-500">{value}</p>
        <p className="mt-1 text-xs text-zinc-500 line-clamp-1 dark:text-white">{description}</p>
      </div>
    )
  }
  
  return (
    <>
      {/* <div className="rounded-md bg-orange-500 text-white dark:bg-white dark:text-orange-500 p-4">
        <p className="font-semibold text-center">{t('tips')}</p>
      </div>   */}
      <div className="flex justify-between items-center mb-6 mt-8">
        <h1 className="flex justify-center items-center mb-6 mt-8 text-center text-3xl font-bold dark:text-white">
          <Image src={item.iconUrl} alt={item.name} width={64} height={64} unoptimized loading="lazy" className="rounded-full mr-3" />
          {item.name}
        </h1>
        <Link href={`https://reddit.com/${item.name}`} className="flex  items-center text-xs text-orange-500" target="_blank">
          <ExternalLink className="md:hidden w-6 h-6 mr-1 mt-2" />

          <button className="hidden md:flex md:items-center md:h-6 md:text-base md:font-normal md:text-orange-500 border border-zinc-100 rounded-full px-4 py-4 shadow-md  hover:shadow-lg mt-2">{t('visit')} <ExternalLink className="w-4 h-4 ml-1" /></button>
        </Link>


        
      </div>
      
      <div className="mb-6 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-500 p-6 *:dark:text-white">
        <pre className="text-lg text-zinc-500 whitespace-pre-wrap">{item.description.replace(/\\n/g, '\n')}</pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <RenderItem title={t('rank')} value={`${item.rank || ''}`} description={t('rank_description')} />
        <RenderItem title={t('subscribersCount')} value={formatNumber(item.subscribersCount)} description={t('subscribersCount_description')} />
        <RenderItem title={t('tagName')} value={`${item.tagName || ''}`} description={t('tagName_description')} />
      </div>

      <div className="mb-6 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-6 text-white"> 
        <h2 className="mb-4 flex items-center text-2xl font-semibold text-orange-500"> 
          <Check className="mr-2 w-6 h-6" /> {t('promotion')}
        </h2>
        <pre className="text-base text-zinc-500 whitespace-pre-wrap dark:text-white">
          {item.promotion?.replace(/\\n/g, '\n')}
        </pre> 
      </div>

      <div className="mb-6 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-6"> 
        <h2 className="mb-4 flex items-center text-2xl font-semibold text-orange-500">
          <CircleAlert className="mr-2 w-6 h-6" /> {t('notice')}
        </h2> 
        <pre className="whitespace-pre-wrap text-base text-zinc-500 dark:text-white">
          {item.notice?.replace(/\\n/g, '\n')}
        </pre> 
      </div>

      {
        item.featuredReason && (
          <div className="mb-6 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-6"> 
            <h2 className="mb-4 flex items-center text-2xl font-semibold text-orange-500">
              <Flame className="mr-2 w-7 h-7" /> {t('featuredReason')}
            </h2> 
            <pre className="whitespace-pre-wrap text-base text-zinc-500 dark:text-white">
              {item.featuredReason?.replace(/\\n/g, '\n')}
            </pre> 
          </div>
        )
      }
    </>
  )
}