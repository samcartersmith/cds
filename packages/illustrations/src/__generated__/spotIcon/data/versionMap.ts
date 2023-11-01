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
  productEarn: 2,
  productCompliance: 0,
  productPro: 1,
  productCoinbaseCard: 2,
  productWallet: 1,
  wallet: 0,
  helpCenterProduct: 1,
  assetHubProduct: 0,
  assetManagementProduct: 1,
  rewardsProduct: 1,
  stakingProduct: 1,
  paySDKProduct: 0,
  nodeProduct: 1,
  internationalExchangeProduct: 0,
  institutionalProduct: 1,
  base: 0,
  coinbase: 0,
  derivativesProduct: 1,
  learningRewardsProduct: 1,
  borrowProduct: 1,
  custodyProduct: 1,
  rosettaProduct: 1,
  coinbaseOneProduct: 0,
  privateClientProduct: 0,
  walletAsAServiceProduct: 1,
  nftProduct: 1,
  cloudProduct: 1,
  dataMarketplace: 1,
  participateProduct: 1,
  primeProduct: 1,
  venturesProduct: 1,
  signInProduct: 1,
  advancedTradeProduct: 1,
  delegateProduct: 1,
  exchangeProduct: 1,
  commerceProduct: 1,
};

export default versionMap;
