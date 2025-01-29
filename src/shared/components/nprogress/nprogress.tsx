import React from 'react';
import { Router } from 'next/router';
import NProgress from 'nprogress';

export interface NextProgressProps {
  /** Number of miliseconds to wait before showing loading bar */
  showAfterMs?: number;
  /** nprogress [configuration object](https://github.com/rstacruz/nprogress#configuration) */
  options?: NProgress.NProgressOptions;
}

export const NextProgress = (props: NextProgressProps) => {
  const { showAfterMs = 0, options = {} } = props;

  const timer = React.useRef<number>();

  const routeChangeStart = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => NProgress.start(), showAfterMs);
  };

  const routeChangeEnd = () => {
    window.clearTimeout(timer.current);
    NProgress.done();
  };

  React.useEffect(() => {
    if (options) {
      NProgress.configure({
        showSpinner: false,
        ...options,
      });
    }

    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);

    return () => {
      clearTimeout(timer.current);
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return null;
};
