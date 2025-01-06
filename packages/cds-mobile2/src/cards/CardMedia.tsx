import { createCardMedia } from '@cbhq/cds-common2/cards/createCardMedia';

import { Pictogram, SpotSquare } from '../illustrations';

import { CardRemoteImage } from './CardRemoteImage';

export type CardMediaProps = React.ComponentProps<typeof CardMedia>;

export const CardMedia = createCardMedia({
  SpotSquare,
  Pictogram,
  CardRemoteImage,
});
