import React, { memo, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  tooltipMaxWidth,
  tooltipPaddingX,
  tooltipPaddingY,
} from '@cbhq/cds-common2/tokens/tooltip';

import { useInvertedPaletteColor } from '../../color/useInvertedPaletteColor';
import { useLayout } from '../../hooks/useLayout';
import { Box } from '../../layout/Box';
import { useTheme } from '../../system';
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
  invertSpectrum = true,
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

  const backgroundColor = useInvertedPaletteColor('background');
  const foregroundColor = useInvertedPaletteColor('foreground');

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
        borderRadius={200}
        dangerouslySetBackground={invertSpectrum ? backgroundColor : theme.color.background}
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
        {typeof content === 'string' ? (
          <TextLabel2
            dangerouslySetColor={invertSpectrum ? foregroundColor : theme.color.textForeground}
          >
            {content}
          </TextLabel2>
        ) : (
          content
        )}
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
