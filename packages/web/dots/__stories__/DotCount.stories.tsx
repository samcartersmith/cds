import { dotBuilder } from '@cbhq/cds-common/internal/dotBuilder';

import { Icon } from '../../icons/Icon';
import { Box, VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { TextLabel1 } from '../../typography/TextLabel1';
import { DotCount, DotStatusColor } from '..';

export default {
  title: 'Core Components/Dots/DotCount',
  component: DotCount,
};

export const { DotCountBasic, DotCountVariant, DotCountPlacements } = dotBuilder(
  DotCount,
  DotStatusColor,
  (props) => <Box {...props} />,
  Avatar,
  (props) => <TextLabel1 as="p" {...props} />,
  Icon,
  (props) => <VStack {...props} />,
);
