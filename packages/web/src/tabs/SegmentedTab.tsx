import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';
import type { PaletteForeground, SharedProps } from '@cbhq/cds-common';
import { useTabsContext } from '@cbhq/cds-common/tabs/TabsContext';
import { type TabValue } from '@cbhq/cds-common/tabs/useTabs';

import { Box } from '../layout';
import { insetFocusRing } from '../styles/focus';
import { borderRadius, palette } from '../tokens';
import { TextHeadline } from '../typography';
import { cx } from '../utils/linaria';

import { type TabComponent } from './Tabs';
import { tabsTransitionConfig } from './Tabs';

const buttonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: ${borderRadius.roundedFull};
  &.focus-visible {
    &::before {
      border-radius: inherit;
    }
  }
`;

const buttonDisabledStyle = css`
  cursor: default;
  pointer-events: none;
  touch-action: none;
`;

const MotionTextHeadline = motion(TextHeadline);

export type SegmentedTabProps = {
  /**
   * Text color when the SegmentedTab is active.
   * @default negativeForeground
   */
  activeColor?: PaletteForeground;
  /**
   * Text color when the SegmentedTab is inactive.
   * @default foreground
   */
  color?: PaletteForeground;
  /** Callback that is fired when the SegmentedTab is pressed. */
  onPress?: (id: string, event: React.MouseEvent) => void;
} & TabValue &
  Omit<React.ComponentProps<'button'>, 'ref'> &
  SharedProps;

export const disabledStyle = css`
  opacity: 0.5;
`;

export const SegmentedTab = memo(
  forwardRef<HTMLButtonElement, SegmentedTabProps>(
    (
      {
        id,
        label,
        disabled: disabledProp,
        onPress,
        color = 'foreground',
        activeColor = 'negativeForeground',
        className,
        'aria-pressed': ariaPressed,
        testID,
        ...props
      },
      ref,
    ) => {
      const { activeTab, updateActiveTab, disabled: allTabsDisabled } = useTabsContext();
      const isActive = activeTab?.id === id;
      const isDisabled = disabledProp || allTabsDisabled;

      const handlePress = useCallback(
        (event: React.MouseEvent) => {
          updateActiveTab(id);
          onPress?.(id, event);
        },
        [id, updateActiveTab, onPress],
      );

      const motionProps = useMemo(
        () => ({
          animate: { color: palette[isActive ? activeColor : color] },
          transition: tabsTransitionConfig,
          initial: false,
        }),
        [isActive, activeColor, color],
      );

      return (
        <button
          ref={ref}
          aria-pressed={ariaPressed ?? isActive}
          className={cx(
            insetFocusRing,
            buttonStyle,
            isDisabled && buttonDisabledStyle,
            disabledProp && !allTabsDisabled && disabledStyle,
            className,
          )}
          data-testid={testID}
          disabled={isDisabled}
          onClick={handlePress}
          type="button"
          {...props}
        >
          <Box as="span" justifyContent="center" spacingHorizontal={2} spacingVertical={1}>
            {typeof label === 'string' ? (
              <MotionTextHeadline as="span" {...motionProps}>
                {label}
              </MotionTextHeadline>
            ) : (
              label
            )}
          </Box>
        </button>
      );
    },
  ),
) satisfies TabComponent;

SegmentedTab.displayName = 'SegmentedTab';
