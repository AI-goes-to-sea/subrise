import { ArticleItems } from "@/constants";
import { Link } from '@/i18n/routing';
import Image from "next/image";
import TagComp from "./TagComp";
import article_3 from '@/../public/article_4.svg';
import { useTranslations } from 'next-intl';

export default function TipsPageComp ({
  initData
}: {
  initData: Record<string, any>
}) {

  const t = useTranslations('Pages.blogs');

  return (
      <div className="flex flex-1 flex-col space-y-8">
        {
          initData?.map((article: ArticleItems, index: number) => (
            <Link href={`/blog/${article.articleUrl}`} className="block" key={article.id}>
              <div className="flex justify-between items-center p-6 bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
                <div className="flex flex-1">
                  <div className="flex-1">
                    <h2 className="text-xl text-black leading-8 font-bold relative line-clamp-1">{index + 1}. {article.title}</h2>
                    <p className="text-zinc-500 text-sm leading-6 line-clamp-2 mt-2">{article.description}</p>

                    <div className="mt-2 flex  space-x-5 items-center">
                      <span className="text-zinc-400 text-sm">{t('publish_date')}: {article.createdAt}</span>
                      <div className="flex">
                        <TagComp tags={article.tags?.split(',') || []} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-20 h-20  ml-5 hidden md:flex">
                  <Image 
                    src={article.imageUrl ? article.imageUrl : article_3.src } 
                    width={80}
                    height={80}
                    alt="image"
                    loading="lazy" 
                    unoptimized
                    className="object-contain shadow-md bg-zinc-50"
                  />
                </div>
              </div>
            </Link>
          ))    
        }
      </div>        
  )
}
