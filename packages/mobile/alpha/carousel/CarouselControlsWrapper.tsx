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
      position="absolute"
      top={0}
      left={0}
      right={0}
      spacingHorizontal={gutter}
      zIndex={zIndex.interactable}
      animated
      opacity={opacity}
      {...props}
    >
      {children}
    </HStack>
  );
});

CarouselControlsWrapper.displayName = 'CarouselControlsWrapper';
