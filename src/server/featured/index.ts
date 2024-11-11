import { db } from "../db";
import { subredditLang, subriseFeatured } from "../db/schema";
import { eq, and, inArray } from "drizzle-orm";
export async function getSubredditFeaturedList (language: string) {

  return await db
    .select()
    .from(subriseFeatured)
    .where(eq(subriseFeatured.language, language))
    .execute();
} 

export async function getSubredditFeaturedDetail({language, featuredUrl}: {language: string, featuredUrl: string}) {
  const featuredDetail = await db
    .select({
      name: subriseFeatured.name,
      description: subriseFeatured.description,
      promotion: subriseFeatured.promotion,
      subredditId: subriseFeatured.subredditId,
      // notice: subriseFeatured.notice,
    })
    .from(subriseFeatured)
    .where(and(eq(subriseFeatured.language, language), eq(subriseFeatured.featuredUrl, featuredUrl)))
    .execute();

  const {subredditId} = featuredDetail[0]
  // const subredditDetail = await getSubredditByName(subredditId, language)
  // console.log(subredditId);
  let redditIds = subredditId.split(',');
  // console.log(redditIds);

  const reasons = await db
    .select({
      featuredReason: subredditLang.featuredReason,
      category: subredditLang.category
    })
    .from(subredditLang)
    .where(and(eq(subredditLang.language, language), inArray(subredditLang.subredditId, redditIds.map(Number))))
    .execute();

  // console.log(reasons);
  return {
    info: featuredDetail[0],
    reasons: reasons
  };
}