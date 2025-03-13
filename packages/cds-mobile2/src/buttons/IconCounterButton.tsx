import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { IconCounterButtonBaseProps } from '@cbhq/cds-common2';
import { formatCount } from '@cbhq/cds-common2/utils/formatCount';
import { UiIconName } from '@cbhq/cds-icons';

import { Icon } from '../icons';
import { HStack } from '../layout';
import { Pressable, PressableProps } from '../system';
import { Text } from '../typography/Text';

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
      <Pressable ref={ref} background="transparent" {...props}>
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
