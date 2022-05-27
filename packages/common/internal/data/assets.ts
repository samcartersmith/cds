export const assets = {
  btc: {
    symbol: 'BTC',
    name: 'Bitcoin',
    color: '#F7931A',
    imageUrl:
      'https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png',
  },
  eth: {
    symbol: 'ETH',
    name: 'Ethereum',
    color: '#627EEA',
    imageUrl:
      'https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png',
  },
  ltc: {
    symbol: 'LTC',
    name: 'Litecon',
    color: '#A6A9AA',
    imageUrl:
      'https://dynamic-assets.coinbase.com/f018870b721574ef7f269b9fd91b36042dc05ebed4ae9dcdc340a1bae5b359e8760a8c224bc99466db704d10a3e23cf1f4cd1ff6f647340c4c9c899a9e6595cd/asset_icons/984a4fe2ba5b2c325c06e4c2f3ba3f1c1fef1f157edb3b8ebbfe234340a157a5.png',
  },
  dai: {
    symbol: 'DAI',
    name: 'Dai',
    color: '#FFC926',
    imageUrl:
      'https://dynamic-assets.coinbase.com/90184cca292578d533bb00d9ee98529b889c15126bb120582309286b9129df9886781b30c85c21ee9cae9f2db6dc11e88633c7361fdd1ba5046ea444e101ae15/asset_icons/ebc24b163bf1f58a9732a9a1d2faa5b2141b041d754ddc2260c5e76edfed261e.png',
  },
  sushi: {
    symbol: 'SUSHI',
    name: 'Sushi',
    color: '#F055A2',
    imageUrl:
      'https://dynamic-assets.coinbase.com/cede43e837596061c7e2290c725be20ee0eb000eb76937c879289ccf08f5941f9c1d76e3f3dd8cb0e67f53d0f4adc48286516200e7db5bd6bc403fcd9d318449/asset_icons/483b36b14a995b07c7883d0647903f77d8feafe1f685b55a0334b8788b151194.png',
  },
  xrp: {
    symbol: 'XRP',
    name: 'XRP',
    color: '#222222',
    imageUrl:
      'https://dynamic-assets.coinbase.com/e81509d2307f706f3a6f8999968874b50b628634abf5154fc91a7e5f7685d496a33acb4cde02265ed6f54b0a08fa54912208516e956bc5f0ffd1c9c2634099ae/asset_icons/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png',
  },
  ada: {
    symbol: 'ADA',
    name: 'Cardano',
    color: '#0033AD',
    imageUrl:
      'https://dynamic-assets.coinbase.com/da39dfe3632bf7a9c26b5aff94fe72bc1a70850bc488e0c4d68ab3cf87ddac277cd1561427b94acb4b3e37479a1f73f1c37ed311c11a742d6edf512672aea7bb/asset_icons/a55046bc53c5de686bf82a2d9d280b006bd8d2aa1f3bbb4eba28f0c69c7597da.png',
  },
  uni: {
    symbol: 'UNI',
    name: 'Uniswap',
    color: '#FF007A',
    imageUrl:
      'https://dynamic-assets.coinbase.com/a1f4b7b34069888e313f284b49012a01b3bbc37b5113319c7105170a8fe268de8f60be5a0af7a8dafa8aba31fcc21ef44bc30c1e8bbb8379064ac94965bccf26/asset_icons/aafc2f5fff21664213e2a5a2c6e31aa055f277d1069b16745d54f84c0e94f1f3.png',
  },
  hbar: {
    symbol: 'HBAR',
    name: 'Hedera Hashgraph',
    color: '#222222',
    imageUrl:
      'https://dynamic-assets.coinbase.com/ae4087fcfeef11ad77d8875405ba933b9d623bcc8c483f280d3a15f2782de980349076c4f7b4616cc350c3727010d736448194829c4409e2824f710ee8f9832d/asset_icons/32d85085a6a6193b483ea8a9a23d4bf1384269d44c724a0349f0e0bd757f7427.png',
  },
  polygon: {
    symbol: 'MATIC',
    name: 'Polygon',
    color: '#222222',
    imageUrl:
      'https://dynamic-assets.coinbase.com/085ce26e1eba2ccb210ea85df739a0ca2ef782747e47d618c64e92b168b94512df469956de1b667d93b2aa05ce77947e7bf1b4e0c7276371aa88ef9406036166/asset_icons/57f28803aad363f419a950a5f5b99acfd4fba8b683c01b9450baab43c9fa97ea.png',
  },
};

export const squareAssets = {
  human1: 'https://avatars3.githubusercontent.com/u/100200?s=460&v=4',
  human2: 'https://bit.ly/kent-c-dodds',
  human3: 'https://bit.ly/dan-abramov',
  human4: 'https://bit.ly/code-beast',
  human5: 'https://bit.ly/ryan-florence',
  human6: 'https://bit.ly/prosper-baba',
} as const;

export const assetColors = Object.entries(assets).map(([, value]) => value.color);
export const assetImages = Object.entries(assets).map(([, value]) => value.imageUrl);

export const svgs = [
  'https://static-assets.coinbase.com/design-system/illustrations/light/giftBoxCrypto-0.svg',
  'https://static-assets.coinbase.com/design-system/illustrations/light/interestForYou-0.svg',
  'https://static-assets.coinbase.com/design-system/illustrations/light/ethereumStaking-0.svg',
  'https://static-assets.coinbase.com/design-system/illustrations/light/moneyRewards-0.svg',
];
