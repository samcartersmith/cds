// eslint-disable-next-line no-console
const onPress = () => console.log('pressed');
export const announcementCards = [
  {
    key: 'card1',
    title: 'Crypto gifts',
    description: 'Give crypto to your family and friends',
    illustration: 'adaStaking',
    actionLabel: 'Contact support',
    onActionPress: onPress,
  },
  {
    key: 'card2',
    title: 'Want more assets?',
    description: 'Trade over 4,000 assets with Coinbase Wallet',
    illustration: 'addMultipleCrypto',
    actionLabel: 'Contact support',
    onPress,
  },
  {
    key: 'card3',
    title: 'Introducing SHIB',
    description: 'Shiba Inu (SHIB) is now on Coinbase',
    illustration: 'cardShipped',
    actionLabel: 'Contact support',
    onPress,
  },
] as const;
