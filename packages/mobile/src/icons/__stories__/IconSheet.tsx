import React from 'react';
import { IconName } from '@cbhq/cds-common';
import { names } from '@cbhq/cds-icons/names';

import { HStack, VStack } from '../../layout';
import { Icon } from '../Icon';

export function IconSheet() {
  return (
    <VStack>
      <HStack flexWrap="wrap" gap={2}>
        {names.map((item) => (
          <VStack key={item}>
            <HStack gap={2} paddingBottom={2}>
              {(['xs', 's', 'm', 'l'] as const).map((size) => (
                <Icon key={size} color="fg" name={item} size={size} />
              ))}
            </HStack>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
}
