import React, { Fragment } from 'react';
import { ModalFooterBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';

import { ButtonGroup, ButtonGroupProps } from '../../buttons';
import { Box } from '../../layout';

export type ModalFooterProps = Pick<ButtonGroupProps, 'vertical'> & ModalFooterBaseProps;

export const ModalFooter: React.FC<ModalFooterProps> = ({
  primaryAction,
  secondaryAction,
  vertical,
  testID,
}) => {
  const { hideDividers = false } = useModalParent();
  const actions = [secondaryAction, primaryAction];

  // reverse actions order when stacked
  if (vertical) {
    actions.reverse();
  }

  return (
    <Box spacingHorizontal={3} spacingVertical={2} testID={testID} borderedTop={!hideDividers}>
      {/* eslint-disable-next-line react-native-a11y/has-accessibility-hint */}
      <ButtonGroup accessibilityLabel="Group" block={!vertical} vertical={vertical}>
        {actions.map((action) => (
          <Fragment key={action?.key}>{action}</Fragment>
        ))}
      </ButtonGroup>
    </Box>
  );
};
