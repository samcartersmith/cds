import { Pictogram } from '../Pictogram';

import { getIllustrationSheet } from './getIllustrationSheet';
import { IllustrationExample } from './IllustrationExample';

export default {
  title: 'Illustrations',
  component: Pictogram,
};

export const pictogram = () => (
  <IllustrationExample>
    <Pictogram name="2fa" scaleMultiplier={2} />
  </IllustrationExample>
);

// TODO: figure out a way to handle this split dynamically, maybe add a codegen script that executes as part of release script
// single sheet is too large for percy, need to split them up in chunks of 240 to stay under limit
export const pictogramSheet1 = getIllustrationSheet({ type: 'pictogram', endIndex: 240 });
export const pictogramSheet2 = getIllustrationSheet({
  type: 'pictogram',
  startIndex: 240,
  endIndex: 480,
});
