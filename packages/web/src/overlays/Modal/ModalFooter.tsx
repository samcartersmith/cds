import React from 'react';
import { ButtonBaseProps, SharedProps } from '@cbhq/cds-common';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';

import { Button } from '../../buttons';
import { HStack } from '../../layout';
import { OnPress } from '../../system';

import { modalFooterClassName } from './modalStyles';

export type ModalFooterProps = {
  /** Primary action button */
  primaryAction: NonNullable<React.ReactElement<ButtonBaseProps & { onPress?: OnPress }>>;
  /** Secondary action button */
  secondaryAction?: React.ReactElement<ButtonBaseProps & { onPress?: OnPress }>;
} & SharedProps;

export const ModalFooter = ({ primaryAction, secondaryAction, testID }: ModalFooterProps) => {
  const { hideDividers } = useModalParent();

  if (primaryAction.type !== Button || (secondaryAction && primaryAction.type !== Button)) {
    console.error('Modal footer actions need to be CDS Button component');

    return null;
  }

  return (
    <HStack
      borderedTop={!hideDividers}
      className={modalFooterClassName}
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
