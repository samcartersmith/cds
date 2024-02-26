import { createCardMedia } from '@cbhq/cds-common/cards/createCardMedia';

import { Pictogram, SpotSquare } from '../illustrations';

import { CardRemoteImage } from './CardRemoteImage';

export type CardMediaProps = React.ComponentProps<typeof CardMedia>;

export const CardMedia = createCardMedia({
  CardRemoteImage,
  SpotSquare,
  Pictogram,
});
