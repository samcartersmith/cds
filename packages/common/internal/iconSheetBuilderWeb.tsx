/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { entries } from '@cbhq/cds-utils';

import { ScaleProvider } from '../scale/ScaleProvider';
import type { BoxBaseProps, IconBaseProps, StackBaseProps } from '../types';
import flattenNodes from '../utils/flattenNodes';

import { unicodeMap } from './data/iconData';

export type CreateIconSheetParams = {
  VStack: React.ComponentType<BoxBaseProps & StackBaseProps>;
  HStack: React.ComponentType<BoxBaseProps & StackBaseProps>;
  Icon: React.ComponentType<IconBaseProps & { color: string }>;
};

export function iconSheetBuilderWeb({ VStack, HStack, Icon }: CreateIconSheetParams) {
  // Need to paginate this because percy can't serve 1200 images
  // in a single page. So breaking it to separate pages.
  // [startIdx, endIdx). Last index is excluded
  function IconSheet(startIdx: number, endIdx: number) {
    const components = [];

    for (const [name] of entries(unicodeMap).slice(startIdx, endIdx)) {
      const originalIcons = [];
      const transformedIcons = [];

      // Handle 8px size
      transformedIcons.push(
        <ScaleProvider value="xSmall">
          <Icon color="foreground" name={name} size="xs" />
        </ScaleProvider>,
      );
      // Handle remaining sizes in normal scale
      for (const size of ['xs', 's', 'm', 'l'] as const) {
        transformedIcons.push(<Icon color="foreground" name={name} size={size} />);
      }

      for (const [size, unicode] of entries(unicodeMap[name])) {
        // eslint-disable-next-line import/no-dynamic-require
        const image = require(`./data/iconSvgs/${unicode}-${name}-${size}.svg`);

        originalIcons.push(<img src={image} alt={name} width={size} height={size} />);
      }

      components.push(
        <VStack>
          <HStack gap={2} spacingBottom={2}>
            {flattenNodes(transformedIcons)}
          </HStack>
          <HStack gap={2} spacingBottom={2}>
            {flattenNodes(originalIcons)}
          </HStack>
        </VStack>,
      );
    }
    return (
      <VStack>
        {
          'The blue icons are icons loaded originally from Figma. This way you can see if the font generated icon differs from how the icon looks in Figma. There are some icons where the second one is still foreground. Those are that way because they are navigation icons which doesnt have color prop. \n'
        }
        <HStack flexWrap="wrap" gap={2}>
          {flattenNodes(components)}
        </HStack>
      </VStack>
    );
  }

  return { IconSheet };
}
