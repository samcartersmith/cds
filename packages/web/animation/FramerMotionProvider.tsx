import { memo } from 'react';
import { domAnimation, LazyMotion } from 'framer-motion';

export const FramerMotionProvider = memo(function FramerMotionProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <LazyMotion strict features={domAnimation}>
      {children}
    </LazyMotion>
  );
});
