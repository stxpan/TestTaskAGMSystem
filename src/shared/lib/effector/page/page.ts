import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next';
import { createEvent, createStore, sample, Unit } from 'effector';

import { removeUndefined } from '../../remove-undefined';

export const pageStarted = createEvent<{
  pageType: string;
  pageCtx: unknown;
}>();

const $currentPage = createStore<string | null>(null).on(pageStarted, (_, { pageType }) => pageType);

export interface PageContext<Q = {}, P = {}> {
  query: Q;
  params: P;
  url?: string;
}

export const getPageContext = <Q extends ParsedUrlQuery, P>(context: GetServerSidePropsContext): PageContext<Q, P> => {
  return removeUndefined<PageContext<Q, P>>({
    query: (context.query ?? {}) as Q,
    params: (context.params ?? {}) as P,
    url: context.resolvedUrl,
  });
};

export function declarePage<Ctx = PageContext<any, any>>(config: {
  pageType: string;
  contextContract?: {
    isData: (data: unknown) => data is Ctx;
  };
}) {
  const open = createEvent<Ctx>();

  const $ctx = createStore<Ctx | null>(null, {
    /**
     * Custom human-readable sid for easier debugging
     *
     * Completely optional practice, can be changed to factories field at
     * effector's babel/swc plugin configuration like this:
     * ```json
     *  factories: ["#root/shared/app"]
     * ```
     *
     * See the docs on SIDs: https://effector.dev/docs/api/effector/babel-plugin#sid
     */
    sid: `pageCtx:${config.pageType}`,
  });

  sample({
    clock: open,
    filter: (rawCtx) => {
      if (config.contextContract) {
        return config.contextContract.isData(rawCtx);
      }

      /**
       * Skip as-is, if no contract is provided
       */

      return true;
    },
    target: [
      $ctx,
      pageStarted.prepend((ctx: Ctx) => ({
        pageCtx: ctx,
        pageType: config.pageType,
      })),
    ],
  });

  const $active = $currentPage.map((page) => page === config.pageType);
  const activated = sample({
    clock: $active,
    filter: Boolean,
  });
  const deactivated = sample({
    clock: $active,
    filter: (active) => !active,
  });

  const opened = createEvent<Ctx>();
  const closed = createEvent<Ctx>();

  sample({
    clock: activated,
    source: $ctx,
    /**
     * Type assertion is totally fine here, as we know that $ctx will be of Ctx type at this moment,
     * because it is the way this logic is written and also here we have a contract check for that
     *
     * We can't (yet?) express it in the TypeScript type system though, hence the `as Ctx` cast
     *
     * In real-world apps it is better to write some tests for such cases, rather than
     * writing more complicated code to satisfy the type inference system
     */
    fn: (ctx) => ctx as Ctx,
    target: opened,
  });

  sample({
    clock: deactivated,
    source: $ctx,
    fn: (ctx) => ctx as Ctx,
    target: closed,
  });

  sample({
    clock: closed,
    fn: () => null,
    target: $ctx,
  });

  return {
    open,
    opened,
    closed,
    $active,
  };
}

export const onlyPage = <T>(unit: Unit<T>, pageType: string) => {
  return sample({
    clock: unit,
    source: $currentPage,
    filter: (page) => page === pageType,
  });
};
