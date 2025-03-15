import React, { Fragment } from 'react';
import { PressableProps } from 'react-native';
import { ButtonBaseProps, SharedProps } from '@cbhq/cds-common';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';

import { ButtonGroup, ButtonGroupProps } from '../../buttons';
import { Box } from '../../layout';

export type ModalFooterProps = {
  /** Primary action button */
  primaryAction: NonNullable<
    React.ReactElement<ButtonBaseProps & { onPress?: PressableProps['onPress'] }>
  >;
  /** Secondary action button */
  secondaryAction?: React.ReactElement<ButtonBaseProps & { onPress?: PressableProps['onPress'] }>;
} & Pick<ButtonGroupProps, 'direction'> &
  SharedProps;

export const ModalFooter = ({
  primaryAction,
  secondaryAction,
  direction = 'horizontal',
  testID,
}: ModalFooterProps) => {
  const { hideDividers = false } = useModalParent();
  const actions = [secondaryAction, primaryAction].filter(Boolean);
  const isVertical = direction === 'vertical';

  // reverse actions order when stacked
  if (isVertical) {
    actions.reverse();
  }

  return (
    <Box borderedTop={!hideDividers} spacingHorizontal={3} spacingVertical={2} testID={testID}>
      <ButtonGroup block={!isVertical} direction={direction}>
        {actions.map((action, i) => (
          // actions are stable so should be fine to use index as key

          <Fragment key={i}>{action}</Fragment>
        ))}
      </ButtonGroup>
    </Box>
  );
};
