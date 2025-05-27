import App, { AppContext, AppProps } from 'next/app';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { MediaQueryProvider } from '@cbhq/cds-web/system/MediaQueryProvider';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { defaultTheme } from '@cbhq/cds-web/themes/defaultTheme';

// https://nextjs.org/docs/advanced-features/custom-app
export async function getInitialProps(context: AppContext) {
  const appProps = await App.getInitialProps(context);
  return appProps;
}

export default function DynamicApp({ Component, pageProps }: AppProps) {
  return (
    <MediaQueryProvider>
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <PortalProvider>
          <Component {...pageProps} />;
        </PortalProvider>
      </ThemeProvider>
    </MediaQueryProvider>
  );
}

DynamicApp.getInitialProps = getInitialProps;
