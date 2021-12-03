import { createStories } from ':cds-storybook/stories/Dots';
import { DotCount, DotStatusColor } from '..';
import { Box, VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { TextLabel1 } from '../../typography/TextLabel1';
import { Icon } from '../../icons/Icon';

export default {
  title: 'Core Components/Dots/DotCount',
  component: DotCount,
};

export const { DotCountBasic, DotCountVariant, DotCountPlacements } = createStories(
  DotCount,
  DotStatusColor,
  (props) => <Box {...props} />,
  Avatar,
  (props) => <TextLabel1 as="p" {...props} />,
  Icon,
  (props) => <VStack {...props} />,
);
