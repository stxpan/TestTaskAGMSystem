import { JsonObject } from 'type-fest';
import { WretchError } from 'wretch';

export interface NetworkExceptionError<T = JsonObject> {
  headers: JsonObject;
  url: string;
  status: number;
  statusText: string;
  data: T | null;
}

export const catchNetworkException = (wretchError: WretchError): NetworkExceptionError => {
  const networkError = {
    headers: Object.fromEntries(wretchError.response.headers),
    url: wretchError.url,
    status: wretchError.status,
    statusText: wretchError.response.statusText,
    data: wretchError.json ?? null,
  };

  return networkError;
};
