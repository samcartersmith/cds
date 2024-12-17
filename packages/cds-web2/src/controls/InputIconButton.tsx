import React, { forwardRef, memo, useContext } from 'react';

import { type IconButtonVariant, IconButton, IconButtonProps } from '../buttons/IconButton';
import { Box } from '../layout/Box';

import { type InputVariant, TextInputFocusVariantContext } from './context';

const variantTransformMap: Record<InputVariant, IconButtonVariant> = {
  textPositive: 'primary',
  textNegative: 'primary',
  textForeground: 'primary',
  textPrimary: 'primary',
  textForegroundMuted: 'foregroundMuted',
  backgroundSecondary: 'secondary',
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
      <Box paddingLeft={1} paddingRight={0.5} testID={testID}>
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
