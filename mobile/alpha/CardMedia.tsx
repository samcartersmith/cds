import { CardMediaProps, createCardMedia } from '@cbhq/cds-common/cards/createCardMedia';
import { CardRemoteImage } from './CardRemoteImage';
import { Illustration } from '../illustrations/Illustration';

export type { CardMediaProps };

export const CardMedia = createCardMedia({
  CardRemoteImage,
  Illustration,
});
