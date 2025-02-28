import React, { forwardRef, memo, useContext } from 'react';
import { InputVariant } from '@cbhq/cds-common2/types/InputBaseProps';

import { type IconButtonVariant, IconButton, IconButtonProps } from '../buttons/IconButton';
import { Box } from '../layout/Box';

import { TextInputFocusVariantContext } from './context';

export const variantTransformMap: Record<InputVariant, IconButtonVariant> = {
  positive: 'primary',
  negative: 'primary',
  foreground: 'primary',
  primary: 'primary',
  foregroundMuted: 'foregroundMuted',
  secondary: 'secondary',
};

export type InputIconButtonProps = {
  /**
   * If set to true, when parent input is focused, the icon will match the color of the focus state
   * @default false
   * */
  disableInheritFocusStyle?: boolean;
} & IconButtonProps<'button'>;

export const InputIconButton = memo(
  forwardRef(function InputIconButton(
    {
      disableInheritFocusStyle = false,
      testID,
      variant = 'primary',
      ...props
    }: InputIconButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) {
    const contextVariant = useContext(TextInputFocusVariantContext);
    const transformedVariant = contextVariant ? variantTransformMap[contextVariant] : variant;

    return (
      <Box paddingEnd={0.5} paddingStart={1} testID={testID}>
        <IconButton
          ref={ref}
          transparent
          variant={disableInheritFocusStyle ? variant : transformedVariant}
          {...props}
        />
      </Box>
    );
  }),
);
