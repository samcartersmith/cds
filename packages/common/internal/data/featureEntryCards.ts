import { FeatureEntryCardBaseProps } from '../../types/alpha';

type FeatureEntryProps = FeatureEntryCardBaseProps<typeof onPress> & { key: string };

const onPress = () => console.log('pressed');
export const featureEntryCards: FeatureEntryProps[] = [
  {
    key: 'card1',
    title: 'Recurring buys',
    description: 'Unsure when to buy? Try dollar cost averaging with a recurring.',
    spotSquare: 'nuxEarnCrypto',
    actionLabel: 'Get started',
    onActionPress: onPress,
  },
  {
    key: 'card2',
    title: 'Not sure when to buy?',
    description: 'Use dollar cost averaging to buy crypto',
    spotSquare: 'moneyRewards',
    actionLabel: 'Schedule',
    onActionPress: onPress,
  },
  {
    key: 'card3',
    title: 'Coinbase Card',
    description: 'We need to verify your address before we can issue your card.',
    spotSquare: 'confirmEmail',
    actionLabel: 'Verify address',
    onActionPress: onPress,
  },
  {
    key: 'card4',
    title: 'Coinbase Card',
    description: 'As soon as we complete our review of your upload, we’ll send you an email.',
    spotSquare: 'confirmEmail',
  },
];
