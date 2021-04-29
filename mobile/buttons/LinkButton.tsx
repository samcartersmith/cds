import React, { useMemo, memo } from 'react';

import {
  useLinkButtonVariant,
  LinkButtonVariant,
} from '@cbhq/cds-common/hooks/useLinkButtonVariant';
import { View } from 'react-native';

import { useButtonSpacing } from '../hooks/useButtonSpacing';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Icon } from '../icons/Icon';
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
  endIcon,
  feedback = 'light',
  startIcon,
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
  const startIconStyles = useSpacingStyles({ spacingEnd: 1 });
  const endIconStyles = useSpacingStyles({ spacingStart: 1 });

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
        {startIcon && (
          <View style={startIconStyles}>
            <Icon name={startIcon} size={compact ? 'xs' : 's'} color={color} />
          </View>
        )}

        <TextHeadline color={color} selectable="none" noWrap>
          {children}
        </TextHeadline>

        {endIcon && (
          <View style={endIconStyles}>
            <Icon name={endIcon} size={compact ? 'xs' : 's'} color={color} />
          </View>
        )}
      </View>
    </Pressable>
  );
});
