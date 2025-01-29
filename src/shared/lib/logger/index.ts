import { createLogger } from '@neodx/log';

import { env } from '@/shared/config/env.mjs';

import { APP_TITLE } from '../seo/meta';

export const logger = createLogger({
  name: APP_TITLE,
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
});
