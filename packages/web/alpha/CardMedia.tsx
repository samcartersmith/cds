import { createCardMedia } from '@cbhq/cds-common/cards/createCardMedia';

import { Illustration } from '../illustrations/Illustration';

import { CardRemoteImage } from './CardRemoteImage';

export type CardMediaProps = React.ComponentProps<typeof CardMedia>;

export const CardMedia = createCardMedia({
  CardRemoteImage,
  Illustration,
});
