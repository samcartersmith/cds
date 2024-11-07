import React, { forwardRef, memo } from 'react';
import { ContentCardFooterBaseProps } from '@cbhq/cds-common';

import { BoxElement, HStack, HStackProps } from '../../layout';

export type ContentCardFooterProps = ContentCardFooterBaseProps & HStackProps<BoxElement>;

export const ContentCardFooter = memo(
  forwardRef(
    ({ testID, children, ...props }: ContentCardFooterProps, ref: React.Ref<HTMLElement>) => (
      <HStack ref={ref} justifyContent="space-between" testID={testID} {...props}>
        {children}
      </HStack>
    ),
  ),
);
