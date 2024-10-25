import { eq, and } from "drizzle-orm";
import { db } from "../db";
import { article } from "../db/schema";
// import { NextApiRequest } from "next";

export async function getAllTips (language: string = 'en') {
  return await db.select().from(article).where(eq(article.language, language));
}

export async function getAllTipsNoLimit() {
  return await db.select().from(article);
}

export async function getTipBySlug(slug: string, language: string = 'en') {
  // console.log('请求的参数:', slug);
  try {
    const result = await db
      .select()
      .from(article)
      .where(and(eq(article.articleUrl, slug), eq(article.language, language)))
      .execute();
    return result;
  } catch (error) {
    console.error('Error reading file:', error);
    return {};
  }
}