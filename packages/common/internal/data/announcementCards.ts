import { AnnouncementCardBaseProps } from '../../types/alpha/AnnouncementCardBaseProps';

const onPress = () => console.log('pressed');
export const announcementCards: AnnouncementCardBaseProps<typeof onPress>[] = [
  {
    title: 'Crypto gifts',
    description: 'Give crypto to your family and friends',
    illustration: 'adaStaking',
    actionLabel: 'Contact support',
    onActionPress: onPress,
  },
  {
    title: 'Want more assets?',
    description: 'Trade over 4,000 assets with Coinbase Wallet',
    illustration: 'addMultipleCrypto',
    actionLabel: 'Contact support',
    onActionPress: onPress,
  },
  {
    title: 'Introducing SHIB',
    description: 'Shiba Inu (SHIB) is now on Coinbase',
    illustration: 'cardShipped',
    actionLabel: 'Contact support',
    onActionPress: onPress,
  },
];
