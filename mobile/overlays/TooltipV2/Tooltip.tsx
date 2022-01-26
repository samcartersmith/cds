import React, { memo, useCallback, useRef, useState } from 'react';
import { Modal as RNModal, TouchableOpacity, View } from 'react-native';
import { InternalTooltip } from './InternalTooltip';
import { SubjectLayout, TooltipProps } from './TooltipProps';

export const Tooltip = memo(
  ({ children, onCloseTooltip, content, placement = 'top' }: TooltipProps) => {
    const subjectRef = useRef<View | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [subjectLayout, setSubjectLayout] = useState<SubjectLayout>();

    const handlePressOutsideTooltip = useCallback(() => {
      setIsOpen(false);
      onCloseTooltip?.();
    }, [onCloseTooltip]);

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
        <TouchableOpacity onPress={handlePressSubject}>{children}</TouchableOpacity>

        <RNModal hardwareAccelerated transparent animationType="none" visible={isOpen}>
          <TouchableOpacity
            onPress={handlePressOutsideTooltip}
            style={{ flex: 1 }}
            activeOpacity={1}
          >
            <InternalTooltip
              subjectLayout={subjectLayout}
              content={content}
              placement={placement}
            />
          </TouchableOpacity>
        </RNModal>
      </View>
    );
  },
);
