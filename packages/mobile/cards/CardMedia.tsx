import React from 'react';
import {
  IllustrationPictogramNames,
  IllustrationSpotRectangleNames,
  IllustrationSpotSquareNames,
} from '@cbhq/cds-common/types/IllustrationNames';

import { Pictogram, SpotRectangle, SpotSquare } from '../illustrations';
import { VStack } from '../layout/VStack';

export const CardSpotRectangle = ({ name }: { name: IllustrationSpotRectangleNames }) => {
  return (
    <VStack alignItems="center" height={190} justifyContent="center" width="100%">
      <SpotRectangle name={name} />
    </VStack>
  );
};

export const CardSpotSquare = ({ name }: { name: IllustrationSpotSquareNames }) => {
  return (
    <VStack alignItems="center" height={190} justifyContent="center" width="100%">
      <SpotSquare name={name} />
    </VStack>
  );
};

export const CardPictogram = ({ name }: { name: IllustrationPictogramNames }) => {
  return (
    <VStack alignItems="center" height={190} justifyContent="center" width="100%">
      <Pictogram name={name} />
    </VStack>
  );
};
