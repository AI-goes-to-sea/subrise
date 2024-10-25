import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> =>
  fetch(...args).then((res) => res.json());


export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export const isDevEnvironment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const formatNumber = (bytes: number) => {
  const sizes = ['', 'K', 'M', 'G', 'T']
  if (bytes === 0 || bytes < 1024) return bytes;
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}

export function generateSitemapXml(urls: SitemapUrl[]) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  urls.forEach(url => {
    xml += `<url>
              <loc>${url.loc}</loc>
              <lastmod>${url.lastmod}</lastmod>
              <changefreq>${url.changefreq}</changefreq>
              <priority>${url.priority}</priority>
            </url>`
  })
  xml += '</urlset>'
  return xml
}

export interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: number
}

export interface MetadataDetails {
  title: string;
  description: string;
}

export interface MetadataMap {
  [key: string]: (name: string, description?: string) => MetadataDetails
}

export function generateSitemapIndexXml(urls: string[]) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  urls.forEach(url => {
    xml += `<sitemap>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
            </sitemap>`
  })
  xml += '</sitemapindex>'
  return xml
}