/**
 * For some reason, on Figma, a slight movement of the illustration will
 * cause some of these svgs paths to change. As a result, lots of illustrations are classified
 * as modified even though they are visually identical.
 *
 * A solution to this problem is to manually specify what illustrations were modified
 * and make it such that the script will register these as modified and pull in the new illustration
 *
 * If an illustration is modified, add it to the list to catch it. Below is an example
 * export const modified: string[] = ['downloadCoinbaseWalletArrow-dark', 'downloadCoinbaseWalletArrow-light'];
 */
export const modified: string[] = [
  'advancedTradingNavigation-dark',
  'advancedTradingNavigation-light',
  'analyticsNavigation-dark',
  'analyticsNavigation-light',
  'assetHubNavigation-dark',
  'assetHubNavigation-light',
  'borrowNavigation-dark',
  'borrowNavigation-light',
  'cardNavigation-dark',
  'cardNavigation-light',
  'cloudNavigation-dark',
  'cloudNavigation-light',
  'commerceNavigation-dark',
  'commerceNavigation-light',
  'connectNavigation-dark',
  'connectNavigation-light',
  'custodyNavigation-dark',
  'custodyNavigation-light',
  'dataMarketplaceNavigation-dark',
  'dataMarketplaceNavigation-light',
  'directDepositNavigation-dark',
  'directDepositNavigation-light',
  'earnNavigation-dark',
  'earnNavigation-light',
  'exchangeNavigation-dark',
  'exchangeNavigation-light',
  'institutionalNavigation-dark',
  'institutionalNavigation-light',
  'nftNavigation-dark',
  'nftNavigation-light',
  'primeNavigation-dark',
  'primeNavigation-light',
  'privateClientNavigation-dark',
  'privateClientNavigation-light',
  'proNavigation-dark',
  'proNavigation-light',
  'queryTransactNavigation-dark',
  'queryTransactNavigation-light',
  'rewardsNavigation-dark',
  'rewardsNavigation-light',
  'rosettaNavigation-dark',
  'rosettaNavigation-light',
  'signInNavigation-dark',
  'signInNavigation-light',
  'taxCenterNavigation-dark',
  'taxCenterNavigation-light',
  'venturesNavigation-dark',
  'venturesNavigation-light',
  'walletLinkNavigation-dark',
  'walletLinkNavigation-light',
  'walletNavigation-dark',
  'walletNavigation-light',
  'linkCoinbaseWallet-dark',
];
