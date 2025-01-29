import { ContentSecurityPolicy } from '../lib/next/csp/content-security-policy';

interface GenerateContentSecurityPolicyOptions {
  nonce?: string;
}

export const generateCSP = (options: GenerateContentSecurityPolicyOptions = {}) => {
  const { nonce } = options;

  return new ContentSecurityPolicy()
    .add('default-src', `'self'`)
    .add('frame-ancestors', `'none'`)
    .add('base-uri', `'none'`)
    .add('form-action', `'self'`)
    .add('font-src', `'self'`)
    .add('manifest-src', `'self'`)
    .add('media-src', `'self'`)
    .add('object-src', `'none'`)
    .add('child-src', `'none'`)
    .add('script-src', `'self'`)
    .add('script-src', `'nonce-${nonce}'`, { condition: Boolean(nonce) })
    .add('script-src', `'unsafe-inline'`)
    .add('script-src', `'unsafe-eval'`, { devOnly: true })
    .add('connect-src', `'self'`)
    .add('connect-src', `stoic-quotes.com`)
    .add('img-src', `'self'`)
    .add('img-src', 'blob:')
    .add('img-src', 'data:')
    .add('style-src', `'self'`)
    .add('style-src', `'unsafe-inline'`)
    .add('style-src', `'nonce-${nonce}'`, { condition: Boolean(nonce) })
    .add('block-all-mixed-content')
    .add('upgrade-insecure-requests')
    .build();
};
