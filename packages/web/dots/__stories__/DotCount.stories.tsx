import { dotBuilder } from '@cbhq/cds-common/internal/dotBuilder';

import { Icon } from '../../icons/Icon';
import { Box, HStack, VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { TextLegal } from '../../typography';
import { TextLabel1 } from '../../typography/TextLabel1';
import { DotSymbol } from '../DotSymbol';
import { DotCount, DotStatusColor } from '..';

export default {
  title: 'Core Components/Dots/DotCount',
  component: DotCount,
};

export const { AllDotCount } = dotBuilder(
  DotCount,
  DotStatusColor,
  DotSymbol,
  (props) => <Box {...props} />,
  Avatar,
  (props) => <TextLabel1 as="p" {...props} />,
  (props) => <TextLegal as="p" {...props} />,
  Icon,
  (props) => <VStack {...props} />,
  (props) => <HStack {...props} />,
);
