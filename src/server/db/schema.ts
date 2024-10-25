import {
  sqliteTable,
  integer,
  text,
  uniqueIndex,
  numeric,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// 定义 subreddit 表
export const subreddit = sqliteTable(
  "subreddit",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
    rank: text("rank"),
    iconUrl: text("icon_url"),
    subscribersCount: integer("subscribers_count"),
    description: text("description"),
    href: text("href"),
    tagId: integer("tagId"),
    createdAt: numeric("createdAt")
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
  },
  (subreddit) => ({
    nameIndex: uniqueIndex("subreddit_name_idx").on(subreddit.name),
    tagIdIndex: uniqueIndex("subreddit_tagId_idx").on(subreddit.tagId),
  })
);


export const subredditLang = sqliteTable("subredditLang", {
	id: integer("id").primaryKey().notNull(),
	subredditId: integer("subredditId").notNull().references(() => subreddit.id),
	subredditName: text("subredditName").notNull(),
	language: text("language").notNull(),
	description: text("description"),
	promotion: text("promotion"),
	category: text("category"),
	tagName: text("tagName"),
	topic: text("topic"),
	notice: text("notice"),
	createdAt: numeric("createdAt").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
(subredditLang) => ({
  subredditIdLangIdx: uniqueIndex("subredditLang_subredditId_idx").on(subredditLang.subredditId, subredditLang.language),
})
)



// 定义 subredditTag 表
export const subredditTag = sqliteTable("subredditTag", {
  id: integer("id").primaryKey().notNull(),
	subredditNum: integer("subredditNum"),
	createdAt: numeric("createdAt").default(sql`(CURRENT_TIMESTAMP)`).notNull()
});

export const article = sqliteTable("article", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull().unique(),
  content: text("content").notNull(),
  description: text("description"),
  articleUrl: text("articleUrl").notNull().unique(),
  tags: text("tags"),
  language: text("language"),
  imageUrl: text("imageUrl"),
  createdAt: numeric("createdAt")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const resource = sqliteTable("resource", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  url: text("url"),
  tags: text("tags"),
  iconUrl: text("iconUrl"),
  description: text("description"),
  createdAt: numeric("createdAt")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const subredditTagLang = sqliteTable("subredditTagLang", {
	id: integer("id").primaryKey().notNull(),
	subredditTagId: integer("subredditTagId")
    .notNull()
    .references(() => subredditTag.id),
	language: text("language").notNull(),
	name: text("name").notNull(),
	createdAt: numeric("createdAt").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const concept = sqliteTable("concept", {
	id: integer("id").primaryKey().notNull(),
	language: text("language").notNull(),
	content: text("content").notNull(),
	createdAt: numeric("createdAt").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});