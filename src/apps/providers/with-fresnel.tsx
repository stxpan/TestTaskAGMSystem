import { AppProps } from 'next/app';

import { MediaContextProvider } from '@/shared/lib/media';

// eslint-disable-next-line react/display-name
export const withFresnel = (Component: AppProps['Component']) => (props: AppProps) => {
  return (
    <MediaContextProvider>
      <Component {...props} />
    </MediaContextProvider>
  );
};
