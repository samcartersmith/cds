import React from 'react';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';
import { ModalFooterBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';

import { Button } from '../../buttons';
import { HStack } from '../../layout';

import { modalFooterClassName } from './modalStyles';

export type ModalFooterProps = ModalFooterBaseProps;

export const ModalFooter = ({ primaryAction, secondaryAction, testID }: ModalFooterProps) => {
  const { hideDividers } = useModalParent();

  if (primaryAction.type !== Button || (secondaryAction && primaryAction.type !== Button)) {
    // eslint-disable-next-line no-console
    console.error('Modal footer actions need to be CDS Button component');

    return null;
  }

  return (
    <HStack
      borderedTop={!hideDividers}
      dangerouslySetClassName={modalFooterClassName}
      gap={2}
      justifyContent="flex-end"
      spacingHorizontal={3}
      spacingVertical={2}
      testID={testID}
      width="100%"
    >
      {secondaryAction}
      {primaryAction}
    </HStack>
  );
};
