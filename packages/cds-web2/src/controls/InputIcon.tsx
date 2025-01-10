import React, { forwardRef, memo, useContext } from 'react';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { InputVariant } from '@cbhq/cds-common2/types/InputBaseProps';
import { SharedProps } from '@cbhq/cds-common2/types/SharedProps';

import { Icon, IconProps } from '../icons/Icon';
import { Box } from '../layout/Box';

import { TextInputFocusVariantContext } from './context';

export type InputIconProps = {
  /**
   * If set to true, when parent input is focused, the icon will match the color of the focus state
   * @default false
   * */
  disableInheritFocusStyle?: boolean;
} & Omit<IconProps, 'size'> &
  SharedProps;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'iconPrimary',
  positive: 'iconPositive',
  negative: 'iconNegative',
  foreground: 'iconForeground',
  foregroundMuted: 'iconForegroundMuted',
  secondary: 'backgroundSecondary',
};

export const InputIcon = memo(
  forwardRef(
    (
      {
        disableInheritFocusStyle = false,
        testID,
        color = 'textForeground',
        ...props
      }: InputIconProps,
      ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const variant = useContext(TextInputFocusVariantContext);
      const variantColor = variant ? variantColorMap[variant] : undefined;

      return (
        <Box paddingX={2} testID={testID}>
          <Icon
            color={disableInheritFocusStyle ? color : variantColor ?? color}
            size="s"
            {...props}
            ref={ref}
          />
        </Box>
      );
    },
  ),
);
