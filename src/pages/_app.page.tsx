import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@/shared/styles/tailwind.css';
import '@/shared/styles/globals.css';
import '@/shared/styles/nprogress.css';

import * as React from 'react';

import { withProviders } from '@/apps/providers';

import { NextProgress } from '@/shared/components/nprogress';
import { BreakpointIndicator } from '@/shared/components/tools/breakpoint-indicator';
import { Toaster } from '@/shared/components/ui/sonner';
import { EnhancedAppProps } from '@/shared/lib/next/enhanced-app-props';
import { PageSeo } from '@/shared/lib/seo';

function App(props: EnhancedAppProps) {
  const { Component, pageProps, err } = props;

  const Layout = Component.Layout ?? React.Fragment;

  return (
    <>
      <PageSeo />

      <NextProgress />

      <Layout>
        <Component {...pageProps} err={err} />
      </Layout>

      <Toaster />
      <BreakpointIndicator />
    </>
  );
}

export default withProviders(App);
