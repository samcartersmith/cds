import { useFonts as useFontsOriginal } from 'expo-font';

/* eslint-disable global-require */
const fonts = {
  CoinbaseIcons: require('../../assets/fonts/CoinbaseIcons.ttf') as string,
  'CoinbaseDisplay-Medium': require('../../assets/fonts/CoinbaseDisplay-Medium.otf') as string,
  'CoinbaseDisplay-Regular': require('../../assets/fonts/CoinbaseDisplay-Regular.otf') as string,
  'CoinbaseMono-Medium': require('../../assets/fonts/CoinbaseMono-Medium.otf') as string,
  'CoinbaseMono-Regular': require('../../assets/fonts/CoinbaseMono-Regular.otf') as string,
  'CoinbaseSans-Medium': require('../../assets/fonts/CoinbaseSans-Medium.otf') as string,
  'CoinbaseSans-Regular': require('../../assets/fonts/CoinbaseSans-Regular.otf') as string,
  'CoinbaseText-Medium': require('../../assets/fonts/CoinbaseText-Medium.otf') as string,
  'CoinbaseText-Regular': require('../../assets/fonts/CoinbaseText-Regular.otf') as string,
};

export function useFonts() {
  return useFontsOriginal(fonts);
}
