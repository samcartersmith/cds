import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react';
import { m as motion, useAnimation } from 'framer-motion';
import type { ShakeBaseProps, ShakeRefBaseProps } from '@cbhq/cds-common';
import { shakeTransitionConfig, shakeTranslateX } from '@cbhq/cds-common/motion/hint';

import { convertTransition } from './utils';

/**
 * Please consult with the motion team in #ask-motion before using this component.
 */
export const Shake = memo(
  forwardRef(function Shake(
    { children, disableAnimateOnMount = false }: ShakeBaseProps,
    ref: ForwardedRef<ShakeRefBaseProps>,
  ) {
    const controls = useAnimation();

    const playAnimation = useCallback(
      async () =>
        controls.start({
          x: shakeTranslateX,
          transition: convertTransition(shakeTransitionConfig),
        }),
      [controls],
    );

    useEffect(() => {
      if (!disableAnimateOnMount) {
        void playAnimation();
      }
    }, [playAnimation, disableAnimateOnMount]);

    useImperativeHandle(
      ref,
      () => ({
        play: playAnimation,
      }),
      [playAnimation],
    );

    return <motion.div animate={controls}>{children}</motion.div>;
  }),
);
