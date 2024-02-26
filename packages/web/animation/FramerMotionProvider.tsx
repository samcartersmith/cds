import React, { memo } from 'react';
import { domAnimation, LazyMotion, LazyProps } from 'framer-motion';

export type FramerMotionProviderProps = {
  motionFeatures?: LazyProps['features'];
  children: LazyProps['children'];
};

export const FramerMotionProvider = memo(function FramerMotionProvider({
  children,
  motionFeatures = domAnimation,
}: FramerMotionProviderProps) {
  return (
    <LazyMotion strict features={motionFeatures}>
      {children}
    </LazyMotion>
  );
});
