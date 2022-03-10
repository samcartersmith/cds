import React from 'react';
import {
  IllustrationSpotRectangleNames,
  IllustrationSpotSquareNames,
  IllustrationPictogramNames,
} from '@cbhq/cds-common/types/IllustrationNames';
import { SpotRectangle, SpotSquare, Pictogram } from '../illustrations';
import { VStack } from '../layout/VStack';

export const CardSpotRectangle = ({ name }: { name: IllustrationSpotRectangleNames }) => {
  return (
    <VStack width="100%" alignItems="center" justifyContent="center" height={190}>
      <SpotRectangle name={name} />
    </VStack>
  );
};

export const CardSpotSquare = ({ name }: { name: IllustrationSpotSquareNames }) => {
  return (
    <VStack width="100%" alignItems="center" justifyContent="center" height={190}>
      <SpotSquare name={name} />
    </VStack>
  );
};

export const CardPictogram = ({ name }: { name: IllustrationPictogramNames }) => {
  return (
    <VStack width="100%" alignItems="center" justifyContent="center" height={190}>
      <Pictogram name={name} />
    </VStack>
  );
};
