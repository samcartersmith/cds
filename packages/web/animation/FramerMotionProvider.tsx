import React, { memo } from 'react';
import { domMax, LazyMotion } from 'framer-motion';

export const FramerMotionProvider = memo(function FramerMotionProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <LazyMotion strict features={domMax}>
      {children}
    </LazyMotion>
  );
});
