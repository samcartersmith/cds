/**
 * For some reason, on Figma, a slight movement of the illustration will
 * cause some of these svgs paths to change. As a result, lots of illustrations are classified
 * as modified even though they are visually identical.
 *
 * A solution to this problem is to manually specify what illustrations were modified
 * and make it such that the script will register these as modified and pull in the new illustration
 *
 * If an illustration is modified, add it to the list to catch it. Below is an example
 */
export const modified: string[] = [
  'cryptoApps-dark',
  'cryptoApps-light',
  'cryptoAppsWallet-dark',
  'cryptoAppsWallet-light',
  'walletLoading-dark',
  'walletLoading-light',
  'coinbaseOneAuthenticator-dark',
  'coinbaseOneAuthenticator-light',
  'coinbaseOneChat-dark',
  'coinbaseOneChat-light',
  'coinbaseOneEarnCoins-dark',
  'coinbaseOneEarnCoins-light',
  'coinbaseOneRefreshed-dark',
  'coinbaseOneRefreshed-light',
  'coinbaseOneShield-dark',
  'coinbaseOneShield-light',
  'coinbaseOneTrusted-dark',
  'coinbaseOneTrusted-light',
  'walletReconnect-dark',
  'walletReconnect-light',
  'transferEth-dark',
  'transferEth-light',
  'walletReconnectSuccess-dark',
  'walletReconnectSuccess-light',
];
