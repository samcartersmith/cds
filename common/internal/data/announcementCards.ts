// eslint-disable-next-line no-console
const onPress = () => console.log('pressed');
export const announcementCards = [
  {
    title: 'Crypto gifts',
    description: 'Give crypto to your family and friends',
    illustration: 'invite',
    actionLabel: 'Contact support',
    onActionPress: onPress,
  },
  {
    title: 'Want more assets?',
    description: 'Trade over 4,000 assets with Coinbase Wallet',
    illustration: 'bitcoinAndOtherCrypto',
    actionLabel: 'Contact support',
    onPress,
  },
  {
    title: 'Introducing SHIB',
    description: 'Shiba Inu (SHIB) is now on Coinbase',
    illustration: 'addMoreCrypto',
    actionLabel: 'Contact support',
    onPress,
  },
] as const;
