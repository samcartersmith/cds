import React, { memo } from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { zIndex } from '@cbhq/cds-common/tokens/zIndex';

import { HStack, HStackProps } from '../../layout/HStack';

export type CarouselControlsWrapperProps = HStackProps & {
  children?: React.ReactNode;
};

/** Wrapper to house ProgressIndicators and Dismiss IconButton when controls are shown in Carousel */
export const CarouselControlsWrapper = memo(function CarouselControlsWrapper({
  children,
  opacity,
  ...props
}: CarouselControlsWrapperProps) {
  return (
    <HStack
      animated
      left={0}
      opacity={opacity}
      position="absolute"
      right={0}
      spacingHorizontal={gutter}
      top={0}
      zIndex={zIndex.interactable}
      {...props}
    >
      {children}
    </HStack>
  );
});

CarouselControlsWrapper.displayName = 'CarouselControlsWrapper';
