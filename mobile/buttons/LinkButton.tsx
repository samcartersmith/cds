import React, { useMemo, memo } from 'react';

import {
  useLinkButtonVariant,
  LinkButtonVariant,
} from '@cbhq/cds-common/hooks/useLinkButtonVariant';
import { View } from 'react-native';

import { useButtonSpacing } from '../hooks/useButtonSpacing';
import { Pressable } from '../system/Pressable';
import { TextHeadline } from '../typography/TextHeadline';
import { ButtonProps, styles } from './Button';

export interface LinkButtonProps extends Omit<ButtonProps, 'variant' | 'loading'> {
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: LinkButtonVariant;
}

export const LinkButton = memo(function LinkButton({
  block,
  children,
  compact,
  feedback = 'light',
  variant = 'primary',
  ...props
}: LinkButtonProps) {
  const { color, backgroundColor } = useLinkButtonVariant(variant);
  const spacingStyles = useButtonSpacing(compact);
  const pressableStyles = useMemo(() => [block ? styles.block : styles.inline], [block]);
  const buttonStyles = useMemo(
    () => [styles.button, compact && styles.buttonCompact, spacingStyles],
    [compact, spacingStyles]
  );

  return (
    <Pressable
      transparentWhileInactive
      backgroundColor={backgroundColor}
      borderColor="transparent"
      borderRadius="standard"
      borderWidth="button"
      feedback={feedback}
      style={pressableStyles}
      {...props}
    >
      <View style={buttonStyles}>
        <TextHeadline color={color}>{children}</TextHeadline>
      </View>
    </Pressable>
  );
});
