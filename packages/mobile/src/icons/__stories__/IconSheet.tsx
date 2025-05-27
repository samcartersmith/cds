import React from 'react';
import { IconName } from '@cbhq/cds-common';
import { sortNamesByOldOrder } from '@cbhq/cds-common/internal/utils/sortIconsForVisReg';
import { UiIconName } from '@cbhq/cds-icons';
import names from '@cbhq/cds-icons/__generated__/ui/data/names';
import namesOld from '@cbhq/cds-icons/__generated__/ui/data/names-old';

import { HStack, VStack } from '../../layout';
import { Icon } from '../Icon';

function IconSheetRow({ name }: { name: IconName }) {
  return (
    <VStack>
      <HStack gap={2} paddingBottom={2}>
        {(['xs', 's', 'm', 'l'] as const).map((size) => {
          return <Icon key={`icon-${name}-${size}`} color="fg" name={name} size={size} />;
        })}
      </HStack>
    </VStack>
  );
}

export function IconSheet() {
  const sortedNames = sortNamesByOldOrder(namesOld, names) as UiIconName[]; // Use sorted names

  return (
    <VStack>
      <HStack flexWrap="wrap" gap={2}>
        {sortedNames.map((item) => {
          return <IconSheetRow key={`icon-row-${item}`} name={item} />;
        })}
      </HStack>
    </VStack>
  );
}
