import React, { memo, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { maxWidth, spacingHorizontal, spacingVertical } from '@cbhq/cds-common/tokens/tooltip';
import { useInvertedPaletteColor } from '../../color/useInvertedPaletteColor';
import { useLayout } from '../../hooks/useLayout';
import { useSpacingStyles } from '../../hooks/useSpacingStyles';
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
}: InternalTooltipProps) {
  const didMount = useRef(false);
  const tooltipExternalGap = useSpacingStyles({ spacingVertical: 1 });

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
  });

  const outerTooltipStyles = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      ...styles.tooltip,
      ...calculatedTooltipPosition,
      ...tooltipExternalGap,
    };
  }, [calculatedTooltipPosition, tooltipExternalGap]);

  return (
    <View style={outerTooltipStyles} onLayout={onTooltipLayout}>
      <Box
        animated
        borderRadius="tooltipV2"
        spacingHorizontal={spacingHorizontal}
        spacingVertical={spacingVertical}
        dangerouslySetBackground={backgroundColor}
        opacity={opacity}
        dangerouslySetStyle={{
          transform: [
            {
              translateY,
            },
          ],
        }}
        maxWidth={maxWidth}
      >
        <TextLabel2 dangerouslySetColor={foregroundColor}>{content}</TextLabel2>
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
