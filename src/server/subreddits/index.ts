import { subreddit, subredditLang, subredditTag, subredditTagLang } from '@/server/db/schema';
import { db } from '@/server/db';
import { inArray, like, and, desc, gt, gte, lte, count, eq } from "drizzle-orm";
import { SITEMAP_INDEX_PAGE_SIZE } from '@/constants';

const SubscriberMaps: Record<string, number[]> = {
  "1": [0, 10 * 10000],
  "2": [10 * 10000, 100 * 10000],
  "3": [100 * 10000, 1000 * 10000],
  "4": [1000 * 10000, 100000 * 10000],
};

type SubredditParams = {
  page: string,
  rank?: string;
  subscriber?: string;
  searchText?: string;
  categories?: string;
}

export async function getSubredditList (params: SubredditParams, locale: string) {

  // console.log('params.categories', params["categories"]);
  const page = params["page"];
  const rankRange = params["rank"] || "0";
  const subscribersCountRange = params["subscriber"] || "0";
  const searchText = params["searchText"] || "";
  const categories = params["categories"] ? params["categories"].split(",") : []; // "Funny/Humor", "Gaming"
  let limitCount = 20;
  const limtPage = 20;
  const offset = (+(page || 1) - 1) * limtPage;

  // console.log(page, rankRange, subscribersCountRange, searchText, categories, locale);

  const whereParams = [];

  if (categories.length > 0) {
    // console.log('categories', categories.length)
    whereParams.push(inArray(subreddit.tagId, categories.map(Number)));
  }

  if (searchText && searchText.length > 0) {
    whereParams.push(like(subreddit.name, `%${searchText}%`))
    whereParams.push(like(subredditLang.description, `%${searchText}%`))
  }

  if (locale) {
    whereParams.push(eq(subredditLang.language, locale))
  }

  if (rankRange && rankRange !== "0") {
    switch (rankRange) {
      case "1":
        limitCount = 10;
        break;
      case "2":
        limitCount = 50;
        break;
      case "3":
        limitCount = 100;
        break;
      case "4":
        limitCount = 500;
        break;
    }
  }

  if (subscribersCountRange && subscribersCountRange !== "0") {
    const [minSubscribers, maxSubscribers] = SubscriberMaps[subscribersCountRange];
    switch (subscribersCountRange) {
      case "1":
        whereParams.push(gte(subreddit.subscribersCount, minSubscribers),lte(subreddit.subscribersCount, maxSubscribers));
        break;
      case "2":
        whereParams.push(gt(subreddit.subscribersCount, minSubscribers),lte(subreddit.subscribersCount, maxSubscribers));
        break;
      case "3":
        whereParams.push(gt(subreddit.subscribersCount, minSubscribers),lte(subreddit.subscribersCount, maxSubscribers));
        break;
      case "4":
        whereParams.push(gt(subreddit.subscribersCount, minSubscribers));
        break;
    }
  }

  const result = await db
    .select({
      id: subreddit.id,
      name: subreddit.name,
      rank: subreddit.rank,
      iconUrl: subreddit.iconUrl,
      subscribersCount: subreddit.subscribersCount,
      href: subreddit.href,
      tagId: subreddit.tagId,
      category: subredditTagLang.name,
      description: subredditLang.description,
      createdAt: subreddit.createdAt,
    })
    .from(subreddit)
    .innerJoin(subredditLang, eq(subreddit.id, subredditLang.subredditId))
    .innerJoin(subredditTagLang, eq(subreddit.tagId, subredditTagLang.subredditTagId))
    .where(and(...whereParams, eq(subredditTagLang.language, locale))) // 按类别
    .orderBy(desc(subreddit.subscribersCount))
    .limit(limtPage)
    .offset(offset)
    .execute();

  const totalCount = await db
    .select({ count: count() })
    .from(subreddit)
    .innerJoin(subredditLang, eq(subreddit.id, subredditLang.subredditId))
    .where(and(...whereParams))
    .execute();

  const total = rankRange === "0" ? totalCount[0].count : limitCount;

  return {
    data: result,
    total,
    page,
    pageSize: limtPage,
  };
}

export async function getAllTags (language: string) {

  return db
    .select({
      id: subredditTagLang.id,
      subredditId: subredditTag.id,
      language: subredditTagLang.language,
      name: subredditTagLang.name,
      subredditNum: subredditTag.subredditNum
    })
    .from(subredditTagLang)
    .innerJoin(subredditTag, eq(subredditTag.id, subredditTagLang.subredditTagId))
    .where(eq(subredditTagLang.language, language || 'en'))
    .orderBy(desc(subredditTag.subredditNum))
    .execute();
}

export async function getSubredditById (id: number, language: string) {
  return await db
    .select({
      id: subreddit.id,
      name: subreddit.name,
      rank: subreddit.rank,
      tagId: subreddit.tagId,
      iconUrl: subreddit.iconUrl,
      subscribersCount: subreddit.subscribersCount,
      description: subredditLang.description,
      tagName: subredditLang.tagName,
      notice: subredditLang.notice,
      promotion: subredditLang.promotion,
    })
    .from(subreddit)
    .innerJoin(subredditLang, eq(subreddit.id, subredditLang.subredditId))
    .where(and(eq(subreddit.id, id), eq(subredditLang.language, language)))
    .execute();
}

export async function getSubredditByName (name: string, language: string) {
  return await db
    .select({
      id: subreddit.id,
      name: subreddit.name,
      rank: subreddit.rank,
      tagId: subreddit.tagId, 
      iconUrl: subreddit.iconUrl,
      subscribersCount: subreddit.subscribersCount,
      description: subredditLang.description,
      tagName: subredditLang.tagName,
      notice: subredditLang.notice,
      promotion: subredditLang.promotion,
      featuredReason: subredditLang.featuredReason,
    })
    .from(subreddit)
    .innerJoin(subredditLang, eq(subreddit.id, subredditLang.subredditId))  
    .where(and(eq(subreddit.name, name), eq(subredditLang.language, language)))
    .execute();
}

export async function getAllSubredditNoLimit () {
  return db
    .select({
      name: subredditLang.subredditName,
      language: subredditLang.language,
      updatedAt: subredditLang.createdAt,
    })
    .from(subredditLang)
    .execute();
}

export async function getRedditListByPage (page: number) {
  const limtPage = SITEMAP_INDEX_PAGE_SIZE;
  const offset = (+(page || 1) - 1) * limtPage;

  return db
    .select({
      name: subredditLang.subredditName,
      language: subredditLang.language,
      updatedAt: subredditLang.createdAt,
    })
    .from(subredditLang)
    .limit(limtPage)
    .offset(offset)
    .execute();
}

export async function getSubredditTotalCount () {
  return db
    .select({ count: count() })
    .from(subredditLang)
    .execute();
}
