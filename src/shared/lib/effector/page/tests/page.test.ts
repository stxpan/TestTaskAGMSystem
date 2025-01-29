import { allSettled, fork } from 'effector';
import { beforeEach, describe, expect, it } from 'vitest';

import { declarePage } from '../page';

describe('declarePage', () => {
  let indexFirstPage: ReturnType<typeof declarePage>;
  let indexSecondPage: ReturnType<typeof declarePage>;
  let contractPage: ReturnType<typeof declarePage<{ search: string }>>;

  beforeEach(() => {
    indexFirstPage = declarePage({
      pageType: 'first',
    });

    indexSecondPage = declarePage({
      pageType: 'second',
    });

    contractPage = declarePage({
      pageType: 'contract',
      contextContract: {
        isData: (ctx): ctx is { search: string } => 'search' in (ctx as { search: string }),
      },
    });
  });

  it('should activate page if open is called', async () => {
    const scope = fork();

    await allSettled(indexFirstPage.open, { scope, params: {} });

    expect(scope.getState(indexFirstPage.$active)).toBe(true);
  });

  it('should have 1 opened page at a time', async () => {
    const scope = fork();

    await allSettled(indexFirstPage.open, { scope, params: {} });

    expect(scope.getState(indexFirstPage.$active)).toBe(true);
    expect(scope.getState(indexSecondPage.$active)).toBe(false);

    await allSettled(indexSecondPage.open, { scope, params: {} });

    expect(scope.getState(indexFirstPage.$active)).toBe(false);
    expect(scope.getState(indexSecondPage.$active)).toBe(true);
  });

  it('should not open page if contract is invalid', async () => {
    const scope = fork();

    // @ts-expect-error validate contract
    await allSettled(contractPage.open, { scope, params: {} });

    expect(scope.getState(contractPage.$active)).toBe(false);

    await allSettled(contractPage.open, { scope, params: { search: 'query' } });

    expect(scope.getState(contractPage.$active)).toBe(true);
  });
});
