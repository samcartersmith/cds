type Tab = {
  id?: string;
  label: string;
  description?: string;
  tabs?: Tab[];
};

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const primaryTabs: Tab[] = [
  {
    id: 'explore',
    label: 'Explore',
    tabs: [
      { id: 'crypto', label: 'Crypto', description: 'View crypto prices and charts' },
      { id: 'ens-profiles', label: 'ENS Profiles', description: 'Build your web3 presence today' },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    tabs: [
      {
        label: 'Tips and Tutorials',
      },
      {
        label: 'Update the system',
      },
      {
        label: 'Market updates',
      },
    ],
  },
  {
    id: 'individuals',
    label: 'Individuals',
    tabs: [
      { label: 'Buy and sell', description: 'Buy, sell and use crypto' },
      { label: 'Wallets', description: 'The best self-hosted crypto wallet' },
      { label: 'Coinbase One', description: 'For frequent crypto traders' },
      { label: 'Earn', description: 'Spend crypto, earn crypto rewards' },
      { label: 'Card', description: 'Spend crypto, earn crypto rewards' },
      { label: 'NFT', description: 'Create, collect and crypto' },
      { label: 'Borrow', description: 'Borrow cash using Bitcoin as collateral' },
    ],
  },
  { id: 'businesses', label: 'Businesses' },
  { id: 'developers', label: 'Developers' },
  { id: 'company', label: 'Company' },
];

/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const secondaryTabs = [
  { id: 'product', label: 'Product' },
  { id: 'company', label: 'Company' },
  { id: 'policy', label: 'Policy' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'international', label: 'International' },
];
