import { NextRequest, NextResponse } from 'next/server';
import { subreddit } from '@/server/db/schema';
import { db } from '@/server/db';
import { inArray, like, and, desc, gt, lt, gte, lte, count } from "drizzle-orm";
import { getSubredditList } from '@/server/subreddits';
// import { sleep } from '@/lib/utils';

export const runtime = "edge";

const SubscriberMaps: Record<string, number[]> = {
  "1": [0, 10 * 10000],
  "2": [10 * 10000, 100 * 10000],
  "3": [100 * 10000, 1000 * 10000],
  "4": [1000 * 10000, 100000 * 10000],
};

export async function GET(request: NextRequest) {

    // sleep(10000);
  const params = await request.nextUrl.searchParams;
  const page = params.get("page") || "1";
  const rankRange = params.get("rank") || "0";
  const subscribersCountRange = params.get("subscriber") || "0";
  const searchText = params.get("searchText") || "";
  const categories = params.get("categories") || "";
  const locale = params.get("locale") || "";
  
  // return NextResponse.json({});
  const result = await getSubredditList({
    page,
    rank: rankRange,
    subscriber: subscribersCountRange,
    searchText,
    categories,
  }, locale);

  return NextResponse.json(result);

 // "Funny/Humor", "Gaming"
  // let limitCount = 20;
  // const limtPage = 20;
  // const offset = (+(page || 1) - 1) * limtPage;

  // const whereParams = [];

  // if (categories.length > 0) {
  //   whereParams.push(inArray(subreddit.category, categories));
  // }

  // if (searchText && searchText.length > 0) {
  //   whereParams.push(like(subreddit.name, `%${searchText}%`))
  //   whereParams.push(like(subreddit.description, `%${searchText}%`))
  // }


  // if (rankRange && rankRange !== "0") {
  //   switch (rankRange) {
  //     case "1":
  //       limitCount = 10;
  //       break;
  //     case "2":
  //       limitCount = 50;
  //       break;
  //     case "3":
  //       limitCount = 100;
  //       break;
  //     case "4":
  //       limitCount = 500;
  //       break;
  //   }
  // }

  // if (subscribersCountRange && subscribersCountRange !== "0") {
  //   const [minSubscribers, maxSubscribers] = SubscriberMaps[subscribersCountRange];
  //   switch (subscribersCountRange) {
  //     case "1":
  //       whereParams.push(gte(subreddit.subscribersCount, minSubscribers),lte(subreddit.subscribersCount, maxSubscribers));
  //       break;
  //     case "2":
  //       whereParams.push(gt(subreddit.subscribersCount, minSubscribers),lte(subreddit.subscribersCount, maxSubscribers));
  //       break;
  //     case "3":
  //       whereParams.push(gt(subreddit.subscribersCount, minSubscribers),lte(subreddit.subscribersCount, maxSubscribers));
  //       break;
  //     case "4":
  //       whereParams.push(gt(subreddit.subscribersCount, minSubscribers));
  //       break;
  //   }
  // }

  // const result = await db
  //   .select()
  //   .from(subreddit)
  //   .where(and(...whereParams)) // 按类别
  //   .orderBy(desc(subreddit.subscribersCount))
  //   .limit(limtPage)
  //   .offset(offset)
  //   .all();

  // const totalCount = await db
  //   .select({ count: count() })
  //   .from(subreddit)
  //   .where(and(...whereParams));

  // const total = rankRange === "0" ? totalCount[0].count : limitCount;
  // // console.log("totalCount===>>>", total);

  // return NextResponse.json({
  //   data: result,
  //   total,
  //   page,
  //   pageSize: limtPage,
  // });
  // return NextResponse.json({});
}