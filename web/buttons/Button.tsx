import React, { forwardRef, useMemo } from 'react';

import { ButtonBaseProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { useButtonBorderRadius } from '@cbhq/cds-common/hooks/useButtonBorderRadius';
import { cx } from 'linaria';
import { ButtonProps as ReakitButtonProps } from 'reakit/Button';

import { useButtonSpacing } from '../hooks/useButtonSpacing';
import { Icon } from '../icons/Icon';
import { MaterialSpinner } from '../loaders/MaterialSpinner';
import * as foregroundColors from '../styles/foregroundColor';
import { Pressable, PressableProps } from '../system/Pressable';
import { TextHeadline } from '../typography/TextHeadline';
import * as buttonStyles from './buttonStyles';

export type ButtonProps = ButtonBaseProps &
  PressableProps &
  Omit<
    ReakitButtonProps,
    | 'children'
    | 'className'
    | 'onClick'
    | 'onClickCapture'
    | 'style'
    | 'unstable_clickOnEnter'
    | 'unstable_clickOnSpace'
    | 'unstable_system'
    | 'wrapElement'
  >;

export const Button = forwardRef(function Button(
  {
    accessibilityLabel,
    block,
    children,
    compact,
    disabled,
    endIcon,
    loading,
    onPress,
    startIcon,
    to,
    transparent,
    type = 'button',
    variant = 'primary',
    ...props
  }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const spacingClass = useButtonSpacing(compact);
  const height = useInteractableHeight(compact);
  const borderRadius = useButtonBorderRadius(compact);
  const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);
  const style = useMemo(() => ({ '--interactable-height': `${height}px` }), [height]);

  return (
    <Pressable
      aria-label={accessibilityLabel}
      {...props}
      transparentWhileInactive={transparent}
      backgroundColor={backgroundColor}
      block={block}
      borderColor={borderColor}
      borderRadius={borderRadius}
      borderWidth="button"
      className={cx(
        foregroundColors[color],
        buttonStyles.button,
        compact && buttonStyles.buttonCompact,
        block && buttonStyles.buttonBlock,
        spacingClass,
      )}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
      style={style}
      type={type}
      ref={ref}
      to={to}
    >
      {startIcon && (
        <span className={buttonStyles.startIcon}>
          <Icon name={startIcon} size={compact ? 'xs' : 's'} color={color} />
        </span>
      )}

      <span className={buttonStyles.positionRelative}>
        {loading && (
          <span className={cx(buttonStyles.centerLoader)}>
            <MaterialSpinner size={buttonStyles.LOADERSIZE} color={color} />
          </span>
        )}
        <TextHeadline as="span" color={color} noWrap>
          <span className={cx(loading && buttonStyles.visibilityHidden)}>{children}</span>
        </TextHeadline>
      </span>

      {endIcon && (
        <span className={buttonStyles.endIcon}>
          <Icon name={endIcon} size={compact ? 'xs' : 's'} color={color} />
        </span>
      )}
    </Pressable>
  );
});
