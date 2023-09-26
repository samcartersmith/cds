import { SpotIcon } from '../SpotIcon';

import { getIllustrationSheet } from './getIllustrationSheet';
import { IllustrationExample } from './IllustrationExample';

export default {
  title: 'Illustrations',
  component: SpotIcon,
};

export const spotIcon = () => (
  <IllustrationExample>
    <SpotIcon name="productCoinbaseCard" scaleMultiplier={3} />
  </IllustrationExample>
);

export const spotIconSheet1 = getIllustrationSheet({ type: 'spotIcon' });
