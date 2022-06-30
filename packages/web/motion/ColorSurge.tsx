import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { m as motion, useAnimation } from 'framer-motion';
import type {
  ColorSurgeBackground,
  ColorSurgeBaseProps,
  ColorSurgeRefBaseProps,
} from '@cbhq/cds-common';
import { colorSurgeEnterConfig, colorSurgeExitConfig } from '@cbhq/cds-common/motion/hint';

import { Box } from '../layout';

import { useMotionProps } from './useMotionProps';

export type ColorSurgeTypes = ColorSurgeBaseProps;

const MotionBox = motion(Box);

/**
 * Please consult with the motion team in #ask-motion before using this component.
 */
export const ColorSurge = memo(
  forwardRef(function ColorSurge(
    { background = 'primary', disableAnimateOnMount = false }: ColorSurgeTypes,
    ref: ForwardedRef<ColorSurgeRefBaseProps>,
  ) {
    const [backgroundState, setBackgroundState] = useState<ColorSurgeBackground>(background);

    const controls = useAnimation();

    const motionProps = useMotionProps({
      enterConfigs: [colorSurgeEnterConfig],
      exitConfigs: [colorSurgeExitConfig],
      animate: controls,
    });

    const playAnimation = useCallback(
      async (backgroundParam?: ColorSurgeBackground) => {
        if (backgroundParam) {
          setBackgroundState(backgroundParam);
        }
        controls.set('enter');
        await controls.start('exit');
      },
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

    return (
      <MotionBox
        variants={motionProps.variants}
        animate={controls}
        initial={disableAnimateOnMount ? 'exit' : 'enter'}
        background={backgroundState}
        pin="all"
      />
    );
  }),
);
