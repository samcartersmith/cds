import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { ContentCardHeaderBaseProps } from '@cbhq/cds-common2';

import { HStack, HStackProps } from '../../layout';
import { Avatar } from '../../media';
import { TextLabel1, TextLabel2 } from '../../typography';

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
        marginRight={-1}
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
          {typeof title === 'string' ? <TextLabel1 numberOfLines={1}>{title}</TextLabel1> : title}
          {typeof meta === 'string' ? (
            <TextLabel2 color="textForegroundMuted" numberOfLines={1}>
              {meta}
            </TextLabel2>
          ) : (
            meta
          )}
        </HStack>
        {end}
      </HStack>
    );
  }),
);
