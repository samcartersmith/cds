import React, { useContext, memo, forwardRef, ForwardedRef } from 'react';
import { IconButtonVariant } from '@cbhq/cds-common/types/IconButtonBaseProps';
import { SharedProps } from '@cbhq/cds-common/types/SharedProps';
import { Box } from '../layout/Box';
import { IconButton, IconButtonProps } from '../buttons/IconButton';
import { TextInputFocusVariantContext } from './context';

const secondaryVariants = new Set(['positive', 'negative', 'foreground']);

export type InputIconButtonProps = {
  /**
   * If set to true, when parent input is focused, the icon will match the color of the focus state
   * @default false
   * */
  disableInheritFocusStyle?: boolean;
} & IconButtonProps &
  SharedProps;

export const InputIconButton = memo(
  forwardRef(function InputIconButton(
    {
      disableInheritFocusStyle = false,
      testID,
      variant = 'primary',
      ...props
    }: InputIconButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) {
    const contextVariant = useContext(TextInputFocusVariantContext) ?? variant;

    const transformedVariant = secondaryVariants.has(contextVariant) ? 'primary' : contextVariant;

    return (
      <Box spacingStart={1} spacingEnd={0.5} testID={testID}>
        <IconButton
          ref={ref}
          transparent
          variant={disableInheritFocusStyle ? variant : (transformedVariant as IconButtonVariant)}
          {...props}
        />
      </Box>
    );
  }),
);
