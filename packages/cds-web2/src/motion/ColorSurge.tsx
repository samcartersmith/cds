import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { motion, useAnimation } from 'framer-motion';
import { colorSurgeEnterConfig, colorSurgeExitConfig } from '@cbhq/cds-common2/motion/hint';
import type { HintMotionBaseProps } from '@cbhq/cds-common2/types/MotionBaseProps';

import { Box } from '../layout/Box';
import type { StaticStyleProps } from '../styles/styleProps';

import { useMotionProps } from './useMotionProps';

export type ColorSurgeRefBaseProps = {
  play: (background?: StaticStyleProps['color']) => Promise<void>;
};

export type ColorSurgeTypes = {
  /**
   * Palette alias of the surge color
   * @default backgroundPrimary
   */
  background?: StaticStyleProps['color'];
} & HintMotionBaseProps;

const MotionBox = motion(Box);

/**
 * Please consult with the motion team in #ask-motion before using this component.
 */
export const ColorSurge = memo(
  forwardRef(function ColorSurge(
    { background = 'backgroundPrimary', disableAnimateOnMount = false }: ColorSurgeTypes,
    ref: React.ForwardedRef<ColorSurgeRefBaseProps>,
  ) {
    const [backgroundState, setBackgroundState] = useState<StaticStyleProps['color']>(background);

    const controls = useAnimation();

    const motionProps = useMotionProps({
      enterConfigs: [colorSurgeEnterConfig],
      exitConfigs: [colorSurgeExitConfig],
      animate: controls,
    });

    const playAnimation = useCallback(
      async (backgroundParam?: StaticStyleProps['color']) => {
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
        animate={controls}
        background={backgroundState}
        bottom={0}
        initial={disableAnimateOnMount ? 'exit' : 'enter'}
        left={0}
        position="absolute"
        right={0}
        top={0}
        variants={motionProps.variants}
      />
    );
  }),
);
