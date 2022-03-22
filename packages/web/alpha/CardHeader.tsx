import { createCardHeader } from '@cbhq/cds-common/cards/createCardHeader';

import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Avatar } from '../media/Avatar';
import { createText } from '../typography/createText';

export type CardHeaderProps = React.ComponentProps<typeof CardHeader>;

const TextLabel1 = createText('label1', { as: 'p' });
const TextLegal = createText('legal', { as: 'p' });

export const CardHeader = createCardHeader({
  Avatar,
  HStack,
  VStack,
  TextLabel1,
  TextLegal,
});
