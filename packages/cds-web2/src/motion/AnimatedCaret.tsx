import React, { memo } from 'react';
import { motion, MotionConfig } from 'framer-motion';
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
  primary: 'textPrimary',
  positive: 'textPositive',
  negative: 'textNegative',
  foreground: 'textForeground',
  foregroundMuted: 'textForegroundMuted',
  secondary: 'backgroundSecondary',
};

export const AnimatedCaret = memo(function AnimatedCaret({
  rotate,
  size = 's',
  color = 'textForegroundMuted',
  testID,
  padding,
  paddingBottom,
  paddingRight,
  paddingX,
  paddingLeft,
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
    paddingRight,
    paddingX,
    paddingLeft,
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
