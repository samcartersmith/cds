import React, { forwardRef, memo, useMemo } from 'react';
import { View } from 'react-native';
import { pageHeaderHeight } from '@cbhq/cds-common2/tokens/page';
import { PageHeaderBaseProps } from '@cbhq/cds-common2/types/PageBaseProps';

import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

export const PageHeader = memo(
  forwardRef(function PageHeader(
    { start, title, end, ...props }: PageHeaderBaseProps,
    ref: React.ForwardedRef<View>,
  ) {
    const isMultiRow = useMemo(() => Boolean(start && title && end), [start, end, title]);

    return (
      <VStack ref={ref} accessibilityRole="header" {...props}>
        <HStack
          alignItems="center"
          height={pageHeaderHeight}
          justifyContent={isMultiRow ? 'space-between' : undefined}
          paddingY={1}
        >
          {!!start && <Box paddingX={3}>{start}</Box>}
          {!isMultiRow && (
            <Box flexGrow={1} paddingEnd={end ? 0 : 3} paddingStart={start ? 0 : 3}>
              {typeof title === 'string' ? <Text font="title1">{title}</Text> : title}
            </Box>
          )}
          {!!end && <Box paddingX={3}>{end}</Box>}
        </HStack>
        {isMultiRow && (
          <Box paddingX={3}>
            {typeof title === 'string' ? <Text font="title1">{title}</Text> : title}
          </Box>
        )}
      </VStack>
    );
  }),
);
