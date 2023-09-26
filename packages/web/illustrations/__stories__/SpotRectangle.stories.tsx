import { SpotRectangle } from '../SpotRectangle';

import { getIllustrationSheet } from './getIllustrationSheet';
import { IllustrationExample } from './IllustrationExample';

export default {
  title: 'Illustrations',
  component: SpotRectangle,
};

export const spotRectangle = () => (
  <IllustrationExample>
    <SpotRectangle name="accessToAdvancedCharts" />
  </IllustrationExample>
);

export const spotRectangleSheet1 = getIllustrationSheet({ type: 'spotRectangle' });
