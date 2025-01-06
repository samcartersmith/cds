import React from 'react';
import { assets } from '@cbhq/cds-common2/internal/data/assets';
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

const {
  DotCountBasic,
  DotCountVariant,
  DotCountPlacements,
  DotCountOverlap,
  DotCountComplex,
  DotStatusColorBasic,
  DotStatusColorVariant,
  DotStatusColorSizes,
  DotStatusColorPlacements,
  DotStatusColorOverlap,
  DotSymbolPlacements,
  DotSymbolIcon,
  DotSymbolOverlap,
  DotSymbolSizes,
  DotSymbolComplex,
} = dotBuilder(DotCount, DotStatusColor, DotSymbol, Box, Avatar, TextLabel1, Icon, VStack, HStack);

const DotScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="DotCount Basic">
        <DotCountBasic />
      </Example>
      <Example inline title="DotCount Placements">
        <DotCountPlacements />
      </Example>
      <Example inline title="DotCount Variant">
        <DotCountVariant />
      </Example>
      <Example inline title="DotCount Overlap">
        <DotCountOverlap />
      </Example>
      <Example inline title="DotCount Complex">
        <DotCountComplex />
      </Example>
      <Example inline title="DotStatusColor Basic">
        <DotStatusColorBasic />
      </Example>
      <Example inline title="DotStatusColor Variant">
        <DotStatusColorVariant />
      </Example>
      <Example inline title="DotStatusColor Sizes">
        <DotStatusColorSizes />
      </Example>
      <Example inline title="DotStatusColor Placements">
        <DotStatusColorPlacements />
      </Example>
      <Example inline title="DotStatusColor Overlap">
        <DotStatusColorOverlap />
      </Example>
      <Example inline title="DotSymbol Basic">
        <DotSymbol source={{ uri: assets.btc.imageUrl }} />
      </Example>
      <Example inline title="DotSymbol Sizes">
        <DotSymbolSizes />
      </Example>
      <Example inline title="DotSymbol Placements">
        <DotSymbolPlacements />
      </Example>
      <Example inline title="DotSymbol Icons">
        <DotSymbolIcon />
      </Example>
      <Example inline title="DotSymbol Overlap">
        <DotSymbolOverlap />
      </Example>
      <Example inline title="DotSymbol Complex">
        <DotSymbolComplex />
      </Example>
    </ExampleScreen>
  );
};

export default DotScreen;
