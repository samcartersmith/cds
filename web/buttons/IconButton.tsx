import React, { forwardRef } from 'react';

import { IconButtonBaseProps } from '@cbhq/cds-common';
import { useButtonVariant } from '@cbhq/cds-common/hooks/useButtonVariant';
import { cx } from 'linaria';
import { Button as ReakitButton } from 'reakit/Button';

import * as buttonStyles from '../buttons/buttonStyles';
import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { getFlexStyles } from '../styles/flex';
import { Pressable, PressableProps } from '../system/Pressable';

export interface IconButtonProps extends IconButtonBaseProps, PressableProps {
  renderContainer?: (props: React.HTMLAttributes<HTMLElement>) => JSX.Element;
  dangerouslySetClassName?: string;
}

export const IconButton = forwardRef(
  (
    {
      accessibilityLabel,
      disabled = false,
      name,
      onPress,
      renderContainer,
      testID,
      transparent,
      variant = 'secondary',
      dangerouslySetClassName,
    }: IconButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const flexStyles = getFlexStyles({
      alignItems: 'center',
      justifyContent: 'center',
    });
    const { color, backgroundColor, borderColor } = useButtonVariant(variant, transparent);

    const enhancedProps = {
      'aria-label': accessibilityLabel,
      'data-test-id': testID,
      className: cx(flexStyles, buttonStyles.iconButton),
      children: <Icon name={name} size="s" color={color} />,
      disabled,
      ref,
      onClick: onPress,
    };

    return (
      <Box dangerouslySetClassName={dangerouslySetClassName}>
        {renderContainer ? (
          renderContainer(enhancedProps)
        ) : (
          <Pressable
            {...enhancedProps}
            as={ReakitButton}
            transparentWhileInactive={transparent}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            borderRadius="round"
            borderWidth="button"
          />
        )}
      </Box>
    );
  }
);
