import { env } from '@/shared/config/env.mjs';

export const APP_TITLE = 'maehwa';

interface GetAlternateHrefLinksProps {
  asPath: string;
  locales?: string[];
}

export const getAlternateHrefLinks = (props: GetAlternateHrefLinksProps) => {
  const { asPath, locales = [] } = props;

  if (!env.NEXT_PUBLIC_APP_URL) {
    return [];
  }

  return locales
    .concat('x-default')
    .filter((locale: string) => locale !== 'cimode')
    .map((locale: string) => {
      const localePath = locale === 'x-default' ? '' : `/${locale}`;
      const href = `${env.NEXT_PUBLIC_APP_URL}${localePath}${asPath}`;

      return {
        hrefLang: locale,
        href,
      };
    });
};
