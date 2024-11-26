import React from 'react';
import { sortNamesByOldOrder } from '@cbhq/cds-common/internal/utils/sortIconsForVisReg';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import { NavIconName } from '@cbhq/cds-icons';
import names from '@cbhq/cds-icons/__generated__/nav/data/names';
import namesOld from '@cbhq/cds-icons/__generated__/nav/data/names-old';

import { ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { NavigationIcon } from '../NavigationIcon';

function NavigationIconScreen() {
  const sortedNames = sortNamesByOldOrder(namesOld, names) as NavIconName[]; // Use sorted names

  return (
    <ExampleScreen>
      <HStack flexWrap="wrap" gap={2} justifyContent="center" spacingVertical={2}>
        {sortedNames.map((name) => {
          return (
            <HStack key={`nav-icon-wrapper-${name}`} alignItems="center" gap={2}>
              <HStack alignItems="center" gap={2}>
                <ScaleProvider value="xSmall">
                  <NavigationIcon name={name} size="s" />
                </ScaleProvider>
                {(['s', 'm', 'l'] as const).map((size) => {
                  return <NavigationIcon key={`${name}-${size}`} name={name} size={size} />;
                })}
              </HStack>
              <HStack alignItems="center" gap={2}>
                <ScaleProvider value="xSmall">
                  <NavigationIcon active name={name} size="s" />
                </ScaleProvider>
                {(['s', 'm', 'l'] as const).map((size) => {
                  return (
                    <NavigationIcon key={`${name}-${size}-active`} active name={name} size={size} />
                  );
                })}
              </HStack>
            </HStack>
          );
        })}
      </HStack>
    </ExampleScreen>
  );
}

export default NavigationIconScreen;
