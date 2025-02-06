import React from 'react';
import { type LazyProps, domAnimation, LazyMotion } from 'framer-motion';

export type FramerMotionProviderProps = Omit<LazyProps, 'features'> & {
  motionFeatures?: LazyProps['features'];
};

export const FramerMotionProvider = ({
  children,
  motionFeatures = domAnimation,
}: FramerMotionProviderProps) => {
  return (
    <LazyMotion strict features={motionFeatures}>
      {children}
    </LazyMotion>
  );
};
