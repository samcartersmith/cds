import React from 'react';
import { CardMediaProps, createCardMedia } from '@cbhq/cds-common/cards/createCardMedia';
import {
  IllustrationSpotRectangleNames,
  IllustrationSpotSquareNames,
  IllustrationPictogramNames,
} from '@cbhq/cds-common/types/IllustrationNames';
import { CardRemoteImage } from './CardRemoteImage';
import { Illustration } from '../illustrations/Illustration';
import { SpotRectangle, SpotSquare, Pictogram } from '../illustrations';
import { VStack } from '../layout/VStack';

export type { CardMediaProps };

export const CardMedia = createCardMedia({
  CardRemoteImage,
  Illustration,
});

/** @deprecated Please use CardMedia moving forward */
export const CardSpotRectangle = ({ name }: { name: IllustrationSpotRectangleNames }) => {
  return (
    <VStack width="100%" alignItems="center" justifyContent="center" height={190}>
      <SpotRectangle name={name} />
    </VStack>
  );
};

/** @deprecated Please use CardMedia moving forward */
export const CardSpotSquare = ({ name }: { name: IllustrationSpotSquareNames }) => {
  return (
    <VStack width="100%" alignItems="center" justifyContent="center" height={190}>
      <SpotSquare name={name} />
    </VStack>
  );
};

/** @deprecated Please use CardMedia moving forward */
export const CardPictogram = ({ name }: { name: IllustrationPictogramNames }) => {
  return (
    <VStack width="100%" alignItems="center" justifyContent="center" height={190}>
      <Pictogram name={name} />
    </VStack>
  );
};
