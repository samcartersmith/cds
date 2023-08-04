import React, { memo, useContext } from 'react';
import { SharedAccessibilityProps } from '@cbhq/cds-common';
import { SharedProps } from '@cbhq/cds-common/types/SharedProps';

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

export const InputIcon = memo(function InputIcon({
  disableInheritFocusStyle = false,
  testID,
  color = 'foreground',
  compact,
  accessibilityLabel,
  accessibilityHint,
  ...props
}: InputIconProps) {
  const variant = useContext(TextInputFocusVariantContext) ?? color;

  return (
    <Box
      accessibilityLabel={accessibilityLabel ?? props.name}
      accessibilityHint={accessibilityHint ?? props.name}
      spacingHorizontal={compact ? 1 : 2}
      testID={testID}
    >
      <Icon color={disableInheritFocusStyle ? color : variant} size="s" {...props} />
    </Box>
  );
});
