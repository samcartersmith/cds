import React, { forwardRef, useMemo } from 'react';
import { ButtonBaseProps } from '@cbhq/cds-common';
import { useButtonBorderRadius } from '@cbhq/cds-common/hooks/useButtonBorderRadius';
import { useButtonIconSize } from '@cbhq/cds-common/hooks/useButtonIconSize';
import { useButtonSpacing as useSharedButtonSpacing } from '@cbhq/cds-common/hooks/useButtonSpacing';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';

import { useButtonSpacing } from '../hooks/useButtonSpacing';
import { useFlushStyles } from '../hooks/useFlushStyles';
import { Icon } from '../icons/Icon';
import { Spinner } from '../loaders';
import * as foregroundColors from '../styles/foregroundColor';
import { Pressable, PressableProps } from '../system/Pressable';
import { TextHeadline } from '../typography/TextHeadline';
import { cx } from '../utils/linaria';

import * as buttonStyles from './buttonStyles';

type ButtonA11yProps = {
  disabled?: boolean;
  focusable?: boolean;
};

export type ButtonProps = ButtonBaseProps &
  ButtonA11yProps &
  PressableProps &
  React.ButtonHTMLAttributes<any> &
  React.HTMLAttributes<any> & { ref?: React.Ref<any> };

const BaseButton = forwardRef(function Button(
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
    numberOfLines,
    start,
    end,
    ...props
  }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const hasIcon = Boolean(startIcon ?? endIcon);
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

  const spinnerStyle = useMemo(() => {
    return {
      width: '24px',
      height: '24px',
      border: '2px solid',
      borderTopColor: 'var(--transparent)',
      borderRightColor: 'var(--transparent)',
      borderLeftColor: 'var(--transparent)',
    };
  }, []);

  return (
    <Pressable
      aria-label={accessibilityLabel ?? (loading ? 'Loading' : undefined)}
      {...props}
      ref={ref}
      background={backgroundColor}
      block={block}
      borderColor={borderColor}
      borderRadius={borderRadius}
      borderWidth="button"
      className={cx(
        foregroundColors[color],
        buttonStyles.button,
        numberOfLines && buttonStyles.unsetNoWrap,
        hasIcon && buttonStyles.buttonWithIcon,
        compact && buttonStyles.buttonCompact,
        block && buttonStyles.buttonBlock,
        spacingClass,
      )}
      disabled={disabled}
      loading={loading}
      noScaleOnPress={noScaleOnPress}
      onPress={onPress}
      style={style}
      to={to}
      transparentWhileInactive={transparent}
      type={type}
    >
      {start ? (
        <span className={buttonStyles.startIcon}>{start}</span>
      ) : startIcon ? (
        <span className={buttonStyles.startIcon}>
          <Icon color={color} name={startIcon} size={iconSize} />
        </span>
      ) : null}

      <span className={buttonStyles.positionRelative}>
        {loading && (
          <span className={buttonStyles.spinnerLoader}>
            <Spinner color={color} size={buttonStyles.spinnerHeight} style={spinnerStyle} />
          </span>
        )}
        <TextHeadline as="span" color={color} numberOfLines={numberOfLines}>
          <span className={cx(loading && buttonStyles.visibilityHidden)}>{children}</span>
        </TextHeadline>
      </span>

      {end ? (
        <span className={buttonStyles.endIcon}>{end}</span>
      ) : endIcon ? (
        <span className={buttonStyles.endIcon}>
          <Icon color={color} name={endIcon} size={iconSize} />
        </span>
      ) : null}
    </Pressable>
  );
});

// We need to override the props, otherwise they are not compatible with
// TypeScript 4.7's new "nodenext" module resolution.
export const Button = BaseButton as React.ForwardRefExoticComponent<ButtonProps>;
