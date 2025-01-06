import React, { memo, useContext } from 'react';
import { InputVariant, SharedAccessibilityProps } from '@cbhq/cds-common2';
import { ThemeVars } from '@cbhq/cds-common2/new/vars';
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
  compact?: boolean;
} & Omit<IconProps, 'size'> &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'>;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'iconPrimary',
  positive: 'iconPositive',
  negative: 'iconNegative',
  foreground: 'iconForeground',
  foregroundMuted: 'iconForegroundMuted',
  secondary: 'backgroundSecondary',
};

export const InputIcon = memo(function InputIcon({
  disableInheritFocusStyle = false,
  testID,
  color = 'iconForeground',
  compact,
  accessibilityLabel,
  accessibilityHint,
  ...props
}: InputIconProps) {
  const variant = useContext(TextInputFocusVariantContext);
  const variantColor = variant ? variantColorMap[variant] : undefined;

  return (
    <Box
      accessibilityHint={accessibilityHint ?? props.name}
      accessibilityLabel={accessibilityLabel ?? props.name}
      paddingX={compact ? 1 : 2}
      testID={testID}
    >
      <Icon color={disableInheritFocusStyle ? color : variantColor ?? color} size="s" {...props} />
    </Box>
  );
});
