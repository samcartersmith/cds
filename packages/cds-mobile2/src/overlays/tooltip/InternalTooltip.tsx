import React, { memo, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  tooltipMaxWidth,
  tooltipPaddingX,
  tooltipPaddingY,
} from '@cbhq/cds-common2/tokens/tooltip';

import { useLayout } from '../../hooks/useLayout';
import { useTheme } from '../../hooks/useTheme';
import { Box } from '../../layout/Box';
import { TextLabel2 } from '../../typography';

import { InternalTooltipProps } from './TooltipProps';
import { useTooltipPosition } from './useTooltipPosition';

export const InternalTooltip = memo(function InternalTooltip({
  subjectLayout,
  content,
  placement,
  opacity,
  animateIn,
  translateY,
  gap,
  yShiftByStatusBarHeight,
  testID,
  onAccessibilityEscape,
  onAccessibilityTap,
  elevation,
  ...props
}: InternalTooltipProps) {
  const theme = useTheme();
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      animateIn.start();
    }
  }, [animateIn]);

  const [tooltipLayout, onTooltipLayout] = useLayout();

  const calculatedTooltipPosition = useTooltipPosition({
    placement,
    subjectLayout,
    tooltipLayout,
    yShiftByStatusBarHeight,
  });

  const outerTooltipStyles = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      ...styles.tooltip,
      ...calculatedTooltipPosition,
      paddingTop: theme.space[gap ?? 0],
      paddingBottom: theme.space[gap ?? 0],
    };
  }, [calculatedTooltipPosition, theme.space, gap]);

  return (
    <View
      accessible
      onAccessibilityEscape={onAccessibilityEscape}
      onAccessibilityTap={onAccessibilityTap}
      // close tooltip on double tapping in voiceover mode
      onLayout={onTooltipLayout}
      // close tooltip on escape a11y gesture
      style={outerTooltipStyles}
    >
      <Box
        animated
        background="bg"
        borderRadius={200}
        elevation={elevation}
        maxWidth={tooltipMaxWidth}
        opacity={opacity}
        paddingX={tooltipPaddingX}
        paddingY={tooltipPaddingY}
        style={{
          transform: [
            {
              translateY,
            },
          ],
        }}
        testID={testID}
        {...props}
      >
        {typeof content === 'string' ? <TextLabel2 color="fg">{content}</TextLabel2> : content}
      </Box>
    </View>
  );
});

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    alignItems: 'flex-start',
    flex: 1,
  },
});
