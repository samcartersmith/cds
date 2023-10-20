import React from 'react';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import names from '@cbhq/cds-icons/__generated__/nav/data/names';

import { ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { NavigationIcon } from '../NavigationIcon';

function NavigationIconScreen() {
  return (
    <ExampleScreen>
      <HStack flexWrap="wrap" gap={2} justifyContent="center" spacingVertical={2}>
        {names.map((name) => {
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
