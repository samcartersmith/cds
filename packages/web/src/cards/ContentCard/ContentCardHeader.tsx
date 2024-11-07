import React, { forwardRef, memo } from 'react';
import { ContentCardHeaderBaseProps } from '@cbhq/cds-common';

import { BoxElement, HStack, HStackProps } from '../../layout';
import { Avatar } from '../../media';
import { TextLabel1, TextLabel2 } from '../../typography';

export type ContentCardHeaderProps = ContentCardHeaderBaseProps & HStackProps<BoxElement>;

export const ContentCardHeader = memo(
  forwardRef(function ContentCardHeader(
    { avatar, title, meta, end, testID, ...props }: ContentCardHeaderProps,
    ref: React.Ref<HTMLElement>,
  ) {
    return (
      <HStack
        ref={ref}
        alignItems="center"
        justifyContent="space-between"
        offsetEnd={1}
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
            <TextLabel1 as="p" numberOfLines={1}>
              {title}
            </TextLabel1>
          ) : (
            title
          )}
          {typeof meta === 'string' ? (
            <TextLabel2 as="span" color="foregroundMuted" numberOfLines={1}>
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
