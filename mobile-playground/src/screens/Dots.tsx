import React from 'react';
import { assets } from '@cbhq/cds-common/internal/data/assets';
import { PLACEMENTS, SIZES, dotBuilder } from '@cbhq/cds-common/internal/dotBuilder';

import { DotCount, DotStatusColor, DotSymbol } from '@cbhq/cds-mobile/dots';
import { Box, VStack } from '@cbhq/cds-mobile/layout';
import { Avatar } from '@cbhq/cds-mobile/media';
import { Icon } from '@cbhq/cds-mobile/icons';
import { TextLabel1 } from '@cbhq/cds-mobile/typography';
import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';

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
      {PLACEMENTS.map((placement) => (
        <VStack gap={4} spacing={1} key={`DotSymbol-placement-${placement}`} spacingBottom={4}>
          <TextLabel1>{placement}</TextLabel1>
          <DotSymbol size="m" placement={placement} source={assets.btc.imageUrl}>
            <Avatar size="xxxl" alt="Sneezy" />
          </DotSymbol>
          <DotSymbol size="m" placement={placement} source={assets.dai.imageUrl}>
            <Avatar size="xl" alt="Sneezy" />
          </DotSymbol>
          <DotSymbol size="m" placement={placement} source={{ uri: assets.hbar.imageUrl }}>
            <Icon name="airdrop" size="l" />
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
    <ExamplesScreen>
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
    </ExamplesScreen>
  );
};

export default DotScreen;
