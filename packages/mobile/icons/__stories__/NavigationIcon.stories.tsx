import React from 'react';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import names from '@cbhq/cds-icons/__generated__/nav/data/names';

import { ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { NavigationIcon } from '../NavigationIcon';

function NavigationIconScreen() {
  return (
    <ExampleScreen>
      <HStack spacingVertical={2} gap={2} flexWrap="wrap" justifyContent="center">
        {names.map((name) => {
          return (
            <HStack key={`nav-icon-wrapper-${name}`} gap={2} alignItems="center">
              <HStack gap={2} alignItems="center">
                <ScaleProvider value="xSmall">
                  <NavigationIcon name={name} size="s" />
                </ScaleProvider>
                {(['s', 'm', 'l'] as const).map((size) => {
                  return <NavigationIcon key={`${name}-${size}`} name={name} size={size} />;
                })}
              </HStack>
              <HStack gap={2} alignItems="center">
                <ScaleProvider value="xSmall">
                  <NavigationIcon name={name} size="s" active />
                </ScaleProvider>
                {(['s', 'm', 'l'] as const).map((size) => {
                  return (
                    <NavigationIcon key={`${name}-${size}-active`} name={name} size={size} active />
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
