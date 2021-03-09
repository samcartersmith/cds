import React, { forwardRef, useMemo } from 'react';

import { IconButtonBaseProps, IconButtonVariant, PaletteBackground } from '@cbhq/cds-common';
import { cx } from 'linaria';

import { ButtonProps } from '../buttons/ButtonProps';
import * as buttonStyles from '../buttons/buttonStyles';
import { useInteractable } from '../hooks/useInteractable';
import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { getBorderStyles } from '../styles/borderStyles';
import { getFlexStyles } from '../styles/flexStyles';

const variantMap: Record<IconButtonVariant, PaletteBackground> = {
  primary: 'primary',
  secondary: 'background',
};

export interface IconButtonProps<T extends unknown = unknown>
  extends IconButtonBaseProps,
    Omit<ButtonProps, 'variant' | 'name' | 'children' | 'loading' | 'accessibilityLabel'> {
  renderContainer?: (props: T) => JSX.Element;
}

export const IconButton = forwardRef(
  (
    {
      name,
      renderContainer,
      variant = 'secondary',
      accessibilityLabel = name,
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
    }: IconButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const flexStyles = getFlexStyles({
      alignItems: 'center',
      justifyContent: 'center',
    });

    const borderStyles = getBorderStyles({ bordered: true });

    const { props, className, style } = useInteractable({
      elementType: 'button',
      buttonType: 'button',
      backgroundColor: variantMap[variant],
      scaleOnPress: true,
      isDisabled: disabled,
      onHover,
      onPress,
      ref,
    });

    const iconColor = useMemo(() => (variant === 'primary' ? 'primaryForeground' : 'foreground'), [
      variant,
    ]);

    const enhancedProps = {
      ...props,
      style: {
        ...style,
        color: 'unset',
      },
      className: cx(
        flexStyles,
        borderStyles,
        buttonStyles.iconButton.base,
        buttonStyles.iconButton[variant],
        className
      ),
      children: <Icon name={name} size="s" color={iconColor} />,
    };

    return (
      <Box
        offset={offset}
        offsetBottom={offsetBottom}
        offsetEnd={offsetEnd}
        offsetHorizontal={offsetHorizontal}
        offsetStart={offsetStart}
        offsetTop={offsetTop}
        offsetVertical={offsetVertical}
        spacing={spacing}
        spacingTop={spacingTop}
        spacingBottom={spacingBottom}
        spacingStart={spacingStart}
        spacingEnd={spacingEnd}
        spacingVertical={spacingVertical}
        spacingHorizontal={spacingHorizontal}
      >
        {renderContainer ? (
          renderContainer(enhancedProps)
        ) : (
          <button ref={ref} aria-label={accessibilityLabel} {...enhancedProps} />
        )}
      </Box>
    );
  }
);
