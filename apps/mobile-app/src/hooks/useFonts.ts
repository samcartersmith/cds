import { useFonts as useFontsOriginal } from 'expo-font';

/* eslint-disable global-require */
const fonts = {
  CoinbaseIcons: require('@cbhq/cds-icons/fonts/native/CoinbaseIcons.ttf') as string,
  'CoinbaseDisplay-Medium': require('@cbhq/cds-fonts/native/CoinbaseDisplay-Medium.otf') as string,
  'CoinbaseDisplay-Regular':
    require('@cbhq/cds-fonts/native/CoinbaseDisplay-Regular.otf') as string,
  'CoinbaseMono-Medium': require('@cbhq/cds-fonts/native/CoinbaseMono-Medium.otf') as string,
  'CoinbaseMono-Regular': require('@cbhq/cds-fonts/native/CoinbaseMono-Regular.otf') as string,
  'CoinbaseSans-Medium': require('@cbhq/cds-fonts/native/CoinbaseSans-Medium.otf') as string,
  'CoinbaseSans-Regular': require('@cbhq/cds-fonts/native/CoinbaseSans-Regular.otf') as string,
  'CoinbaseText-Medium': require('@cbhq/cds-fonts/native/CoinbaseText-Medium.otf') as string,
  'CoinbaseText-Regular': require('@cbhq/cds-fonts/native/CoinbaseText-Regular.otf') as string,
};

export function useFonts() {
  return useFontsOriginal(fonts);
}
