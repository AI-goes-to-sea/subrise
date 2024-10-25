import { usePathname } from "@/i18n/routing"
import { useLocale } from "next-intl"

export function useCurrentPath(href: string) {
  const locale = useLocale()
  const currentPath = usePathname()
  // console.log('currentPath->>>', currentPath);
  return currentPath.startsWith(`/${locale}${href}`)
  // return currentPath.startsWith(`/${href}`)
}
