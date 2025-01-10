import React, { memo, useContext } from 'react';
import { IconButtonVariant } from '@cbhq/cds-common2/types/IconButtonBaseProps';
import { SharedProps } from '@cbhq/cds-common2/types/SharedProps';

import { IconButton, IconButtonProps } from '../buttons/IconButton';
import { Box } from '../layout/Box';

import { TextInputFocusVariantContext } from './context';

export type InputIconButtonProps = {
  /**
   * If set to true, when parent input is focused, the icon will match the color of the focus state
   * @default false
   * */
  disableInheritFocusStyle?: boolean;
} & IconButtonProps &
  SharedProps;

const secondaryVariants = new Set(['positive', 'negative', 'foreground']);

export const InputIconButton = memo(function InputIconButton({
  disableInheritFocusStyle = false,
  testID,
  variant = 'primary',
  accessibilityLabel,
  accessibilityHint,
  ...props
}: InputIconButtonProps) {
  const contextVariant = useContext(TextInputFocusVariantContext) ?? variant;

  const transformedVariant = secondaryVariants.has(contextVariant) ? 'primary' : contextVariant;

  return (
    <Box paddingLeft={1} paddingRight={0.5} testID={testID}>
      <IconButton
        transparent
        accessibilityHint={accessibilityHint ?? props.name}
        accessibilityLabel={accessibilityLabel ?? props.name}
        variant={disableInheritFocusStyle ? variant : (transformedVariant as IconButtonVariant)}
        {...props}
      />
    </Box>
  );
});
