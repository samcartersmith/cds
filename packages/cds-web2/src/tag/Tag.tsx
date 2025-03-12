import React, { forwardRef, memo, useMemo } from 'react';
import {
  tagBorderRadiusMap,
  tagColorMap,
  tagFontMap,
  tagHorizontalSpacing,
} from '@cbhq/cds-common2/tokens/tags';
import type { TagBaseProps } from '@cbhq/cds-common2/types/TagBaseProps';

import { useTheme } from '../hooks/useTheme';
import { type BoxDefaultElement, type BoxProps, Box } from '../layout/Box';
import { Text } from '../typography/Text';

type TagProps = TagBaseProps &
  Omit<BoxProps<BoxDefaultElement>, 'background' | 'backgroundColor' | 'children'>;

export const tagStaticClassName = 'cds-tag';
export const Tag = memo(
  forwardRef<HTMLDivElement, TagProps>(function Tag(
    {
      children,
      intent = 'informational',
      colorScheme = 'blue',
      background: customBackground,
      color: customColor,
      display = 'inline-flex',
      alignItems = 'center',
      justifyContent = 'center',
      testID = tagStaticClassName,
      ...props
    },
    forwardedRef: React.ForwardedRef<HTMLDivElement>,
  ) {
    const theme = useTheme();
    const { background, foreground } = tagColorMap[intent][colorScheme];
    const boxStyles = useMemo(
      () => ({
        backgroundColor: `rgb(${theme.spectrum[customBackground ?? background]})`,
      }),
      [background, customBackground, theme.spectrum],
    );
    const textStyles = useMemo(
      () => ({
        color: `rgb(${theme.spectrum[customColor ?? foreground]})`,
      }),
      [foreground, customColor, theme.spectrum],
    );

    return (
      <Box
        ref={forwardedRef}
        alignItems={alignItems}
        background="bg"
        borderRadius={tagBorderRadiusMap[intent]}
        className={tagStaticClassName}
        data-testid={testID}
        display={display}
        justifyContent={justifyContent}
        paddingX={tagHorizontalSpacing[intent]}
        paddingY={0.25}
        style={boxStyles}
        testID={testID}
        {...props}
      >
        <Text
          as="span"
          font={tagFontMap[intent]}
          overflow="truncate"
          style={textStyles}
          testID={`${testID}--text`}
        >
          {children}
        </Text>
      </Box>
    );
  }),
);
