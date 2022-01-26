import React, { memo, ReactNode, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useInvertedPaletteColor } from '../../color/useInvertedPaletteColor';
import { useLayout } from '../../hooks/useLayout';
import { useSpacingStyles } from '../../hooks/useSpacingStyles';
import { Box } from '../../layout/Box';
import { TextLabel2 } from '../../typography';
import { Placement, SubjectLayout } from './TooltipProps';
import { useTooltipPosition } from './useTooltipPosition';

type InternalTooltipProps = {
  subjectLayout: SubjectLayout | undefined;
  content: ReactNode;
  placement: Placement;
};

export const InternalTooltip = memo(function InternalTooltip({
  subjectLayout,
  content,
  placement,
}: InternalTooltipProps) {
  const tooltipExternalGap = useSpacingStyles({ spacingVertical: 1 });

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
        borderRadius="standard"
        spacing={1}
        dangerouslySetBackground={backgroundColor}
        maxWidth={260}
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
