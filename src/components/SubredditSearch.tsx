'use client'

import React, { useEffect } from 'react';
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";
import { useState } from "react";
import { rankOptions, subscriberOptions } from "../constants";
import { X, RotateCcw } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useTranslations } from 'next-intl';
import { useDebounce } from 'use-debounce';

export default function SubredditSearch({
  locale,
  onCategoryChange,
  onSearchTxtChange,
  onRankChange,
  onSubscriberChange,
  className,
  initialSearchTxt,
  initialChoiceCategory,
  initialRank,
  initialSubscriber,
  tagsData,
}: {
  onCategoryChange: (category: number[]) => void;
  onSearchTxtChange: (searchTxt: string) => void;
  onRankChange: (rank: string) => void;
  onSubscriberChange: (subscriber: string) => void;
  className?: string;
  initialSearchTxt?: string;
  initialChoiceCategory?: number[];
  initialRank?: string;
  initialSubscriber?: string;
  tagsData: Record<string, any>[];
  locale: string;
}) {

  // const { data : tagData, isLoading } = useSWR('/api/subredditTag', fetcher);
  const t = useTranslations('Pages.subreddits');

  // console.log('tagsData', tagsData);
  const [showMore, setShowMore] = useState(false);
  const [searchTxt, setSearchTxt] = useState(initialSearchTxt || '');
  const [categoryTxt, setCategoryTxt] = useState('');
  const [choiceCategory, setChoiceCategory] = useState<number[]>(initialChoiceCategory || []);
  const [rank, setRank] = useState(initialRank || '0');
  const [subscriber, setSubscriber] = useState(initialSubscriber || '0');
  const [debouncedSearchText] = useDebounce(searchTxt, 800);

  useEffect(() => {
    if (onSearchTxtChange) {
      onSearchTxtChange(debouncedSearchText);
    }
  }, [debouncedSearchText]);

  const handleSearchTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('searchTxt', e.target.value);
    setSearchTxt(e.target.value);
    // if (onSearchTxtChange) {
    //   onSearchTxtChange(e.target.value);
    // }
  }

  const handleClearSearchTxt = () => {
    setSearchTxt('');
    if (onSearchTxtChange) {
      onSearchTxtChange('');
    }
  }

  const handleCategoryTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryTxt(e.target.value);
  }

  const handleClearCategoryTxt = () => {
    setCategoryTxt('');
  }

  const handleCategoryChange = (tagId: number, checked: boolean) => {
    const tmpCategory = choiceCategory;
    if (checked) {
      tmpCategory.push(tagId);
    } else {
      tmpCategory.splice(tmpCategory.indexOf(tagId), 1);
    }
    setChoiceCategory(choiceCategory);
    if (onCategoryChange) {
      onCategoryChange(tmpCategory);
    }
  }

  const handleSubscriberChange = (subscriber: string) => {
    setSubscriber(subscriber);
    if (onSubscriberChange) {
      onSubscriberChange(subscriber);
    }
  }

  const handleRankChange = (rank: string) => {
    setRank(rank);
    // console.log("rank===>>>", rank);
    if (onRankChange) {
      onRankChange(rank);
    }
  }

  const handleReset = () => {
    setSearchTxt('');
    setChoiceCategory([]);
    setRank('0');
    setSubscriber('0');
    if (onCategoryChange) {
      onCategoryChange([]);
    }
  }

  return (
    <div className={cn("xl:w-[360px] md:w-[280px] w-[200px] px-5 py-5 mr-8 space-y-5 sticky top-[80px] z-10 transition-all duration-300 bg-white", className)}>

      <h1 className="text-xl text-black font-bold mb-4 relative">
        {t('title')}
        <RotateCcw 
          className="absolute right-0 top-0 w-5 h-5 cursor-pointer text-zinc-500 hover:text-orange-500" 
          onClick={handleReset}
        />
      </h1>
      <div className="relative">
        
        <Label className="text-black font-semibold ">{t('search')}</Label>
        <div className="relative">
          <Input value={searchTxt} onChange={handleSearchTxt} type="text" placeholder={t('placeholder')} 
            className="pr-6 placeholder:text-zinc-400 placeholder:text-sm focus:border-orange-500 focus:border-2"/>
          {
            searchTxt && (
              <X onClick={handleClearSearchTxt} size={14} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500" />
            )
          }
        </div>
        
      </div>

      <div>
        <Label className="text-black font-semibold ">{t('rank')}</Label>

        <RadioGroup className="mt-3" onValueChange={handleRankChange} value={rank}>
          {
            rankOptions?.map((r: Record<string, any>) => {
              return (
                <div className="flex items-center space-x-2" key={`${r.value}`}>
                  <RadioGroupItem value={r.value} id={`rank_${r.value}`} className={cn(
                    rank === r.value ? 'border-orange-500 text-orange-500' : 'border-zinc-500 text-zinc-50'
                  )}/>
                  <Label className="text-zinc-500 cursor-pointer" htmlFor={`rank_${r.value}`}>{t(`${r.label}`)}</Label>
                </div>
              )
            })
          }   
        </RadioGroup>
      </div>

      <div>
        <Label className="text-black font-semibold ">{t('subscrib')}</Label>

        <RadioGroup className="mt-3" onValueChange={handleSubscriberChange} value={subscriber}>
          {
            subscriberOptions?.map((s: Record<string, any>) => {
              return (
                <div className="flex items-center space-x-2" key={`${s.value}`}>
                  <RadioGroupItem value={s.value} id={`sub_${s.value}`} className={cn(
                    subscriber === s.value ? 'border-orange-500 text-orange-500' : 'border-zinc-500 text-zinc-50'
                  )}/>
                  <Label className="text-zinc-500 cursor-pointer" htmlFor={`sub_${s.value}`}>{t(`${s.label}`)}</Label>
                </div>
              )
            })
          }   
        </RadioGroup>
      </div>

      <div>
        <Label className="text-black font-semibold ">{t('category')}</Label>
        <div className="relative">
          <Input value={categoryTxt} onChange={handleCategoryTxt} type="text" placeholder={t('placeholder')} 
            className="pr-6 placeholder:text-zinc-400 placeholder:text-sm focus:border-orange-500 focus:border-2"/>
          {
            categoryTxt && (
              <X onClick={handleClearCategoryTxt} size={14} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400" />
            )
          }
        </div>

        <div className="flex flex-col space-y-3 mt-3">
          {tagsData?.filter((tag: Record<string, any>) => tag.name.includes(categoryTxt)).map((tag: Record<string, any>, index: number) => {

            return (
              <div className={cn(
                `flex items-center justify-between cursor-pointer`,
                !showMore && index >= 10 ? 'hidden' : 'flex'
              )} key={tag.id}>
                <div className="flex items-center space-x-1 text-sm text-slate-600">
                  <Checkbox 
                    checked={choiceCategory.includes(tag.subredditId)}
                    id={tag.id} 
                    className="cursor-pointer data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 data-[state=checked]:text-white border-zinc-500" 
                    onCheckedChange={(checked: boolean) => handleCategoryChange(tag.subredditId, checked)}
                  />
                  <Label htmlFor={tag.id} className="cursor-pointer text-zinc-500 ">{tag.name}</Label>
                </div>
                <span className="text-xs text-gray-400 ml-2 " >{tag.subredditNum}</span>
              </div>
            )
          })}

          {
            tagsData?.filter((tag: Record<string, any>) => tag.name.includes(categoryTxt)).length > 0 ? ( 
              !showMore ? 
              <span className="cursor-pointer text-sm text-blue-300 " onClick={() => setShowMore(true)}>+ {t('more')}</span> :
              <span className="cursor-pointer text-sm text-blue-300 " onClick={() => setShowMore(false)}>- {t('collapse')}</span>
            ) : null
          }
        </div>
      </div>

    </div>
  );
}
