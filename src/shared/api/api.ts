import { nanoid } from 'nanoid';
import wretch from 'wretch';
import FormDataAddon from 'wretch/addons/formData';
import QueryStringAddon from 'wretch/addons/queryString';

import { isBrowser } from '../lib/is-browser';
import { logger } from '../lib/logger';
import { catchNetworkException, NetworkExceptionError } from './exceptions';

const wretchClient = wretch()
  .addon(QueryStringAddon)
  .addon(FormDataAddon)
  .catcherFallback((error) => {
    logger.error(error);

    throw catchNetworkException(error);
  })
  .resolve((_) =>
    _.fetchError((error) => {
      logger.error(error);

      throw catchNetworkException(error);
    }),
  );

export interface HTTPClientOptions {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: any;
  headers?: Record<string, string>;
  data?: BodyType<unknown>;
  responseType?: string;
}

export const httpClient = async <Data>(options: HTTPClientOptions) => {
  const { url, method, params, data, headers = {} } = options;

  const requestId = nanoid();

  const httpMethod = method.toLowerCase() as Lowercase<typeof method>;

  /**
   * Hide sensitive data in browser console
   */
  if (isBrowser()) {
    logger.debug(`Network request: ${requestId} • ${method} • ${url} • %s`, JSON.stringify(options, null, 2));
  } else {
    logger.info(`Network request: ${requestId} • ${method} • ${url} • %s`, JSON.stringify(options, null, 2));
  }

  const timeStart = performance.now();
  try {
    const response = await wretchClient
      .url(url, true)
      .headers(headers)
      .query(params)
      .body(JSON.stringify(data))
      [httpMethod]()
      .json<Data>();

    return response;
  } catch (error) {
    throw error;
  } finally {
    const timeEnd = performance.now();

    logger.info(`Network request: ${requestId} took ${timeEnd - timeStart} milliseconds.`);
  }
};

export type ErrorType<Error> = NetworkExceptionError<Error>;

export type BodyType<BodyData> = BodyData;
