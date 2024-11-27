import React from 'react';
import { type LazyProps, domAnimation, LazyMotion } from 'framer-motion';

export type FramerMotionProviderProps = LazyProps;

export const FramerMotionProvider = ({
  children,
  features = domAnimation,
}: FramerMotionProviderProps) => {
  return (
    <LazyMotion strict features={features}>
      {children}
    </LazyMotion>
  );
};
