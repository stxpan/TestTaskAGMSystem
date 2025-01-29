import { ChainableMiddleware } from '@next-safe/middleware';

import { logger } from '@/shared/lib/logger';

export const withLogging: ChainableMiddleware = (request, event, ctx) => {
  logger.debug(`[request]: ${request.method} • ${request.nextUrl.pathname}`);
};
