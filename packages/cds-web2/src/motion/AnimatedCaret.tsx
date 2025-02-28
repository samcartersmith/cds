import React, { memo } from 'react';
import { m as motion, MotionConfig } from 'framer-motion';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { animateRotateConfig } from '@cbhq/cds-common2/motion/animatedCaret';
import type { AnimatedCaretBaseProps } from '@cbhq/cds-common2/types/AnimatedCaretBaseProp';
import type { InputVariant } from '@cbhq/cds-common2/types/InputBaseProps';
import { PaddingProps } from '@cbhq/cds-common2/types/SpacingProps';

import { useTextInputFocusVariantContent } from '../controls/context';
import { Icon, IconProps } from '../icons/Icon';
import { HStack } from '../layout';

import { useMotionProps } from './useMotionProps';

export type AnimatedCaretProps = AnimatedCaretBaseProps &
  Partial<Omit<IconProps, 'name'>> &
  PaddingProps;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'bgSecondary',
};

export const AnimatedCaret = memo(function AnimatedCaret({
  rotate,
  size = 's',
  color = 'fgMuted',
  testID,
  padding,
  paddingBottom,
  paddingEnd,
  paddingX,
  paddingStart,
  paddingTop,
  paddingY,
  ...rest
}: AnimatedCaretProps) {
  const motionProps = useMotionProps({
    enterConfigs: [{ ...animateRotateConfig, toValue: rotate }],
    initial: false,
  });
  const paddingProps = {
    padding,
    paddingBottom,
    paddingEnd,
    paddingX,
    paddingStart,
    paddingTop,
    paddingY,
  };
  const textInputVariant = useTextInputFocusVariantContent();
  const variant = textInputVariant ? variantColorMap[textInputVariant] : color;

  return (
    // HStack to limit rotate boundary
    <HStack {...paddingProps}>
      <MotionConfig reducedMotion="user">
        <motion.div {...motionProps} data-testid={`${testID}-motion`}>
          <Icon color={variant} name="caretUp" size={size} {...rest} />
        </motion.div>
      </MotionConfig>
    </HStack>
  );
});
