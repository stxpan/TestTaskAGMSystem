import { isPageRequest, nextSafe } from '@next-safe/middleware';
import { chain, chainMatch } from '@next-safe/middleware/dist/compose';

import { withCSP, withLogging } from '@/shared/lib/next/middlewares';

export default chain(chainMatch(isPageRequest)(withLogging, withCSP, nextSafe({ disableCsp: true })));

export const config = {
  matcher: [
    {
      source: '/(.*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
