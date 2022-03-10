import React from 'react';
import {
  IllustrationSpotRectangleNames,
  IllustrationSpotSquareNames,
  IllustrationPictogramNames,
} from '@cbhq/cds-common/types/IllustrationNames';

import { SpotRectangle, SpotSquare, Pictogram } from '../illustrations';
import { VStack } from '../layout/VStack';

/** @deprecated Please use CardMedia moving forward */
export const CardSpotRectangle = ({ name }: { name: IllustrationSpotRectangleNames }) => {
  return (
    <VStack width="100%" alignItems="center" justifyContent="center" height="auto" spacingTop={2}>
      <SpotRectangle name={name} />
    </VStack>
  );
};

/** @deprecated Please use CardMedia moving forward */
export const CardSpotSquare = ({ name }: { name: IllustrationSpotSquareNames }) => {
  return (
    <VStack width="100%" alignItems="center" justifyContent="center" height="auto" spacingTop={2}>
      <SpotSquare name={name} />
    </VStack>
  );
};

/** @deprecated Please use CardMedia moving forward */
export const CardPictogram = ({ name }: { name: IllustrationPictogramNames }) => {
  return (
    <VStack width="100%" alignItems="center" justifyContent="center" height="auto" spacingTop={2}>
      <Pictogram name={name} />
    </VStack>
  );
};
