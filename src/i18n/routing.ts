import { defineRouting } from 'next-intl/routing';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import { DEFAULT_LOCALE, LOCALES } from '@/constants';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES,
  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
  // localePrefix: 'as-needed',
  // localeDetection: false
});

export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation(routing);