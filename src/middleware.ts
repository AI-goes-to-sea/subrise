import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, LOCALES } from './constants';
// export default createMiddleware(routing);

function getLocale (req: NextRequest) {
  const locale = req.nextUrl.pathname.split('/')[1];
  if (LOCALES.includes(locale)) {
    return locale;
  }
  return DEFAULT_LOCALE;
}
// export default createMiddleware(routing);
export default async function middleware(req: NextRequest) {

  const handleI18nRouting = createMiddleware(routing, {
    localeDetection: false
  });
  // 处理国际化路由
  return handleI18nRouting(req);
}

export const config = {
  // matcher: ['/', '/(zh|en)/:path*']
  matcher: [
    '/',
    '/(en|zh)/:path*',
    '/((?!api|_next|.*\\..*).*)',
    //  '/([\\w-]+)?/users/(.+)'
  ]
};
