import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import type { ThemeVars } from '@cbhq/cds-common2/core/theme';
import type { IconSize, ValidateProps } from '@cbhq/cds-common2/types';
import { formatCount } from '@cbhq/cds-common2/utils/formatCount';
import { UiIconName } from '@cbhq/cds-icons';

import { Icon } from '../icons';
import { HStack } from '../layout';
import { Pressable, PressableProps } from '../system';
import { Text } from '../typography/Text';

export type IconCounterButtonBaseProps = {
  /** Name of the icon or ReactNode */
  icon: Exclude<React.ReactNode, 'string'> | UiIconName;
  /** Size for given icon. */
  iconSize?: IconSize;
  count?: number;
  /** Color of the icon */
  color?: ThemeVars.Color;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
};

export type IconCounterButtonProps = IconCounterButtonBaseProps & PressableProps;

export const IconCounterButton = memo(
  forwardRef(function IconCounterButton(
    {
      icon,
      iconSize = 's',
      count = 0,
      color = 'fg',
      dangerouslySetColor,
      ...props
    }: IconCounterButtonProps,
    ref: React.ForwardedRef<View>,
  ) {
    return (
      <Pressable
        ref={ref}
        background="transparent"
        {...(props satisfies ValidateProps<
          typeof props,
          Omit<IconCounterButtonProps, keyof PressableProps>
        >)}
      >
        <HStack alignItems="center" gap={1}>
          {typeof icon === 'string' ? (
            <Icon
              color={color}
              dangerouslySetColor={dangerouslySetColor}
              name={icon as UiIconName}
              size={iconSize}
            />
          ) : (
            icon
          )}
          {count > 0 ? (
            <Text mono font="label1">
              {formatCount(count)}
            </Text>
          ) : null}
        </HStack>
      </Pressable>
    );
  }),
);
