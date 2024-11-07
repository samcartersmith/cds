import { dotBuilder } from '@cbhq/cds-common/internal/dotBuilder';

import { Icon } from '../../icons/Icon';
import { Box, HStack, VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { Pressable } from '../../system';
import { TextLabel1 } from '../../typography/TextLabel1';
import { DotSymbol } from '../DotSymbol';
import { DotCount, DotStatusColor } from '..';

export default {
  title: 'Core Components/Dots/DotCount',
  component: DotCount,
};

const { AllDotCount } = dotBuilder(
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

export { AllDotCount };

export const DotCountPressable = () => {
  return (
    <HStack gap={4}>
      {[1, 10, 20, 50, 100].map((count: number) => {
        return (
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          <Pressable noScaleOnPress background="transparent" onPress={() => console.log('pressed')}>
            <Box
              accessibilityLabel="test"
              position="relative"
              tabIndex={0}
              testID="notification-bell-container"
            >
              <DotCount
                count={count}
                overlap="circular"
                pin="top-end"
                testID="notification-bell-badge"
              >
                <Icon color="foreground" name="bell" size="s" testID="notification-bell-icon" />
              </DotCount>
            </Box>
          </Pressable>
        );
      })}
    </HStack>
  );
};
