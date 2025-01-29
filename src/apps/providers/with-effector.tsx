import { AppProps } from 'next/app';
import { EffectorNext } from '@effector/next';

import { EFFECTOR_STATE_KEY, EffectorState } from '@/shared/lib/effector';
import { AttachRouter } from '@/shared/lib/effector/router';

type AppWithEffectorState = AppProps & EffectorState;

// eslint-disable-next-line react/display-name
export const withEffector = (Component: AppWithEffectorState['Component']) => (props: AppWithEffectorState) => {
  const { pageProps } = props;

  const values = pageProps[EFFECTOR_STATE_KEY];

  return (
    <EffectorNext values={values}>
      <AttachRouter />
      <Component {...props} />
    </EffectorNext>
  );
};
