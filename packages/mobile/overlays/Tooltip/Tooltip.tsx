import React, { memo, useCallback, useRef, useState } from 'react';
import { Modal as RNModal, TouchableOpacity, View } from 'react-native';

import { InternalTooltip } from './InternalTooltip';
import { SubjectLayout, TooltipProps } from './TooltipProps';
import { useTooltipAnimation } from './useTooltipAnimation';

export const Tooltip = memo(
  ({
    children,
    content,
    placement = 'top',
    onCloseTooltip,
    gap = 1,
    yShiftByStatusBarHeight,
    testID,
  }: TooltipProps) => {
    const subjectRef = useRef<View | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [subjectLayout, setSubjectLayout] = useState<SubjectLayout>();

    const { opacity, translateY, animateIn, animateOut } = useTooltipAnimation();

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
        setIsOpen(true);
      });
    }, []);

    return (
      <View collapsable={false} ref={subjectRef}>
        <TouchableOpacity accessibilityRole="button" onPress={handlePressSubject}>
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
          />
        </RNModal>
      </View>
    );
  },
);
