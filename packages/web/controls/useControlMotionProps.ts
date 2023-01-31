import {
  checkboxOpacityEnterConfig,
  checkboxOpacityExitConfig,
  checkboxScaleEnterConfig,
  checkboxScaleExitConfig,
} from '@cbhq/cds-common/motion/checkbox';

import { useMotionProps } from '../motion/useMotionProps';
import { palette } from '../tokens';

export type UseControlMotionParams = {
  checked?: boolean;
  shouldAnimateBackground?: boolean;
  initialBackground?: (typeof palette)[keyof typeof palette];
};

export const useControlMotionProps = ({
  checked,
  shouldAnimateBackground = true,
  initialBackground = palette.background,
}: UseControlMotionParams) => {
  const outerContainerMotionProps = useMotionProps({
    variants: {
      enter: {
        borderColor: palette.primary,
        ...(shouldAnimateBackground ? { backgroundColor: palette.primary } : {}),
      },
      exit: {
        borderColor: palette.lineHeavy,
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
