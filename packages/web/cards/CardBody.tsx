import React from 'react';
import { CardBodyBaseProps } from '@cbhq/cds-common';
import { createCardBody } from '@cbhq/cds-common/cards/createCardBody';
import { createCardBodyAction } from '@cbhq/cds-common/cards/createCardBodyAction';

import { Button } from '../buttons/Button';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { OnPress, PressableProps } from '../system';
import { createText } from '../typography/createText';

import { CardMedia } from './CardMedia';

export type CardBodyProps = CardBodyBaseProps & {
  onActionPress?: PressableProps['onPress'];
};

const CardBodyAction = createCardBodyAction<OnPress>({
  Button,
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

// TODO: remove these exports (breaking change in Q32024)
export type CardBodyActionProps = React.ComponentProps<typeof CardBodyAction>;
export { CardBodyAction };
