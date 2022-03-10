import React from 'react';
import { ModalFooterBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';

import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';
import { HStack } from '../../layout';
import { modalFooterClassName } from './modalStyles';
import { Button } from '../../buttons';

export type ModalFooterProps = ModalFooterBaseProps;

export const ModalFooter: React.FC<ModalFooterProps> = ({
  primaryAction,
  secondaryAction,
  testID,
}) => {
  const { hideDividers } = useModalParent();

  if (primaryAction.type !== Button || (secondaryAction && primaryAction.type !== Button)) {
    // eslint-disable-next-line no-console
    console.error('Modal footer actions need to be CDS Button component');

    return null;
  }

  return (
    <HStack
      spacingHorizontal={3}
      spacingVertical={2}
      justifyContent="flex-end"
      width="100%"
      gap={2}
      dangerouslySetClassName={modalFooterClassName}
      testID={testID}
      borderedTop={!hideDividers}
    >
      {secondaryAction}
      {primaryAction}
    </HStack>
  );
};
