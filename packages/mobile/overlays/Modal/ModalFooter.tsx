import React, { Fragment } from 'react';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';
import { ModalFooterBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';

import { ButtonGroup, ButtonGroupProps } from '../../buttons';
import { Box } from '../../layout';

export type ModalFooterProps = Pick<ButtonGroupProps, 'vertical' | 'direction'> &
  ModalFooterBaseProps;

export const ModalFooter = ({
  primaryAction,
  secondaryAction,
  vertical,
  direction = 'horizontal',
  testID,
}: ModalFooterProps) => {
  const { hideDividers = false } = useModalParent();
  const actions = [secondaryAction, primaryAction].filter(Boolean);
  const isVertical = direction === 'vertical' || vertical;

  // reverse actions order when stacked
  if (isVertical) {
    actions.reverse();
  }

  return (
    <Box spacingHorizontal={3} spacingVertical={2} testID={testID} borderedTop={!hideDividers}>
      <ButtonGroup accessibilityLabel="Group" block={!isVertical} direction={direction}>
        {actions.map((action, i) => (
          // actions are stable so should be fine to use index as key
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={i}>{action}</Fragment>
        ))}
      </ButtonGroup>
    </Box>
  );
};
