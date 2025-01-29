import { ChainableMiddleware } from '@next-safe/middleware';

import { generateCSP } from '@/shared/config/csp';

export const withCSP: ChainableMiddleware = (request, event, ctx) => {
  // const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const csp = generateCSP();

  const res = ctx.res.get();

  // ctx.res.get().headers.set('x-nonce', nonce);
  res.headers.set('Content-Security-Policy', csp);
};
