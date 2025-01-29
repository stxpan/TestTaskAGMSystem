import { ParsedUrlQueryInput } from 'querystring';
import type { Url } from 'next/dist/shared/lib/router/router';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { NextRouter } from 'next/router';
import { attach, createEvent, createStore, sample } from 'effector';
import { previous, reset, spread } from 'patronum';

export const setup = createEvent<{
  router: NextRouter | null;
  searchParams: ReadonlyURLSearchParams | null;
  pathname: string | null;
  asPath: string | null;
}>();
const setRouter = createEvent<NextRouter | null>();
const setSearchParams = createEvent<ReadonlyURLSearchParams | null>();
const setPathname = createEvent<string | null>();
const setAsPath = createEvent<string | null>();

export const $router = createStore<NextRouter | null>(null);
export const $searchParams = createStore<ReadonlyURLSearchParams | null>(null);
export const $pathname = createStore<string | null>(null);
export const $asPath = createStore<string | null>(null);
export const $previousPath = previous($asPath);

export const sanitize = createEvent();

reset({ clock: sanitize, target: [$router, $searchParams, $pathname] });

sample({
  clock: setRouter,
  target: $router,
});

sample({
  clock: setSearchParams,
  target: $searchParams,
});

sample({
  clock: setPathname,
  target: $pathname,
});

sample({
  clock: setAsPath,
  target: $asPath,
});

sample({
  clock: setup,
  target: spread({
    targets: {
      router: setRouter,
      searchParams: setSearchParams,
      pathname: setPathname,
      asPath: setAsPath,
    },
  }),
});

export const navigateToFx = attach({
  source: { router: $router },
  effect: (
    { router },
    {
      url,
      options,
    }: {
      url: Url;
      options?: {
        shallow?: boolean;
        locale?: string | false;
        scroll?: boolean;
        unstable_skipClientCache?: boolean;
      };
    },
  ) => {
    if (!router) return;

    return router.push(url, undefined, options);
  },
});

/**
 * Remove previus queries and adds new ones
 */
export const setQueryFx = attach({
  source: { router: $router },
  effect: ({ router }, query: ParsedUrlQueryInput | null) => {
    if (!router) return;

    return router.push({ query: { ...query } });
  },
});

/**
 * Copies previus queries and adds new ones
 */
export const pushQueryFx = attach({
  source: { router: $router },
  effect: ({ router }, query: ParsedUrlQueryInput | null) => {
    if (!router) return;

    return router.push({ query: { ...router.query, ...query } });
  },
});
