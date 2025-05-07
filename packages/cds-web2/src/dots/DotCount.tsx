import React, { memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';
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
  DotCountPinPlacement,
  DotCountVariants,
  DotOverlap,
  SharedAccessibilityProps,
  SharedProps,
} from '@cbhq/cds-common2/types';
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
  negative: 'fgNegative',
};

export type DotCountBaseProps = SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
    /**
     * The number value to be shown in the dot. If count is <= 0, dot will not show up.
     *  */
    count: number;
    /**
     * If a badge count is greater than max, it will truncate the numbers so its max+
     * @default 99
     *  */
    max?: number;
    /**
     * Background color of dot
     * @default negative
     * */
    variant?: DotCountVariants;
    /** Position of dot relative to its parent */
    pin?: DotCountPinPlacement;
    /** Children of where the dot will anchor to */
    children?: React.ReactNode;
    /** Indicates what shape Dot is overlapping */
    overlap?: DotOverlap;
  };

export type DotCountProps = DotCountBaseProps;

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
  }: DotCountProps) => {
    const { color } = useTheme();
    const pinStyles = getTransform(pin, overlap);

    const styles = useMemo(() => {
      const variantColor = variantColorMap[variant];
      return {
        backgroundColor: color[variantColor],
        borderColor: color.bgSecondary,
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
              <Text as="p" color="fgInverse" display="block" font="caption" textAlign="center">
                {parseDotCountMaxOverflow(count, max)}
              </Text>
            </motion.div>
          )}
        </NewAnimatePresence>
      </div>
    );
  },
);
