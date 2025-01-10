import React from 'react';
import { dotBuilder } from '@cbhq/cds-common2/internal/dotBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons/Icon';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Avatar } from '../../media/Avatar';
import { TextLabel1 } from '../../typography/TextLabel1';
import { DotCount } from '../DotCount';
import { DotStatusColor } from '../DotStatusColor';
import { DotSymbol } from '../DotSymbol';

const { DotCountDynamic } = dotBuilder(
  DotCount,
  DotStatusColor,
  DotSymbol,
  // @ts-expect-error AndroidAccessibilityProps type's accessibilityLabelledBy allows an array, which is not compatible with BoxBaseProps in common
  Box,
  Avatar,
  TextLabel1,
  Icon,
  VStack,
  HStack,
);

const DotMiscScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="DotCount Dynamic">
        <DotCountDynamic />
      </Example>
    </ExampleScreen>
  );
};

export default DotMiscScreen;
