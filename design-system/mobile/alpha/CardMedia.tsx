import { createCardMedia } from '@cbhq/cds-common/cards/createCardMedia';
import { CardRemoteImage } from './CardRemoteImage';
import { Illustration } from '../illustrations/Illustration';

export type CardMediaProps = React.ComponentProps<typeof CardMedia>;

export const CardMedia = createCardMedia({
  CardRemoteImage,
  Illustration,
});
