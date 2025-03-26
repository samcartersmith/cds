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
  productEarn: 3,
  productCompliance: 0,
  productPro: 1,
  productCoinbaseCard: 2,
  productWallet: 2,
  wallet: 2,
  walletLogo: 1,
  helpCenterProduct: 1,
  assetHubProduct: 1,
  assetManagementProduct: 2,
  rewardsProduct: 2,
  stakingProduct: 2,
  paySDKProduct: 2,
  nodeProduct: 1,
  internationalExchangeProduct: 0,
  institutionalProduct: 1,
  base: 2,
  coinbase: 1,
  derivativesProduct: 3,
  learningRewardsProduct: 2,
  borrowProduct: 2,
  custodyProduct: 1,
  rosettaProduct: 1,
  coinbaseOneProduct: 1,
  privateClientProduct: 0,
  walletAsAServiceProduct: 1,
  nftProduct: 1,
  cloudProduct: 1,
  dataMarketplace: 1,
  participateProduct: 1,
  primeProduct: 2,
  venturesProduct: 1,
  signInProduct: 1,
  advancedTradeProduct: 2,
  delegateProduct: 1,
  exchangeProduct: 1,
  commerceProduct: 1,
  idVerification: 1,
  email: 1,
  delegate: 1,
  warning: 1,
  send: 2,
  chat: 1,
  '2fa': 0,
  shield: 0,
  multiCoin: 1,
  fast: 1,
  noFees: 1,
  creditCard: 1,
  done: 0,
  error: 1,
  authenticator: 1,
  pieChart: 1,
  recurringPurchases: 1,
  bank: 2,
  outage: 1,
  coinbaseOneChart: 1,
  cb1Cash: 1,
  coinbaseOneEarn: 0,
  layeredNetworks: 0,
};

export default versionMap;
