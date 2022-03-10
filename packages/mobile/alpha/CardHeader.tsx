import { createCardHeader } from '@cbhq/cds-common/cards/createCardHeader';

import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Avatar } from '../media/Avatar';
import { TextLabel1 } from '../typography/TextLabel1';
import { TextLegal } from '../typography/TextLegal';

export type CardHeaderProps = React.ComponentProps<typeof CardHeader>;

export const CardHeader = createCardHeader({
  Avatar,
  HStack,
  VStack,
  TextLabel1,
  TextLegal,
});
