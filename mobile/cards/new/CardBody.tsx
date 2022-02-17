import { CardBodyBaseProps, createCardBody } from '@cbhq/cds-common/cards/createCardBody';
import {
  CardBodyActionBaseProps,
  createCardBodyAction,
} from '@cbhq/cds-common/cards/createCardBodyAction';

import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { TextHeadline } from '../../typography/TextHeadline';
import { TextLabel2 } from '../../typography/TextLabel2';
import { Button, ButtonProps } from '../../buttons/Button';
import { CardMedia } from '../CardMedia';

type OnPress = ButtonProps['onPress'];
export type CardBodyProps = CardBodyBaseProps<OnPress>;
export type CardBodyActionProps = CardBodyActionBaseProps<OnPress>;

export const CardBodyAction = createCardBodyAction({
  Button,
  platform: 'mobile',
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
