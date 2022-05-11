import { createCardBody } from '@cbhq/cds-common/cards/createCardBody';
import { createCardBodyAction } from '@cbhq/cds-common/cards/createCardBodyAction';

import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { TextHeadline } from '../typography/TextHeadline';
import { TextLabel2 } from '../typography/TextLabel2';

import { Button } from './Button';
import { CardMedia } from './CardMedia';

export type CardBodyProps = React.ComponentProps<typeof CardBody>;
export type CardBodyActionProps = React.ComponentProps<typeof CardBodyAction>;

export const CardBodyAction = createCardBodyAction({
  Button,
});

export const CardBody = createCardBody({
  HStack,
  VStack,
  TextHeadline,
  TextLabel2,
  CardMedia,
  CardBodyAction,
  platform: 'mobile',
});
