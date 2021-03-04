import { LottieSource } from '@cbhq/cds-common';

import cardRewardsJson from './cardRewards.json';

export type CardRewardsLottie = LottieSource<'start' | 'end'>;
export const cardRewards = cardRewardsJson as CardRewardsLottie;
