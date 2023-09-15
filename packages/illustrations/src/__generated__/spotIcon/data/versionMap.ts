/**
 * DO NOT MODIFY
 * Generated from yarn nx run illustrations:sync
 */

import type { SpotIconName } from '../types/SpotIconName';

/**
 * Currently used on web for interpolating the URL to CDN hosted asset using the name and version number.
 *
 * For example, given the following SpotIcon versionMap, '{ someIllustration: 2 }', and
 * JSX such as '<SpotIcon name="someIllustration />' will result in an image with the following URL:
 *
 * 'https://static-assets.coinbase.com/design-system/illustrations/spotIcon/light/someIllustration-2.svg
 *
 * In addition, this file is used to populate SpotIcon stories in percy, so the sort order based on createdAt is important.
 */
const versionMap: Record<SpotIconName, number> = {
  productEarn: 0,
  productCompliance: 0,
  productPro: 0,
  productCoinbaseCard: 0,
  productWallet: 0,
};

export default versionMap;
