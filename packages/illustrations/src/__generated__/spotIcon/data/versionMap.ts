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
  productEarn: 4,
  productCompliance: 2,
  productPro: 2,
  productCoinbaseCard: 3,
  productWallet: 3,
  wallet: 2,
  walletLogo: 2,
  helpCenterProduct: 3,
  assetHubProduct: 2,
  assetManagementProduct: 3,
  rewardsProduct: 3,
  stakingProduct: 3,
  paySDKProduct: 2,
  nodeProduct: 2,
  internationalExchangeProduct: 1,
  institutionalProduct: 2,
  base: 3,
  coinbase: 1,
  derivativesProduct: 5,
  learningRewardsProduct: 3,
  borrowProduct: 3,
  custodyProduct: 2,
  rosettaProduct: 3,
  coinbaseOneProduct: 1,
  privateClientProduct: 1,
  walletAsAServiceProduct: 3,
  nftProduct: 2,
  cloudProduct: 2,
  dataMarketplace: 3,
  participateProduct: 2,
  primeProduct: 3,
  venturesProduct: 2,
  signInProduct: 2,
  advancedTradeProduct: 3,
  delegateProduct: 2,
  exchangeProduct: 3,
  commerceProduct: 3,
  idVerification: 3,
  email: 1,
  delegate: 1,
  warning: 1,
  send: 3,
  chat: 1,
  '2fa': 1,
  shield: 1,
  multiCoin: 1,
  fast: 2,
  noFees: 1,
  creditCard: 1,
  done: 2,
  error: 2,
  authenticator: 1,
  pieChart: 3,
  recurringPurchases: 3,
  bank: 3,
  outage: 2,
  coinbaseOneChart: 2,
  cb1Cash: 2,
  coinbaseOneEarn: 1,
  layeredNetworks: 1,
};

export default versionMap;
