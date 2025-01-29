export const pagesPath = {
  $404: {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/404' as const, hash: url?.hash }),
  },
  $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/' as const, hash: url?.hash }),
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  favicon_ico: '/favicon.ico',
  images: {
    tools: {
      effector_png: '/images/tools/effector.png',
      eslint_svg: '/images/tools/eslint.svg',
      fsd_png: '/images/tools/fsd.png',
      nextjs_svg: '/images/tools/nextjs.svg',
      prettier_svg: '/images/tools/prettier.svg',
      react_svg: '/images/tools/react.svg',
      tailwind_svg: '/images/tools/tailwind.svg',
      vitest_svg: '/images/tools/vitest.svg',
    },
  },
  robots_txt: '/robots.txt',
  sitemap_0_xml: '/sitemap-0.xml',
  sitemap_xml: '/sitemap.xml',
} as const;

export type StaticPath = typeof staticPath;
