import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { ContentCardHeaderBaseProps } from '@cbhq/cds-common2';

import { HStack, HStackProps } from '../../layout';
import { Avatar } from '../../media';
import { Text } from '../../typography/Text';

export type ContentCardHeaderProps = ContentCardHeaderBaseProps & HStackProps;

export const ContentCardHeader = memo(
  forwardRef(function ContentCardHeader(
    { avatar, title, meta, end, testID, ...props }: ContentCardHeaderProps,
    ref: React.ForwardedRef<View>,
  ) {
    return (
      <HStack
        ref={ref}
        alignItems="center"
        justifyContent="space-between"
        marginEnd={-1}
        testID={testID}
        {...props}
      >
        <HStack alignItems="center" gap={1}>
          {typeof avatar === 'string' ? (
            <Avatar
              alt={title as string}
              name={title as string}
              shape="circle"
              size="l"
              src={avatar}
            />
          ) : (
            avatar
          )}
          {typeof title === 'string' ? (
            <Text font="label1" numberOfLines={1}>
              {title}
            </Text>
          ) : (
            title
          )}
          {typeof meta === 'string' ? (
            <Text color="fgMuted" font="label2" numberOfLines={1}>
              {meta}
            </Text>
          ) : (
            meta
          )}
        </HStack>
        {end}
      </HStack>
    );
  }),
);
