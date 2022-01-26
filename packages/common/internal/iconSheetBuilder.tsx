import React from 'react';
import { entries } from '@cbhq/cds-utils';

import type { BoxBaseProps, IconBaseProps, StackBaseProps, ThemeProviderBaseProps } from '../types';
import flattenNodes from '../utils/flattenNodes';

import { unicodeMap } from './data/iconData';

export type CreateIconSheetParams = {
  HStack: React.ComponentType<BoxBaseProps & StackBaseProps>;
  Icon: React.ComponentType<IconBaseProps & { color: string }>;
  ThemeProvider: React.ComponentType<ThemeProviderBaseProps>;
};

export function iconSheetBuilder({ HStack, Icon, ThemeProvider }: CreateIconSheetParams) {
  function IconSheet() {
    const components = [];
    for (const [name] of entries(unicodeMap)) {
      const group = [];
      // Handle 8px size
      group.push(
        <ThemeProvider scale="xSmall">
          <Icon color="foreground" name={name} size="xs" />
        </ThemeProvider>,
      );
      // Handle remaining sizes in normal scale
      for (const size of ['xs', 's', 'm', 'l'] as const) {
        group.push(<Icon color="foreground" name={name} size={size} />);
      }

      components.push(
        <HStack gap={2} spacingBottom={2}>
          {flattenNodes(group)}
        </HStack>,
      );
    }
    return (
      <HStack flexWrap="wrap" gap={2}>
        {flattenNodes(components)}
      </HStack>
    );
  }

  return { IconSheet };
}
