import React, { forwardRef } from 'react';

import { IconButtonBaseProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { cx } from 'linaria';

import * as buttonStyles from '../buttons/buttonStyles';
import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { getFlexStyles } from '../styles/flex';
import { InteractableProps, useInteractable } from './useInteractable';

export interface IconButtonProps<T extends unknown = unknown>
  extends IconButtonBaseProps,
    InteractableProps<HTMLButtonElement> {
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
      testID,
    }: IconButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const flexStyles = getFlexStyles({
      alignItems: 'center',
      justifyContent: 'center',
    });

    const { color, ...variantAliases } = useButtonVariant(variant);

    const { props, className, style } = useInteractable({
      ...variantAliases,
      borderRadius: 'round',
      elementType: 'button',
      buttonType: 'button',
      scaleOnPress: true,
      isDisabled: disabled,
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
      className: cx(flexStyles, buttonStyles.iconButton.base, className),
      children: <Icon name={name} size="s" color={color} />,
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
          <button
            ref={ref}
            aria-label={accessibilityLabel}
            data-test-id={testID}
            {...enhancedProps}
          />
        )}
      </Box>
    );
  }
);
