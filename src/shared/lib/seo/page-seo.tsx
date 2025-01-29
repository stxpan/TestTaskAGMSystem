import { useRouter } from 'next/router';
import { NextSeo, NextSeoProps } from 'next-seo';

import { env } from '@/shared/config/env.mjs';

import { APP_TITLE } from './meta';

interface PageSeoProps extends NextSeoProps {
  image?: string;
}

export const PageSeo = (props: PageSeoProps) => {
  const { title = APP_TITLE, description, image, ...other } = props;

  const { asPath } = useRouter();

  const canonicalLink = `${env.NEXT_PUBLIC_APP_URL}${asPath}`;

  const imageURL = image?.startsWith('https://') ? image : `${env.NEXT_PUBLIC_APP_URL}${image}`;

  return (
    <NextSeo
      robotsProps={{
        maxSnippet: -1,
        maxVideoPreview: -1,
        maxImagePreview: 'large',
      }}
      additionalMetaTags={[
        {
          name: 'apple-mobile-web-app-title',
          content: 'Maehwa',
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-48x48.png',
          sizes: '48x48',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
          sizes: '48x48',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ]}
      canonical={canonicalLink}
      title={title}
      defaultTitle={APP_TITLE}
      description={description}
      titleTemplate={`${APP_TITLE} - %s`}
      twitter={{
        site: APP_TITLE,
        cardType: image ? 'summary_large_image' : 'summary',
      }}
      openGraph={{
        siteName: APP_TITLE,
        locale: 'en',
        type: 'website',
        title,
        description,
        images: image
          ? [
              {
                url: imageURL,
                width: 800,
                height: 600,
                alt: 'Preview image',
              },
            ]
          : undefined,
      }}
      {...other}
    />
  );
};
