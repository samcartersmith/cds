import { dotBuilder } from '@cbhq/cds-common/internal/dotBuilder';

import { Icon } from '../../icons/Icon';
import { Box, VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { TextLegal } from '../../typography';
import { TextLabel1 } from '../../typography/TextLabel1';
import { DotCount, DotStatusColor, DotSymbol } from '..';

export default {
  title: 'Core Components/Dots/DotSymbol',
  component: DotSymbol,
};

export const { DotSymbolPlacements, DotSymbolSizes, DotSymbolIcon, DotSymbolOverlap } = dotBuilder(
  DotCount,
  DotStatusColor,
  DotSymbol,
  (props) => <Box {...props} />,
  Avatar,
  (props) => <TextLabel1 as="p" {...props} />,
  (props) => <TextLegal as="p" {...props} />,
  Icon,
  (props) => <VStack {...props} />,
);
