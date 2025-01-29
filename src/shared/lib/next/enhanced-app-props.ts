import { AppProps } from 'next/app';

import { EffectorState } from '../effector';
import { EnhancedNextPage } from './enhanced-next-page';

/**
 * Props that are provided to the render function of the application (in _app)
 * Those props can be consolidated by either getInitialProps, getServerProps or getStaticProps, depending on the page and its configuration
 */
export type EnhancedAppProps = AppProps &
  EffectorState & {
    Component: EnhancedNextPage;
    err?: Error;
  };
