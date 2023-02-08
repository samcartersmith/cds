import React from 'react';
import { IconName, NavigationIconName } from '@cbhq/cds-common';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';

import { HStack, VStack } from '../../layout';
import { Icon } from '../Icon';
import { NavigationIcon } from '../NavigationIcon';

// import names from '@cbhq/cds-icons/__generated__/ui/data/names';
import { oldIconSheetNames, TemporarySheetName } from './oldIconSheetNames';

function isIcon(name: TemporarySheetName): name is IconName {
  return typeof name === 'string';
}

function IconSheetRow({ name }: { name: IconName }) {
  return (
    <VStack>
      <HStack spacingBottom={2} gap={2}>
        <ScaleProvider value="xSmall">
          <Icon color="foreground" name={name} size="xs" />
        </ScaleProvider>
        {(['xs', 's', 'm', 'l'] as const).map((size) => {
          return <Icon key={`icon-${name}-${size}`} color="foreground" name={name} size={size} />;
        })}
      </HStack>
    </VStack>
  );
}

function NavigationIconSheetRow({ name, active }: { name: NavigationIconName; active?: boolean }) {
  return (
    <VStack>
      <HStack spacingBottom={2} gap={2}>
        <ScaleProvider value="xSmall">
          <HStack gap={2}>
            <NavigationIcon name={name} size="s" active={active} />
            <NavigationIcon name={name} size="m" active={active} />
          </HStack>
        </ScaleProvider>
        {(['s', 'm', 'l'] as const).map((size) => {
          return (
            <NavigationIcon
              key={`nav-icon-${name}-${size}`}
              name={name}
              size={size}
              active={active}
            />
          );
        })}
      </HStack>
    </VStack>
  );
}

export function IconSheet() {
  return (
    <VStack>
      <HStack gap={2} flexWrap="wrap">
        {oldIconSheetNames.map((item) => {
          if (isIcon(item)) {
            return <IconSheetRow key={`icon-row-${item}`} name={item} />;
          }
          const [name, props] = item;
          return (
            <NavigationIconSheetRow
              key={`nav-icon-${name}-${!!props.active}`}
              name={name}
              {...props}
            />
          );
        })}
      </HStack>
    </VStack>
  );
}
