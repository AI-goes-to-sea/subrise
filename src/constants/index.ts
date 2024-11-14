import { Album, List, Zap } from 'lucide-react';
// import {useTranslations} from 'next-intl';

export const LOCALES = ['en', 'zh'];
export const DEFAULT_LOCALE = 'en';

export type SelectOptionType = {
  label: string;
  value: string;
};

export const rankOptions: SelectOptionType[] = [
  { label: 'all', value: '0'},
  { label: 'rank_1', value: '1' },
  { label: 'rank_2', value: '2' },
  { label: 'rank_3', value: '3' },
  { label: 'rank_4', value: '4' },
];

export const subscriberOptions: SelectOptionType[] = [
  { label: 'all', value: '0' },
  { label: 'subscrib_1', value: '1' },
  { label: 'subscrib_2', value: '2' },
  { label: 'subscrib_3', value: '3' },
  { label: 'subscrib_4', value: '4' },
];

export const tagOptions = ['全部', '娱乐', '游戏', '问答', '新闻', '科技', '艺术'];

export interface ArticleItems {
  id: string;
  title: string;
  description: string;
  tags: string;
  content: string;
  createdAt: string;
  imageUrl: string;
  articleUrl: string;
  // updatedAt?: string;
}

export interface ResourceItems {
  id: string;
  name: string;
  description: string;
  tags: string;
  url: string;
  createdAt: string;
  iconUrl: string;
  // updatedAt?: string;
}

export const LogoTitle = 'Subrise';

export const NavItems = [
  {
    title: 'concepts',
    link: '/concept',
    icon: Album
  },
  {
    title: 'subreddits',
    link: '/reddit-list',
    icon: Zap
  },
  {
    title: 'featured',
    link: '/subrise-featured',
    icon: List
  },
  {
    title: 'tips',
    link: '/blog',
    icon: List
  }
]

export const SITEMAP_INDEX_PAGE_SIZE = 2000;

export const defaultImgUrl = 'https://styles.redditmedia.com/t5_2to41/styles/communityIcon_gznj8kdgrjra1.png?width=64&height=64&frame=1&auto=webp&crop=64:64,smart&s=bde2b559624eb616fc73c533a2d3658d927e892c';
