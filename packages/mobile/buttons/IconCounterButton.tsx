import React, { ForwardedRef, forwardRef, memo } from 'react';
import { View } from 'react-native';
import { IconCounterButtonBaseProps } from '@cbhq/cds-common';
import { formatCount } from '@cbhq/cds-common/utils/formatCount';
import { UiIconName } from '@cbhq/cds-icons';

import { Icon } from '../icons';
import { HStack } from '../layout';
import { Pressable, PressableProps } from '../system';
import { TextLabel1 } from '../typography';

export type IconCounterButtonProps = IconCounterButtonBaseProps & PressableProps;

export const IconCounterButton = memo(
  forwardRef(function IconCounterButton(
    {
      icon,
      iconSize = 's',
      count = 0,
      color = 'foreground',
      dangerouslySetColor,
      ...props
    }: IconCounterButtonProps,
    ref: ForwardedRef<View>,
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
          {count > 0 ? <TextLabel1 mono>{formatCount(count)}</TextLabel1> : null}
        </HStack>
      </Pressable>
    );
  }),
);
