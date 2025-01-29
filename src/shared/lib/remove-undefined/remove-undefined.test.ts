import { describe, expect, it } from 'vitest';

import { removeUndefined } from '.';

describe('WithoutUndefined', () => {
  it('should remove properties ', async () => {
    const object = {
      path: '/',
      query: {
        page: 2,
        search: undefined,
      },
    };

    const objectWithoutUndefined = removeUndefined(object);

    expect(objectWithoutUndefined).toStrictEqual({
      path: '/',
      query: {
        page: 2,
      },
    });
  });
});
