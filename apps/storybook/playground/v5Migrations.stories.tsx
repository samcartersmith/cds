/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useCellSpacing } from '@cbhq/cds-common/hooks/useCellSpacing';
// should update to '@cbhq-common/motion/tokens'
import { curves } from '@cbhq/cds-common/tokens/motion';
import { Animated } from '@cbhq/cds-web/animation/Animated';
import { CollapseArrow } from '@cbhq/cds-web/collapsible/CollapseArrow';
// should update to '@cbhq-web/navigation/Sidebar'
import { Sidebar } from '@cbhq/cds-web/deprecated/navigation/Sidebar';
import { useIsMobile } from '@cbhq/cds-web/hooks/useIsMobile';
// Badge import should throw warning that component was removed
import { Badge, Icon, LogoMark, NavigationIcon as NavIcon } from '@cbhq/cds-web/icons';
import { Pictogram as CDSPictogram, Pictogram, SpotSquare } from '@cbhq/cds-web/illustrations';
import { Box, Group, VStack } from '@cbhq/cds-web/layout';
// should update to '@cbhq-web/cards/Card'
import { Card } from '@cbhq/cds-web/layout/Card';
import { none } from '@cbhq/cds-web/styles/borderRadius';

export const V5MigrationsTest = () => {
  // migrated token
  const radii = none;
  // removed token
  const { global } = curves;
  // removed param
  const testDeprecatedParam = useCellSpacing({
    reduceHorizontalSpacing: true,
    offsetHorizontal: 1,
  });
  // migrated function
  const isMobile = useIsMobile();
  // removed function
  const animatedTest = Animated;
  return (
    <VStack>
      {/* prop value migrations */}
      <SpotSquare name="addCard" dimension="120x120" />
      <Pictogram name="2fa" dimension="96x96" />
      <CDSPictogram name="2fa" dimension="96x96" />
      {/* boolean prop -> attribute value migrations */}
      <Group horizontal>
        <Box />
        <Box />
      </Group>
      {/* removed props */}
      <Icon name="add" size="s" badge={<Badge />} />
      <NavIcon name="addPeople" size="s" badge={<Badge />} />
      {/* import path migrations */}
      <Card />
      {/* removed exports with no replacement */}
      <Sidebar logo={<LogoMark />}>
        <li>Test</li>
      </Sidebar>
      {/* This should get swapped out with AnimatedCaret */}
      <CollapseArrow />
    </VStack>
  );
};

export default {
  title: 'Playground/CDSMigrator',
};
