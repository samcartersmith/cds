import React from 'react';
import {
  checkboxOpacityEnterConfig,
  checkboxOpacityExitConfig,
  checkboxScaleEnterConfig,
  checkboxScaleExitConfig,
} from '@cbhq/cds-common2/motion/checkbox';

import { useMotionProps } from '../motion/useMotionProps';

export type UseControlMotionParams = {
  checked?: boolean;
  shouldAnimateBackground?: boolean;
  initialBackground?: React.CSSProperties['backgroundColor'];
};

export const useControlMotionProps = ({
  checked,
  shouldAnimateBackground = true,
  initialBackground = 'var(--color-bg)',
}: UseControlMotionParams) => {
  const outerContainerMotionProps = useMotionProps({
    variants: {
      enter: {
        borderColor: 'var(--color-bgPrimary)',
        ...(shouldAnimateBackground ? { backgroundColor: 'var(--color-bgPrimary)' } : {}),
      },
      exit: {
        borderColor: 'var(--color-bgLineHeavy)',
        ...(shouldAnimateBackground ? { backgroundColor: initialBackground } : {}),
      },
    },
    transition: { easing: 'enterFunctional', duration: 'moderate1' },
    animate: checked ? 'enter' : 'exit',
  });

  const innerContainerMotionProps = useMotionProps({
    enterConfigs: [checkboxOpacityEnterConfig, checkboxScaleEnterConfig],
    exitConfigs: [checkboxOpacityExitConfig, checkboxScaleExitConfig],
    animate: checked ? 'enter' : 'exit',
  });

  return {
    outerContainerMotionProps,
    innerContainerMotionProps,
  };
};
