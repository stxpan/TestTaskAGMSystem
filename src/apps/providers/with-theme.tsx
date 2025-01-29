import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

// eslint-disable-next-line react/display-name
export const withTheme = (Component: AppProps['Component']) => (props: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <div className="h-full">
        <Component {...props} />
      </div>
    </ThemeProvider>
  );
};
