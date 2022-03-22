import { createCardBody } from '@cbhq/cds-common/cards/createCardBody';
import { createCardBodyAction } from '@cbhq/cds-common/cards/createCardBodyAction';

import { Button } from '../buttons/Button';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { createText } from '../typography/createText';

import { CardMedia } from './CardMedia';

export type CardBodyProps = React.ComponentProps<typeof CardBody>;
export type CardBodyActionProps = React.ComponentProps<typeof CardBodyAction>;

export const CardBodyAction = createCardBodyAction({
  Button,
  platform: 'web',
});

const TextHeadline = createText('headline', { as: 'h3' });
const TextLabel2 = createText('label2', { as: 'p' });

export const CardBody = createCardBody({
  HStack,
  VStack,
  TextHeadline,
  TextLabel2,
  CardMedia,
  CardBodyAction,
  platform: 'web',
});
