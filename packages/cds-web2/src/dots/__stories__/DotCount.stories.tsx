import React from 'react';
import { dotBuilder } from '@cbhq/cds-common2/internal/dotBuilder';

import { Icon } from '../../icons/Icon';
import { Box, HStack, VStack } from '../../layout';
import { Avatar } from '../../media/Avatar';
import { Pressable } from '../../system/Pressable';
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
          // eslint-disable-next-line no-console
          <Pressable noScaleOnPress background="transparent" onClick={() => console.log('pressed')}>
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
                <Icon color="fg" name="bell" size="s" testID="notification-bell-icon" />
              </DotCount>
            </Box>
          </Pressable>
        );
      })}
    </HStack>
  );
};
