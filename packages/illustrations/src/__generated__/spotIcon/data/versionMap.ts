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
  productEarn: 1,
  productCompliance: 0,
  productPro: 0,
  productCoinbaseCard: 1,
  productWallet: 0,
  wallet: 0,
  helpCenterProduct: 0,
  assetHubProduct: 0,
  assetManagementProduct: 0,
  rewardsProduct: 0,
  stakingProduct: 0,
  paySDKProduct: 0,
  nodeProduct: 0,
  internationalExchangeProduct: 0,
  institutionalProduct: 0,
  base: 0,
  coinbase: 0,
  derivativesProduct: 0,
  learningRewardsProduct: 0,
  borrowProduct: 0,
  custodyProduct: 0,
  rosettaProduct: 0,
  coinbaseOneProduct: 0,
  privateClientProduct: 0,
  walletAsAServiceProduct: 0,
  nftProduct: 0,
  cloudProduct: 0,
  dataMarketplace: 0,
  participateProduct: 0,
  primeProduct: 0,
  venturesProduct: 0,
  signInProduct: 0,
  advancedTradeProduct: 0,
  delegateProduct: 0,
  exchangeProduct: 0,
  commerceProduct: 0,
};

export default versionMap;
