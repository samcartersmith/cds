import React, { forwardRef } from 'react';

import { PaletteBackground, SpacingProps, OffsetProps, IconName } from '@cbhq/cds-common';
import { cx } from 'linaria';

import { useInteractable } from '../hooks/useInteractable';
import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Icon } from '../icons/Icon';
import { getBorderStyles } from '../styles/borderStyles';
import { getFlexStyles } from '../styles/flexStyles';
import { ButtonProps } from './ButtonProps';
import * as buttonStyles from './buttonStyles';

export type IconButtonVariant = 'primary' | 'secondary';
const variantMap: Record<IconButtonVariant, PaletteBackground> = {
  primary: 'primary',
  secondary: 'background',
};

export interface IconButtonProps<T extends unknown = unknown>
  extends Omit<ButtonProps, 'variant' | 'children'>,
    SpacingProps,
    OffsetProps {
  name: IconName;
  variant?: IconButtonVariant;
  renderContainer?: (props: T) => JSX.Element;
}

export const IconButton = forwardRef(
  (
    {
      name,
      renderContainer,
      variant = 'secondary',
      spacing,
      spacingTop,
      spacingBottom,
      spacingStart,
      spacingEnd,
      spacingVertical,
      spacingHorizontal,
      offset,
      offsetBottom,
      offsetEnd,
      offsetHorizontal,
      offsetStart,
      offsetTop,
      offsetVertical,
      onHover,
      onPress,
      disabled = false,
      loading = false,
    }: IconButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const flexStyles = getFlexStyles({
      alignItems: 'center',
      justifyContent: 'center',
    });

    const borderStyles = getBorderStyles({ bordered: true });
    const spacingStyles = useSpacingStyles({
      spacing,
      spacingTop,
      spacingBottom,
      spacingStart,
      spacingEnd,
      spacingVertical,
      spacingHorizontal,
    });

    const offsetStyles = useOffsetStyles({
      offset,
      offsetBottom,
      offsetEnd,
      offsetHorizontal,
      offsetStart,
      offsetTop,
      offsetVertical,
    });

    const { props, className, style } = useInteractable({
      elementType: 'button',
      buttonType: 'button',
      backgroundColor: variantMap[variant],
      scaleOnPress: true,
      isDisabled: disabled || loading,
      onHover,
      onPress,
      ref,
    });

    const enhancedProps = {
      ...props,
      style: {
        ...style,
        color: 'unset',
      },
      className: cx(
        flexStyles,
        spacingStyles,
        offsetStyles,
        borderStyles,
        buttonStyles.iconButton.base,
        buttonStyles.iconButton[variant],
        className
      ),
      children: <Icon name={name} size="s" dangerouslySetColor="currentColor" />,
    };

    if (renderContainer) {
      return renderContainer(enhancedProps);
    } else {
      return <button ref={ref} {...enhancedProps} />;
    }
  }
);
