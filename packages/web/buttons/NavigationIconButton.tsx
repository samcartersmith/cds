import React, { forwardRef, memo, MouseEvent, useCallback } from 'react';
import { ForwardedRef, IconButtonVariant, NavigationIconName, useToggler } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';

import { NavigationIcon } from '../icons/NavigationIcon';
import { getFlexStyles } from '../layout/getFlexStyles';
import { focusVisibleClassName } from '../styles/focus';
import { Pressable } from '../system/Pressable';
import { cx } from '../utils/linaria';

import { iconButton } from './buttonStyles';
import { IconButtonProps } from './IconButton';
import { useIconButtonStyles } from './useIconButtonStyles';

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

    const styles = useIconButtonStyles(compact);
    const { backgroundColor, borderColor } = useButtonVariant(
      variant as IconButtonVariant,
      // disable transparency
      false,
      // enable frontier colors
      true,
    );
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
        borderRadius="roundedFull"
        borderColor={borderColor}
        borderWidth="button"
        onPress={handlePress}
        noScaleOnPress
        {...props}
        as={as}
        backgroundColor={backgroundColor}
        className={cx(flexStyles, iconButton, isActive ? focusVisibleClassName : null)}
        ref={ref}
        disabled={disabled}
        style={styles}
        onBlur={handleBlur}
      >
        <NavigationIcon name={name} size={iconSize} />
      </Pressable>
    );
  }),
);
