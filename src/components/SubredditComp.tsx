'use client';

import PaginationComp from '@/components/PaginationComp';
import SubredditSearch from '@/components/SubredditSearch';
import { Skeleton } from '@/components/ui/skeleton';
import { fetcher } from '@/lib/utils';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Link, useRouter } from '@/i18n/routing';
// import Image from 'next/image';
import { ExternalLink, Search } from 'lucide-react';
import SidebarSubredditSearch from './sidebar-subreddit-search';
import { Input } from './ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Logo from "./logo";
import Empty from './empty';
import { defaultImgUrl } from '@/constants';

interface SubredditCompIprops {
  subridditData: Record<string, any>[];
  tagsData: Record<string, any>[];
  locale: string;
}
export default function  SubredditComp ({subridditData, tagsData, locale}: SubredditCompIprops) {

  // console.log('locale', locale);
  const router = useRouter();
  // const defaultImgUrl = 'https://styles.redditmedia.com/t5_2to41/styles/communityIcon_gznj8kdgrjra1.png?width=64&height=64&frame=1&auto=webp&crop=64:64,smart&s=bde2b559624eb616fc73c533a2d3658d927e892c';
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categories, setCategories] = useState<number[]>([]);
  const [searchTxt, setSearchTxt] = useState<string>('');
  const [rank, setRank] = useState<string>('');
  const [subscriber, setSubscriber] = useState<string>('');
  const [requestUrl, setRequestUrl] = useState<string>(`/${locale}/api/subreddits?page=${currentPage}`);

  const {data: subreddits, isLoading} = useSWR(requestUrl, fetcher, {
    fallbackData: subridditData
  });

  const [total, setTotal] = useState<number>(1);
  const [subredditArrs, setSubredditArrs] = useState<any[]>([]);
  const [searchVisible, setSearchVisible] = useState<boolean>(false);

  useEffect(() => {
    if (subreddits && subreddits.data) {
      setSubredditArrs(subreddits.data);
      setTotal(Math.ceil(subreddits.total / subreddits.pageSize));
    }
  }, [subreddits]);

  const RenderSkeleton = () => {
    return (
      <div className="flex-1 space-y-5">
        {
          new Array(20).fill(0).map((_, index) => (
            <div key={`skeleton-${index}`} className="relative border rounded-lg shadow-md hover:shadow-lg p-5 cursor-pointer bg-white transition-all duration-300">
              <Skeleton className="absolute z-10 w-10 h-8 -top-[10px] -left-[18px] border p-2 rounded-[999px] px-2 py-1 dark:bg-zinc-100" />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Skeleton className="w-14 h-14 rounded-full dark:bg-zinc-100" />
                  <Skeleton className="h-10  w-20 dark:bg-zinc-100" />   
                </div>
                <Skeleton className="text-xs text-zinc-500 w-10 h-4 px-2 py-1 dark:bg-zinc-100" />
              </div>

              <Skeleton className="text-sm leading-5 mt-2  w-full h-8 dark:bg-zinc-100" />

            </div>
          ))
        }
      </div>
    )
  }

  const handleSearchChange = (page = 1, category: number[] = [], searchTxt = '', rank = '', subscriber = '') => {
    let tmpUrl = `/${locale}/api/subreddits?page=${page}`;
    if (category.length > 0) {
      tmpUrl += `&categories=${category.join(',')}`;
    }
    if (searchTxt) {
      tmpUrl += `&searchText=${searchTxt}`;
    }
    if (rank) {
      tmpUrl += `&rank=${rank}`;
    }
    if (subscriber) {
      tmpUrl += `&subscriber=${subscriber}`;
    }
    // console.log('tmpUrl===>>>', tmpUrl);
    setRequestUrl(tmpUrl);
  }

  const handleSubredditClick = (sub: any) => {
    const {name} = sub;
    const url = `/reddit-list/${name}`;
    router.push(url);
  }
  return (      
    <div className="flex flex-1 flex-col md:flex-row">
      {/* <SidebarSubredditSearch /> */}
      <div className="sticky top-20 z-10 bg-white dark:bg-zinc-900 pb-2 pt-2 left-0 right-0 md:hidden mb-8">
        <Input readOnly className="mx-auto w-full border border-zinc-200 dark:border-white pr-20 dark:placeholder:text-zinc-200" placeholder="搜索" onClick={() => setSearchVisible(true)} />
        <Search className="absolute right-3 top-[18px] w-5 h-5 text-zinc-500 dark:text-white" />
        
      </div>

      <SidebarSubredditSearch
        visible={searchVisible} 
        setVisible={() => setSearchVisible(false)}
      />
      <div className="hidden md:block">
        {/* <RenderSubredditSearch /> */}
        <SubredditSearch 
          tagsData={tagsData}
          locale={locale}
          // className={className}
          onCategoryChange={(category) => {
            setCategories(category);
            setCurrentPage(1);
            handleSearchChange(1, category, searchTxt, rank, subscriber);
          }}
          onSearchTxtChange={(searchTxt) => {
            setSearchTxt(searchTxt);
            setCurrentPage(1);
            handleSearchChange(1, categories, searchTxt, rank, subscriber);
          }}
          onRankChange={(rank) => {
            setCurrentPage(1);
            setRank(rank);
            handleSearchChange(1, categories, searchTxt, rank, subscriber);
          }}
          onSubscriberChange={(subscriber) => {
            setCurrentPage(1);
            setSubscriber(subscriber);
            handleSearchChange(1, categories, searchTxt, rank, subscriber);
          }}
        />
      </div>
      
      <div className="flex-1 space-y-5 py-5">
        {
          isLoading && <RenderSkeleton />
        }
        {
          subredditArrs.length > 0 ? subredditArrs.map((sub) => (
            <div key={sub.id} 
              className="relative cursor-pointer ml-4 md:ml-0 order-1 border-l-4 border-orange-500  rounded-lg shadow-md hover:shadow-lg p-5 bg-white transition-all duration-300"
              onClick={() => handleSubredditClick(sub)}
            >
              <div className="absolute -top-[10px] -left-[18px] border p-2 rounded-[999px] px-2 py-1 bg-white text-xs text-zinc-500"># {sub.rank}</div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <img
                    src={sub.iconUrl || defaultImgUrl} 
                    width={64} 
                    height={64} 
                    alt={sub.name} 
                    className="rounded-full"
                    loading="lazy"
                    // unoptimized
                  />
                  <h2 className="text-lg text-black font-bold">{sub.name}</h2>
                </div>
                
              </div>

              <p className="flex flex-wrap text-sm leading-5 mt-2 text-zinc-500">{sub.description}</p>

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-zinc-500 border bg-slate-100 rounded-full px-2 py-1">{sub.category}: {sub.subscribersCount}</span>
                <Link href={`https://reddit.com${sub.href}`} className="flex items-center text-xs text-zinc-500 hover:underline hover:text-orange-500" target="_blank"><ExternalLink className="w-4 h-4 ml-1" /></Link>
              </div>
            </div>
          )) : <Empty />
        }
        
        {
          subredditArrs.length > 0 && (
            <PaginationComp 
              total={total} 
              currentPage={currentPage} 
              onChange={(page) => {
                // console.log('page', page)
                setCurrentPage(page);
                handleSearchChange(page, categories, searchTxt, rank, subscriber);
              }} 
            />
          )
        }
        
      </div>

      <Sheet open={searchVisible} onOpenChange={() => setSearchVisible(false)}>
        <SheetContent
          side="left"
          role="navigation"
          className="bg-white overflow-auto *:text-left"
          iconClass="text-black w-6 h-6"
          
        >
          <SheetHeader>
            <SheetTitle className="h-16 py-2 border-b border-zinc-200">
              <Logo />
            </SheetTitle>
            <SheetDescription asChild>
              {/* <RenderSubredditSearch className="w-full" /> */}
              <SubredditSearch 
                tagsData={tagsData}
                locale={locale}
                className="w-full px-0"
                initialChoiceCategory={categories}
                initialRank={rank}
                initialSubscriber={subscriber}
                initialSearchTxt={searchTxt}
                onCategoryChange={(category) => {
                  setCategories(category);
                  setCurrentPage(1);
                  handleSearchChange(1, category, searchTxt, rank, subscriber);
                }}
                onSearchTxtChange={(searchTxt) => {
                  setSearchTxt(searchTxt);
                  setCurrentPage(1);
                  handleSearchChange(1, categories, searchTxt, rank, subscriber);
                }}
                onRankChange={(rank) => {
                  setCurrentPage(1);
                  setRank(rank);
                  handleSearchChange(1, categories, searchTxt, rank, subscriber);
                }}
                onSubscriberChange={(subscriber) => {
                  setCurrentPage(1);
                  setSubscriber(subscriber);
                  handleSearchChange(1, categories, searchTxt, rank, subscriber);
                }}
              />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}