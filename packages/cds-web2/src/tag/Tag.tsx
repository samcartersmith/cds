import React, { forwardRef, memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { horizontalSpacing, spacing, tagColorMap } from '@cbhq/cds-common2/tokens/tags';
import { TagBaseProps } from '@cbhq/cds-common2/types/TagBaseProps';

import { useTheme } from '../hooks/useTheme';
import { Box, BoxProps } from '../layout';
import { TextCaption, TextLabel1 } from '../typography';

const tagSpacingStyles = {
  informational: css`
    padding: 2px ${spacing[horizontalSpacing.informational]};
  `,
  promotional: css`
    padding: 2px ${spacing[horizontalSpacing.promotional]};
  `,
};

type TagProps = TagBaseProps & Omit<BoxProps<'div'>, 'background' | 'backgroundColor' | 'children'>;

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
    const spacingClassName = useMemo(() => tagSpacingStyles[intent], [intent]);
    const { background, foreground } = useMemo(
      () => tagColorMap[intent][colorScheme],
      [colorScheme, intent],
    );
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

    const Text = useMemo(() => (intent === 'informational' ? TextLabel1 : TextCaption), [intent]);
    const intentBorderRadius = useMemo(() => (intent === 'informational' ? 100 : 1000), [intent]);

    return (
      <Box
        ref={forwardedRef}
        alignItems={alignItems}
        background="bg"
        borderRadius={intentBorderRadius}
        className={`${tagStaticClassName} ${spacingClassName}`}
        data-testid={testID}
        display={display}
        justifyContent={justifyContent}
        style={boxStyles}
        testID={testID}
        {...props}
      >
        <Text as="span" data-testid={`${testID}--text`} overflow="truncate" style={textStyles}>
          {children}
        </Text>
      </Box>
    );
  }),
);
