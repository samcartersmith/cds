import React from 'react';
import { BoxBaseProps, IconBaseProps, StackBaseProps, SystemProviderProps } from '@cbhq/cds-common';
import { entries } from '@cbhq/cds-utils';
import flattenNodes from '@cbhq/cds-common/utils/flattenNodes';
import { unicodeMap } from './iconData';

export type CreateIconSheetParams = {
  HStack: React.ComponentType<BoxBaseProps & StackBaseProps>;
  Icon: React.ComponentType<IconBaseProps & { color: string }>;
  ThemeProvider: React.ComponentType<SystemProviderProps>;
};

export function createIconSheet({ HStack, Icon, ThemeProvider }: CreateIconSheetParams) {
  function IconSheet() {
    const components = [];
    for (const [name] of entries(unicodeMap)) {
      const group = [];
      // Handle 8px size
      group.push(
        <ThemeProvider scale="xSmall">
          <Icon color="foreground" name={name} size="xs" />
        </ThemeProvider>
      );
      // Handle remaining sizes in normal scale
      for (const size of ['xs', 's', 'm', 'l'] as const) {
        group.push(<Icon color="foreground" name={name} size={size} />);
      }

      components.push(
        <HStack gap={2} spacingBottom={2}>
          {flattenNodes(group)}
        </HStack>
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
