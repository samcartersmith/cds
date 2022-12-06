import React, { memo, useCallback, useRef, useState } from 'react';
import { Modal as RNModal, TouchableOpacity, View } from 'react-native';
import { useChildrenAsAccessibilityProps } from '@cbhq/cds-common/accessibility/useChildrenAsAccessibilityProps';

import { InternalTooltip } from './InternalTooltip';
import { SubjectLayout, TooltipProps } from './TooltipProps';
import { useTooltipAnimation } from './useTooltipAnimation';

export const Tooltip = memo(
  ({
    children,
    content,
    placement = 'top',
    onCloseTooltip,
    onOpenTooltip,
    gap = 1,
    yShiftByStatusBarHeight,
    testID,
    accessibilityLabel,
    accessibilityHint,
    accessibilityLabelForContent,
    accessibilityHintForContent,
  }: TooltipProps) => {
    const subjectRef = useRef<View | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [subjectLayout, setSubjectLayout] = useState<SubjectLayout>();

    const { opacity, translateY, animateIn, animateOut } = useTooltipAnimation(placement);

    const handleRequestClose = useCallback(() => {
      animateOut.start(() => {
        setIsOpen(false);
        onCloseTooltip?.();
      });
    }, [animateOut, onCloseTooltip]);

    const handlePressSubject = useCallback(() => {
      subjectRef.current?.measure((x, y, width, height, pageOffsetX, pageOffsetY) => {
        setSubjectLayout({
          width,
          height,
          pageOffsetX,
          pageOffsetY,
        });
      });
      setIsOpen(true);
      onOpenTooltip?.();
    }, [onOpenTooltip]);

    // The accessibility props for the trigger component. Trigger component
    // equals the component where when you click on it, it will show the tooltip
    const accessibilityPropsForTrigger = useChildrenAsAccessibilityProps({
      children,
      accessibilityLabel,
      accessibilityHint,
    });

    const accessibilityPropsForContent = useChildrenAsAccessibilityProps({
      children: content,
      accessibilityLabel: accessibilityLabelForContent,
      accessibilityHint: accessibilityHintForContent,
    });

    return (
      <View collapsable={false} ref={subjectRef}>
        <TouchableOpacity
          {...accessibilityPropsForTrigger}
          accessibilityRole="button"
          onPress={handlePressSubject}
        >
          {children}
        </TouchableOpacity>

        <RNModal
          hardwareAccelerated
          transparent
          animationType="none"
          visible={isOpen}
          onRequestClose={handleRequestClose}
        >
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityElementsHidden
            onPress={handleRequestClose}
            style={{ flex: 1 }}
            activeOpacity={1}
          />
          <InternalTooltip
            subjectLayout={subjectLayout}
            content={content}
            placement={placement}
            opacity={opacity}
            animateIn={animateIn}
            translateY={translateY}
            gap={gap}
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
            testID={testID}
            {...accessibilityPropsForContent}
          />
        </RNModal>
      </View>
    );
  },
);
