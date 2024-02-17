import React from 'react';
import { dotBuilder } from '@cbhq/cds-common/internal/dotBuilder';

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
