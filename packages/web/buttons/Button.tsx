import React, { forwardRef, useMemo } from 'react';
import { ButtonProps as ReakitButtonProps } from 'reakit/Button';
import { ButtonBaseProps } from '@cbhq/cds-common';
import { useButtonBorderRadius } from '@cbhq/cds-common/hooks/useButtonBorderRadius';
import { useButtonIconSize } from '@cbhq/cds-common/hooks/useButtonIconSize';
import { useButtonSpacing as useSharedButtonSpacing } from '@cbhq/cds-common/hooks/useButtonSpacing';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';

import { useButtonSpacing } from '../hooks/useButtonSpacing';
import { useFlushStyles } from '../hooks/useFlushStyles';
import { Icon } from '../icons/Icon';
import { MaterialSpinner } from '../loaders/MaterialSpinner';
import * as foregroundColors from '../styles/foregroundColor';
import { Pressable, PressableProps } from '../system/Pressable';
import { useFeatureFlag } from '../system/useFeatureFlag';
import { TextHeadline } from '../typography/TextHeadline';
import { cx } from '../utils/linaria';

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
    flush,
    type = 'button',
    variant = 'primary',
    noScaleOnPress,
    ...props
  }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const hasIcon = Boolean(startIcon ?? endIcon);
  const hasFrontier = useFeatureFlag('frontierButton');
  const iconSize = useButtonIconSize(compact);
  const spacing = useSharedButtonSpacing({ flush, compact, startIcon, endIcon });
  const flushStyles = useFlushStyles({ flush, spacing });
  const spacingClass = useButtonSpacing({ flush, compact, startIcon, endIcon });
  const height = useInteractableHeight(compact);
  const borderRadius = useButtonBorderRadius(compact);
  const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);
  const style = useMemo(
    () => ({ '--interactable-height': `${height}px`, ...flushStyles }),
    [height, flushStyles],
  );

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
        hasFrontier && hasIcon && buttonStyles.frontierButton,
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
      noScaleOnPress={noScaleOnPress}
    >
      {startIcon && (
        <span className={hasFrontier ? buttonStyles.frontierStartIcon : buttonStyles.startIcon}>
          <Icon name={startIcon} size={iconSize} color={color} />
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
        <span className={hasFrontier ? buttonStyles.frontierEndIcon : buttonStyles.endIcon}>
          <Icon name={endIcon} size={iconSize} color={color} />
        </span>
      )}
    </Pressable>
  );
});
