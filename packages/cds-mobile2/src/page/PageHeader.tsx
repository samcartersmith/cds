import React, { forwardRef, memo, useMemo } from 'react';
import { View } from 'react-native';
import { useScaleConditional } from '@cbhq/cds-common2/scale/useScaleConditional';
import { pageHeaderHeight } from '@cbhq/cds-common2/tokens/page';
import { PageHeaderBaseProps } from '@cbhq/cds-common2/types/PageBaseProps';

import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { TextTitle1 } from '../typography/TextTitle1';

export const PageHeader = memo(
  forwardRef(function PageHeader(
    { start, title, end, ...props }: PageHeaderBaseProps,
    ref: React.ForwardedRef<View>,
  ) {
    const headerHeight = useScaleConditional(pageHeaderHeight);
    const isMultiRow = useMemo(() => Boolean(start && title && end), [start, end, title]);

    return (
      <VStack ref={ref} accessibilityRole="header" {...props}>
        <HStack
          alignItems="center"
          height={headerHeight}
          justifyContent={isMultiRow ? 'space-between' : undefined}
          paddingY={1}
        >
          {!!start && <Box paddingX={3}>{start}</Box>}
          {!isMultiRow && (
            <Box flexGrow={1} paddingRight={end ? 0 : 3} paddingLeft={start ? 0 : 3}>
              {typeof title === 'string' ? <TextTitle1>{title}</TextTitle1> : title}
            </Box>
          )}
          {!!end && <Box paddingX={3}>{end}</Box>}
        </HStack>
        {isMultiRow && (
          <Box paddingX={3}>
            {typeof title === 'string' ? <TextTitle1>{title}</TextTitle1> : title}
          </Box>
        )}
      </VStack>
    );
  }),
);
