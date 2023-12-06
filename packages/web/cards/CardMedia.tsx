import React from 'react';
import {
  IllustrationPictogramNames,
  IllustrationSpotRectangleNames,
  IllustrationSpotSquareNames,
} from '@cbhq/cds-common/types/IllustrationNames';

import { Pictogram, SpotRectangle, SpotSquare } from '../illustrations';
import { VStack } from '../layout/VStack';

/** @deprecated will be removed in v6.0.0 Please use CardMedia moving forward */
export const CardSpotRectangle = ({ name }: { name: IllustrationSpotRectangleNames }) => {
  return (
    <VStack alignItems="center" height="auto" justifyContent="center" spacingTop={2} width="100%">
      <SpotRectangle name={name} />
    </VStack>
  );
};

/** @deprecated will be removed in v6.0.0 Please use CardMedia moving forward */
export const CardSpotSquare = ({ name }: { name: IllustrationSpotSquareNames }) => {
  return (
    <VStack alignItems="center" height="auto" justifyContent="center" spacingTop={2} width="100%">
      <SpotSquare name={name} />
    </VStack>
  );
};

/** @deprecated will be removed in v6.0.0 Please use CardMedia moving forward */
export const CardPictogram = ({ name }: { name: IllustrationPictogramNames }) => {
  return (
    <VStack alignItems="center" height="auto" justifyContent="center" spacingTop={2} width="100%">
      <Pictogram name={name} />
    </VStack>
  );
};
