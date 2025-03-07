import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { css, cx } from '@linaria/core';
import { m as motion } from 'framer-motion';
import type { ThemeVars } from '@cbhq/cds-common2/core/theme';
import { useTabsContext } from '@cbhq/cds-common2/tabs/TabsContext';
import { type TabValue } from '@cbhq/cds-common2/tabs/useTabs';
import type { SharedProps } from '@cbhq/cds-common2/types/SharedProps';

import { Box } from '../layout/Box';
import { Text } from '../typography/Text';

import { type TabComponent } from './Tabs';
import { tabsTransitionConfig } from './Tabs';

const MotionText = motion(Text);

const insetFocusRingStyle = css`
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: 0;
  }
`;

const buttonStyle = css`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: var(--borderRadius-1000);
`;

const buttonDisabledStyle = css`
  cursor: default;
  pointer-events: none;
  touch-action: none;
`;

export type SegmentedTabProps = {
  /**
   * Text color when the SegmentedTab is active.
   * @default negativeForeground
   */
  activeColor?: ThemeVars.Color;
  /**
   * Text color when the SegmentedTab is inactive.
   * @default foreground
   */
  color?: ThemeVars.Color;
  /** Callback that is fired when the SegmentedTab is clicked. */
  onClick?: (id: string, event: React.MouseEvent) => void;
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
        onClick,
        color = 'fg',
        activeColor = 'fgInverse',
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
          onClick?.(id, event);
        },
        [id, updateActiveTab, onClick],
      );

      const motionProps = useMemo(
        () => ({
          animate: { color: `var(--color-${isActive ? activeColor : color})` },
          transition: tabsTransitionConfig,
          initial: false,
        }),
        [activeColor, color, isActive],
      );

      return (
        <button
          ref={ref}
          aria-pressed={ariaPressed ?? isActive}
          className={cx(
            insetFocusRingStyle,
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
          <Box as="span" justifyContent="center" paddingX={2} paddingY={1}>
            {typeof label === 'string' ? (
              <MotionText font="headline" {...motionProps}>
                {label}
              </MotionText>
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
