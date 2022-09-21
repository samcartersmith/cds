import { ImageSourcePropType } from 'react-native';

import filledHeart16 from './filled_heart_16px.png';
import filledHeart24 from './filled_heart_24px.png';
import filledHeart32 from './filled_heart_32px.png';
import heart32 from './heart_32px.png';

export const TestAssets = {
  heart: {
    '32px': heart32 as ImageSourcePropType,
  },
  filledHeart: {
    '16px': filledHeart16 as ImageSourcePropType,
    '24px': filledHeart24 as ImageSourcePropType,
    '32px': filledHeart32 as ImageSourcePropType,
  },
};
