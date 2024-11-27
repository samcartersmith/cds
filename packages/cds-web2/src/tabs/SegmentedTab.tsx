import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import { css, cx } from '@linaria/core';
import { motion } from 'framer-motion';
import { useTabsContext } from '@cbhq/cds-common/tabs/TabsContext';
import { type TabValue } from '@cbhq/cds-common/tabs/useTabs';
import type { SharedProps } from '@cbhq/cds-common/types/SharedProps';

import { Box } from '../layout/Box';
import type { StaticStyleProps } from '../styles/styleProps';
import { Text } from '../text/Text';

import { type TabComponent } from './Tabs';
import { tabsTransitionConfig } from './Tabs';

const MotionText = motion(Text);

const insetFocusRingStyle = css`
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: var(--borderWidth-thick);
    outline-color: var(--color-backgroundPrimary);
    outline-offset: 0;
  }
`;

const buttonStyle = css`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: var(--borderRadius-roundedFull);
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
  activeColor?: StaticStyleProps['color'];
  /**
   * Text color when the SegmentedTab is inactive.
   * @default foreground
   */
  color?: StaticStyleProps['color'];
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
        color = 'textForeground',
        activeColor = 'textForegroundInverse',
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
