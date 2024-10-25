"use client";

import React, { useState } from 'react';
import { usePathname, Link } from '@/i18n/routing';
import { cn } from '../lib/utils';
import { ThemeToggle } from './ThemeToggle';
import Logo from './logo';
import { SidebarMobile } from './sidebar-mobile';
import { NavItems } from '@/constants';
import { useTranslations } from 'next-intl';
import LanguageToggle from './language-toggle';

function NavLink({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon?: React.ElementType }) {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link 
      href={href} 
      className={cn(`
        px-3 py-2 text-md text-black
        hover:text-orange-500 dark:text-white
        dark:hover:text-orange-500
        transition-colors duration-200 flex items-center 
      `, isActive ? 'text-orange-500 font-bold dark:text-orange-500' : '')}
    >
      {/* <Icon className="mr-2" size={18} /> */}
      {children}
    </Link>
  )
}

export default function Navigation() {

  // const [visible, setVisible] = useState(false);
  const t = useTranslations('Routes');

  return (
    <nav className="py-4 sticky shrink-0 backdrop-blur-lg dark:bg-black px-5">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center text-2xl font-bold text-black italic">
          <SidebarMobile className="mr-2 lg:hidden dark:text-white text-black" />
          <Logo />
        </Link>
        <div className="space-x-1 items-center hidden md:flex">
          {/* <NavLink href="/concepts">概念科普</NavLink> */}
          {
            NavItems.map((item) => <NavLink href={item.link} key={`nav_${item.link}`}>{t(item.title)}</NavLink>)
          }
          {/* <NavLink href="/concepts">概念科普</NavLink>
          <NavLink href="/subreddits">探索Subreddit</NavLink>
          <NavLink href="/tips">干货总结</NavLink> */}
          {/* <NavLink href="/tools">工具与资源</NavLink> */}
        </div>

        <div className="flex items-center">
          <ThemeToggle /> 
          <LanguageToggle />
        </div>
      </div>

      
    </nav>
  )
}