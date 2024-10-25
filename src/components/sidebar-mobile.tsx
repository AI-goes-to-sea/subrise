"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarMobileNavItem } from "@/components/sidebar-mobile-nav-item"
import Logo from "./logo"
import { NavItems } from "@/constants"
import { useTranslations } from "next-intl"

export function SidebarMobile({ className }: { className?: string }) {
  const t = useTranslations("Routes")
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger
        className={cn("transition hover:opacity-30", className)}
      >
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        role="navigation"
        className="bg-white"
        iconClass="text-black w-6 h-6"
        // aria-label={t("Components.SidebarMobile.content_aria_label")}
      >
        <SheetHeader>
          <SheetTitle className="h-16 py-2 border-b border-zinc-200">
            <Logo />
          </SheetTitle>
          <SheetDescription asChild>
            <div className="space-y-8">
              <ul className="flex flex-col items-start space-y-2 pt-4">
                {
                  NavItems.map((item) => (
                    <SidebarMobileNavItem
                      key={`sib_nav_${item.link}`}
                      href={item.link}
                      icon={item.icon}
                      onClick={() => setSheetOpen(false)}
                    >
                      {t(item.title)}
                    </SidebarMobileNavItem>
                  ))
                }
              </ul>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
