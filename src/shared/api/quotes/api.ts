import { createEffect } from 'effector';

import { httpClient } from '../api';
import { NetworkExceptionError } from '../exceptions';
import { Quote } from './types';

export const API_ENDPOINT = 'https://stoic-quotes.com';

export const findRandomQuoteFx = createEffect<void, Quote, NetworkExceptionError>(async () => {
  const quote = await httpClient<Quote>({
    url: API_ENDPOINT + '/api/quote',
    method: 'GET',
  });

  return quote;
});
