import React, { forwardRef, memo, MouseEvent, useCallback, useMemo } from 'react';
import { ForwardedRef, IconButtonVariant, NavigationIconName, useToggler } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';

import { NavigationIcon } from '../icons/NavigationIcon';
import { getFlexStyles } from '../styles/flex';
import { focusVisibleClassName } from '../styles/focus';
import { Pressable } from '../system/Pressable';
import { cx } from '../utils/linaria';

import { iconButton } from './buttonStyles';
import { IconButtonProps } from './IconButton';

type NavigationButtonProps = {
  active?: boolean;
  name: NavigationIconName;
  variant?: Omit<IconButtonVariant, 'primary'>;
} & Omit<IconButtonProps, 'name' | 'variant' | 'transparent'>;

const flexStyles = getFlexStyles({
  alignItems: 'center',
  justifyContent: 'center',
});

export const NavigationIconButton = memo(
  forwardRef(function NavigationIconButton(
    {
      active,
      accessibilityLabel,
      as,
      compact = true,
      disabled = false,
      name,
      onPress,
      to,
      variant = 'secondary',
      ...props
    }: NavigationButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) {
    const [isActive, toggleActiveState] = useToggler(active);

    const height = useInteractableHeight(compact);
    const { backgroundColor, borderColor } = useButtonVariant(
      variant as IconButtonVariant,
      // disable transparency
      false,
      // enable frontier colors
      true,
    );
    const style = useMemo(() => ({ '--interactable-height': `${height}px` }), [height]);
    const iconSize = compact ? 's' : 'm';

    const handlePress = useCallback(
      (event: MouseEvent<Element>) => {
        toggleActiveState.toggleOn();
        onPress?.(event);
      },
      [toggleActiveState, onPress],
    );

    const handleBlur = useCallback(() => {
      toggleActiveState.toggleOff();
    }, [toggleActiveState]);

    return (
      <Pressable
        borderRadius="round"
        borderColor={borderColor}
        borderWidth="button"
        onPress={handlePress}
        noScaleOnPress
        aria-label={accessibilityLabel}
        {...props}
        as={as}
        backgroundColor={backgroundColor}
        className={cx(flexStyles, iconButton, isActive ? focusVisibleClassName : null)}
        ref={ref}
        disabled={disabled}
        style={style}
        onBlur={handleBlur}
      >
        <NavigationIcon name={name} size={iconSize} />
      </Pressable>
    );
  }),
);
