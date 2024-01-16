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
import { ContentCell, ListCell } from '@cbhq/cds-web/cells';
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
import { PopoverMenu, PopoverTrigger } from '@cbhq/cds-web/overlays';
// @ts-expect-error testing
import { none } from '@cbhq/cds-web/styles/borderRadius';

const testVar = '120x120';

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
      {/* @ts-expect-error this should not be automatically migratable */}
      <SpotSquare dimension={testVar} name="addCard" />
      {/* @ts-expect-error but this is */}
      <Pictogram dimension={isMobile ? '96x96' : '64x64'} name="2fa" />
      {/* @ts-expect-error this should not be automatically migratable */}
      <Pictogram dimension={isMobile ? testVar : '64x64'} name="2fa" />
      {/* @ts-expect-error testing */}
      <CDSPictogram dimension="96x96" name="2fa" />
      {/* @ts-expect-error testing */}
      <ContentCell reduceHorizontalSpacing />
      {/* @ts-expect-error testing */}
      <ListCell offsetHorizontal={2} />
      {/* @ts-expect-error testing */}
      <Box borderRadius="tooltip" />
      {/* boolean prop -> attribute value migrations */}
      <Group horizontal>
        <Box />
        <Box />
      </Group>
      {/* removed props */}
      {/* @ts-expect-error testing */}
      <Icon badge={<Badge />} name="add" size="s" />
      {/* @ts-expect-error testing */}
      <NavIcon badge={<Badge />} name="addPeople" size="s" />
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
      <PopoverMenu>
        <PopoverTrigger />
      </PopoverMenu>
    </VStack>
  );
};

export default {
  title: 'Playground/CDSMigrator',
};
