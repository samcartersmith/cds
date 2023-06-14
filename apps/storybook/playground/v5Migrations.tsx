// THIS FILE IS FOR TESTING THE CDS MIGRATOR AND SHOULD NEVER BE BUILT
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useCellSpacing } from '@cbhq/cds-common/hooks/useCellSpacing';
// should update to '@cbhq-common/motion/tokens'
// @ts-expect-error testing
import { curves } from '@cbhq/cds-common/tokens/motion';
// @ts-expect-error testing
import { Animated } from '@cbhq/cds-web/animation/Animated';
import { IconButton } from '@cbhq/cds-web/buttons/IconButton';
// @ts-expect-error testing
import { CollapseArrow } from '@cbhq/cds-web/collapsible/CollapseArrow';
// should update to '@cbhq-web/navigation/Sidebar'
// @ts-expect-error testing
import { Sidebar } from '@cbhq/cds-web/deprecated/navigation/Sidebar';
// the import path should change to the decomped package
import { Dropdown } from '@cbhq/cds-web/dropdown';
// @ts-expect-error testing
import { useIsMobile } from '@cbhq/cds-web/hooks/useIsMobile';
// Badge import should throw warning that component was removed
// @ts-expect-error testing
import { Badge, Icon, LogoMark, NavigationIcon as NavIcon } from '@cbhq/cds-web/icons';
import { Pictogram as CDSPictogram, Pictogram, SpotSquare } from '@cbhq/cds-web/illustrations';
import { Box, Group, VStack } from '@cbhq/cds-web/layout';
// should update to '@cbhq-web/cards/Card'
// @ts-expect-error testing
import { Card } from '@cbhq/cds-web/layout/Card';
// @ts-expect-error testing
import { none } from '@cbhq/cds-web/styles/borderRadius';

export const V5MigrationsTest = () => {
  // migrated token
  const radii = none;
  // removed token
  const { global } = curves;
  // removed param
  const testDeprecatedParam = useCellSpacing({
    // @ts-expect-error testing
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
      {/* @ts-expect-error testing */}
      <SpotSquare name="addCard" dimension="120x120" />
      {/* @ts-expect-error testing */}
      <Pictogram name="2fa" dimension="96x96" />
      {/* @ts-expect-error testing */}
      <CDSPictogram name="2fa" dimension="96x96" />
      {/* boolean prop -> attribute value migrations */}
      <Group horizontal>
        <Box />
        <Box />
      </Group>
      {/* removed props */}
      {/* @ts-expect-error testing */}
      <Icon name="add" size="s" badge={<Badge />} />
      {/* @ts-expect-error testing */}
      <NavIcon name="addPeople" size="s" badge={<Badge />} />
      {/* import path migrations */}
      <Card />
      {/* removed exports with no replacement */}
      <Sidebar logo={<LogoMark />}>
        <li>Test</li>
      </Sidebar>
      {/* This should get swapped out with AnimatedCaret */}
      <CollapseArrow />
      {/* this should not be deprecated after package decomp migrations run */}
      <Dropdown content="test">
        <IconButton name="caretDown" />
      </Dropdown>
    </VStack>
  );
};

export default {
  title: 'Playground/CDSMigrator',
};
