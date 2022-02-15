// eslint-disable-next-line no-console
const onPress = () => console.log('pressed');
export const featureEntryCards = [
  {
    title: 'Recurring buys',
    description: 'Unsure when to buy? Try dollar cost averaging with a recurring.',
    illustration: 'coinbaseOneSavingFunds',
    onPress,
  },
  {
    title: 'Not sure when to buy?',
    description: 'Use dollar cost averaging to buy crypto',
    illustration: 'moneyRewards',
    onPress,
  },
  {
    title: 'Coinbase Card',
    description: 'We need to verify your address before we can issue your card.',
    illustration: 'confirmEmail',
    onPress,
  },
] as const;
