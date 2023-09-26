import { HeroSquare } from '../HeroSquare';

import { getIllustrationSheet } from './getIllustrationSheet';
import { IllustrationExample } from './IllustrationExample';

export default {
  title: 'Illustrations',
  component: HeroSquare,
};

export const heroSquare = () => (
  <IllustrationExample>
    <HeroSquare name="accessToAdvancedCharts" />
  </IllustrationExample>
);

// TODO: figure out a way to handle this split dynamically, maybe add a codegen script that executes as part of release script
// single sheet is too large for percy, need to split them up in chunks of 240 to stay under limit
export const heroSquareSheet1 = getIllustrationSheet({ type: 'heroSquare', endIndex: 240 });
export const heroSquareSheet2 = getIllustrationSheet({
  type: 'heroSquare',
  startIndex: 240,
  endIndex: 480,
});
