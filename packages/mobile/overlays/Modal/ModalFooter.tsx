import React, { Fragment } from 'react';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';
import { ModalFooterBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';

import { ButtonGroup, ButtonGroupProps } from '../../buttons';
import { Box } from '../../layout';

export type ModalFooterProps = Pick<ButtonGroupProps, 'vertical'> & ModalFooterBaseProps;

export const ModalFooter = ({
  primaryAction,
  secondaryAction,
  vertical,
  testID,
}: ModalFooterProps) => {
  const { hideDividers = false } = useModalParent();
  const actions = [secondaryAction, primaryAction].filter(Boolean);

  // reverse actions order when stacked
  if (vertical) {
    actions.reverse();
  }

  return (
    <Box spacingHorizontal={3} spacingVertical={2} testID={testID} borderedTop={!hideDividers}>
      {/* eslint-disable-next-line react-native-a11y/has-accessibility-hint */}
      <ButtonGroup accessibilityLabel="Group" block={!vertical} vertical={vertical}>
        {actions.map((action, i) => (
          // actions are stable so should be fine to use index as key
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={i}>{action}</Fragment>
        ))}
      </ButtonGroup>
    </Box>
  );
};
