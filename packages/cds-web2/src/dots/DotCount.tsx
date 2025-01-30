import React, { memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { motion } from 'framer-motion';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';
import {
  dotOpacityEnterConfig,
  dotOpacityExitConfig,
  dotScaleEnterConfig,
  dotScaleExitConfig,
} from '@cbhq/cds-common2/motion/dot';
import {
  dotCountContent,
  dotCountPadding,
  dotOuterContainerStyles,
} from '@cbhq/cds-common2/tokens/dot';
import type {
  DotCountBaseProps,
  DotCountVariants,
} from '@cbhq/cds-common2/types/DotCountBaseProps';
import { parseDotCountMaxOverflow } from '@cbhq/cds-common2/utils/parseDotCountMaxOverflow';

import { NewAnimatePresence } from '../animation/NewAnimatePresence';
import { useTheme } from '../hooks/useTheme';
import { useMotionProps } from '../motion/useMotionProps';
import { Text } from '../typography/Text';

import { getTransform } from './dotStyles';

const baseStyle = css`
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const dotCountContentStyle = css`
  ${dotCountContent}
  ${dotOuterContainerStyles}
  ${dotCountPadding}
`;

const variantColorMap: Record<DotCountVariants, ThemeVars.Color> = {
  negative: 'textNegative',
};

export const DotCount = memo(
  ({
    children,
    pin,
    variant = 'negative',
    count,
    max,
    testID,
    accessibilityLabel,
    overlap,
    ...props
  }: DotCountBaseProps) => {
    const { color } = useTheme();
    const pinStyles = getTransform(pin, overlap);

    const styles = useMemo(() => {
      const variantColor = variantColorMap[variant];
      return {
        backgroundColor: color[variantColor],
        borderColor: color.backgroundSecondary,
        ...pinStyles,
      };
    }, [color, pinStyles, variant]);

    const motionProps = useMotionProps({
      enterConfigs: [dotOpacityEnterConfig, dotScaleEnterConfig],
      exitConfigs: [dotOpacityExitConfig, dotScaleExitConfig],
      exit: 'exit',
    });

    return (
      <div aria-label={accessibilityLabel} className={baseStyle} data-testid={testID} {...props}>
        {children}
        <NewAnimatePresence>
          {count > 0 && (
            <motion.div
              {...motionProps}
              className={dotCountContentStyle}
              data-testid="dotcount-outer-container"
              style={styles}
            >
              <Text as="p" color="textForegroundInverse" font="caption" textAlign="center">
                {parseDotCountMaxOverflow(count, max)}
              </Text>
            </motion.div>
          )}
        </NewAnimatePresence>
      </div>
    );
  },
);
