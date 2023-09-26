import { SpotSquare } from '../SpotSquare';

import { getIllustrationSheet } from './getIllustrationSheet';
import { IllustrationExample } from './IllustrationExample';

export default {
  title: 'Illustrations',
  component: SpotSquare,
};

export const spotSquare = () => (
  <IllustrationExample>
    <SpotSquare name="accessToAdvancedCharts" />
  </IllustrationExample>
);

export const spotSquareSheet1 = getIllustrationSheet({ type: 'spotSquare' });
