import React, { forwardRef, memo } from 'react';
import type { IconCounterButtonBaseProps } from '@cbhq/cds-common2/types/IconCounterButtonBaseProps';
import { formatCount } from '@cbhq/cds-common2/utils/formatCount';
import type { UiIconName } from '@cbhq/cds-icons';

import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import { type PressableProps, Pressable } from '../system/Pressable';
import { Text } from '../typography/Text';

export type IconCounterButtonProps = IconCounterButtonBaseProps & PressableProps;

export const IconCounterButton = memo(
  forwardRef(function IconCounterButton(
    {
      icon,
      iconSize = 's',
      count = 0,
      color = 'iconForeground',
      dangerouslySetColor,
      ...props
    }: IconCounterButtonProps,
    ref: React.Ref<Element>,
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
            <Text mono as="p" font="label1">
              {formatCount(count)}
            </Text>
          ) : null}
        </HStack>
      </Pressable>
    );
  }),
);
