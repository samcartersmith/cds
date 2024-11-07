import React from 'react';
import { IconName } from '@cbhq/cds-common';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import names from '@cbhq/cds-icons/__generated__/ui/data/names';

import { HStack, VStack } from '../../layout';
import { Icon } from '../Icon';

function IconSheetRow({ name }: { name: IconName }) {
  return (
    <VStack>
      <HStack gap={2} spacingBottom={2}>
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

export function IconSheet() {
  return (
    <VStack>
      <HStack flexWrap="wrap" gap={2}>
        {names.map((item) => {
          return <IconSheetRow key={`icon-row-${item}`} name={item} />;
        })}
      </HStack>
    </VStack>
  );
}
