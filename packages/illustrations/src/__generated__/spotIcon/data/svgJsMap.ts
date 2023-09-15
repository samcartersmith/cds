/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { SpotIconName } from '../types/SpotIconName';

/**
 * DO NOT MODIFY
 * Generated from yarn nx run illustrations:sync
 */

const svgJsMap = {
  productCoinbaseCard: {
    light: () => require('../svgJs/light/productCoinbaseCard-0').content,
    dark: () => require('../svgJs/dark/productCoinbaseCard-0').content,
  },
  productCompliance: {
    light: () => require('../svgJs/light/productCompliance-0').content,
    dark: () => require('../svgJs/dark/productCompliance-0').content,
  },
  productEarn: {
    light: () => require('../svgJs/light/productEarn-0').content,
    dark: () => require('../svgJs/dark/productEarn-0').content,
  },
  productPro: {
    light: () => require('../svgJs/light/productPro-0').content,
    dark: () => require('../svgJs/dark/productPro-0').content,
  },
  productWallet: {
    light: () => require('../svgJs/light/productWallet-0').content,
    dark: () => require('../svgJs/dark/productWallet-0').content,
  },
} as Record<SpotIconName, { light: () => string; dark: () => string }>;

export default svgJsMap;
