import App, { AppContext, AppProps } from 'next/app';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { DevicePreferencesProvider } from '@cbhq/cds-web/system';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';

// https://nextjs.org/docs/advanced-features/custom-app
export async function getInitialProps(context: AppContext) {
  const appProps = await App.getInitialProps(context);

  return appProps;
}

export default function DynamicApp({ Component, pageProps }: AppProps) {
  return (
    <DevicePreferencesProvider>
      <ThemeProvider scale="xLarge" spectrum="dark">
        <PortalProvider>
          <Component {...pageProps} />;
        </PortalProvider>
      </ThemeProvider>
    </DevicePreferencesProvider>
  );
}

DynamicApp.getInitialProps = getInitialProps;
