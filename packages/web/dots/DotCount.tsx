import React, { memo, useMemo } from 'react';
import { m as motion } from 'framer-motion';
import { css } from 'linaria';
import {
  dotOpacityEnterConfig,
  dotOpacityExitConfig,
  dotScaleEnterConfig,
  dotScaleExitConfig,
} from '@cbhq/cds-common/motion/dot';
import {
  dotCountContent,
  dotCountPadding,
  dotOuterContainerStyles,
} from '@cbhq/cds-common/tokens/dot';
import { DotCountBaseProps } from '@cbhq/cds-common/types/DotCountBaseProps';
import { parseDotCountMaxOverflow } from '@cbhq/cds-common/utils/parseDotCountMaxOverflow';

import { NewAnimatePresence } from '../animation/NewAnimatePresence';
import { usePalette } from '../hooks/usePalette';
import { useMotionProps } from '../motion/useMotionProps';
import { TextCaption } from '../typography/TextCaption';
import { handlePreventPropagation } from '../utils/eventHandlers';

import { dotRootContainerStyles, getTransform } from './dotStyles';

const dotCountContentLinaria = css`
  && {
    ${dotCountContent}
    ${dotOuterContainerStyles}
    ${dotCountPadding}
  }
`;

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
    const palette = usePalette();
    const pinStyles = getTransform(pin, overlap);

    const styles = useMemo(() => {
      return {
        backgroundColor: palette[variant],
        borderColor: palette.secondary,
        ...pinStyles,
      };
    }, [palette, pinStyles, variant]);

    const motionProps = useMotionProps({
      enterConfigs: [dotOpacityEnterConfig, dotScaleEnterConfig],
      exitConfigs: [dotOpacityExitConfig, dotScaleExitConfig],
      exit: 'exit',
    });

    return (
      <div
        aria-label={accessibilityLabel}
        className={dotRootContainerStyles}
        data-testid={testID}
        {...props}
      >
        {children}
        <NewAnimatePresence>
          {count > 0 && (
            <motion.div
              {...motionProps}
              className={dotCountContentLinaria}
              data-testid="dotcount-outer-container"
              onClick={handlePreventPropagation}
              style={styles}
            >
              <TextCaption align="center" as="p" color="primaryForeground">
                {parseDotCountMaxOverflow(count, max)}
              </TextCaption>
            </motion.div>
          )}
        </NewAnimatePresence>
      </div>
    );
  },
);
