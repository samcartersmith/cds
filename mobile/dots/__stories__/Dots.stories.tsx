import React from 'react';
import { assets } from '@cbhq/cds-common/internal/data/assets';
import { PIN_DIRECTIONS, SIZES, dotBuilder } from '@cbhq/cds-common/internal/dotBuilder';

import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { Avatar } from '../../media/Avatar';
import { Icon } from '../../icons/Icon';
import { TextLabel1 } from '../../typography/TextLabel1';

import { DotCount } from '../DotCount';
import { DotStatusColor } from '../DotStatusColor';
import { DotSymbol } from '../DotSymbol';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const {
  DotCountBasic,
  DotStatusColorBasic,
  DotCountVariant,
  DotStatusColorVariant,
  DotStatusColorSizes,
  DotCountPlacements,
  DotStatusColorPlacements,
} = dotBuilder(DotCount, DotStatusColor, Box, Avatar, TextLabel1, Icon, VStack);

const DotSymbolPlacements = () => {
  return (
    <>
      {PIN_DIRECTIONS.map((pinDirection) => (
        <VStack gap={4} spacing={1} key={`DotSymbol-placement-${pinDirection}`} spacingBottom={4}>
          <TextLabel1>{pinDirection}</TextLabel1>
          <DotSymbol size="m" pin={pinDirection} source={assets.btc.imageUrl}>
            <Avatar size="xxxl" shape="square" alt="Sneezy" />
          </DotSymbol>
          <DotSymbol size="m" pin={pinDirection} source={assets.dai.imageUrl}>
            <Avatar size="xl" shape="square" alt="Sneezy" />
          </DotSymbol>
          <DotSymbol size="m" pin={pinDirection} source={{ uri: assets.hbar.imageUrl }}>
            <Icon name="calendar" size="l" />
          </DotSymbol>
        </VStack>
      ))}
    </>
  );
};

const DotSymbolSizes = () => {
  return (
    <>
      {SIZES.map((size) => (
        <VStack gap={1} key={`DotSymbol-size-${size}`}>
          <DotSymbol source={{ uri: assets.dai.imageUrl }} size={size} />
        </VStack>
      ))}
    </>
  );
};

const DotScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="DotCount Basic">
        <DotCountBasic />
      </Example>
      <Example inline title="DotStatusColor Basic">
        <DotStatusColorBasic />
      </Example>
      <Example inline title="BadgeSymbol Basic">
        <DotSymbol source={{ uri: assets.btc.imageUrl }} />
      </Example>
      <Example inline title="DotCount Variant">
        <DotCountVariant />
      </Example>
      <Example inline title="DotStatusColor Variant">
        <DotStatusColorVariant />
      </Example>
      <Example inline title="DotStatusColor Sizes">
        <DotStatusColorSizes />
      </Example>
      <Example inline title="DotSymbol Sizes">
        <DotSymbolSizes />
      </Example>
      <Example inline title="DotCount Placements">
        <DotCountPlacements />
      </Example>
      <Example inline title="DotStatusColor Placements">
        <DotStatusColorPlacements />
      </Example>
      <Example inline title="DotSymbol Placements">
        <DotSymbolPlacements />
      </Example>
    </ExampleScreen>
  );
};

export default DotScreen;
