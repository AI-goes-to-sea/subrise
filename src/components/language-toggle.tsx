"use client"

import { usePathname, useRouter } from "@/i18n/routing"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Globe } from "lucide-react"
import { startTransition } from "react"

export default function LanguageToggle() {

  const router = useRouter();
  const pathname = usePathname();
  const handleLanguageChange = (language: string) => {
    // console.log('pathname==>>', pathname);
    // router.push(`/${language}${pathname}`)
    startTransition(() => {
      router.replace(pathname, {locale: language});
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-whte text-black hover:bg-whte dark:text-white pl-5 pr-0">
          <Globe className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-zinc-100 dark:text-black">
        <DropdownMenuItem onClick={() => handleLanguageChange('zh')}>ZH</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('en')}>EN</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

