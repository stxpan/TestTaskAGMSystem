import { AppProps } from 'next/app';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

// eslint-disable-next-line react/display-name
export const withBalancer = (Component: AppProps['Component']) => (props: AppProps) => {
  return (
    <BalancerProvider>
      <Component {...props} />
    </BalancerProvider>
  );
};
