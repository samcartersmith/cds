import React, { useContext, memo } from 'react';
import { SharedProps } from '@cbhq/cds-common/types/SharedProps';
import { Icon } from '../icons';
import { Box } from '../layout/Box';
import { IconProps } from '../icons/IconProps';
import { TextInputFocusVariantContext } from './context';

export type InputIconProps = {
  /**
   * If set to true, when parent input is focused, the icon will match the color of the focus state
   * @default false
   * */
  disableInheritFocusStyle?: boolean;
} & Omit<IconProps, 'size'> &
  SharedProps;

export const InputIcon = memo(
  ({
    disableInheritFocusStyle = false,
    testID,
    color = 'foreground',
    ...props
  }: InputIconProps) => {
    const variant = useContext(TextInputFocusVariantContext) ?? color;

    return (
      <Box spacingHorizontal={2} testID={testID}>
        <Icon color={disableInheritFocusStyle ? color : variant} size="s" {...props} />
      </Box>
    );
  },
);
