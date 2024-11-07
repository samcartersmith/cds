import { dotBuilder } from '@cbhq/cds-common/internal/dotBuilder';

import { Icon } from '../../icons/Icon';
import { Box, HStack, VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { TextLabel1 } from '../../typography/TextLabel1';
import { DotCount, DotStatusColor, DotSymbol } from '..';

export default {
  title: 'Core Components/Dots/DotStatusColor',
  component: DotStatusColor,
};

const { AllDotStatusColor } = dotBuilder(
  DotCount,
  DotStatusColor,
  DotSymbol,
  (props) => <Box {...props} />,
  Avatar,
  (props) => <TextLabel1 as="p" {...props} />,
  Icon,
  (props) => <VStack {...props} />,
  (props) => <HStack {...props} />,
);

export { AllDotStatusColor };
