import React, { forwardRef, isValidElement, memo, useCallback, useMemo, useState } from 'react';
import { css } from 'linaria';
import { ForwardedRef, SpacingScale } from '@cbhq/cds-common';
import { tones } from '@cbhq/cds-common/tokens/banner';
import { BannerBaseProps } from '@cbhq/cds-common/types/BannerBaseProps';
import { isDevelopment } from '@cbhq/cds-utils';

import { HStack } from '../alpha/HStack';
import { VStack } from '../alpha/VStack';
import { Collapsible } from '../collapsible';
import { useDimensions } from '../hooks/useDimensions';
import { Icon } from '../icons';
import { Box } from '../layout/Box';
import { Pressable } from '../system/Pressable';
import { Link } from '../typography';
import { TextBody } from '../typography/TextBody';
import { TextHeadline } from '../typography/TextHeadline';
import { cx } from '../utils/linaria';

const warningClassName = css`
  && {
    background-color: rgb(var(--red0));
    border-color: rgb(var(--red10));
  }
`;

const informationalClassName = css`
  && {
    border-color: rgb(var(--blue10));
  }
`;

// This custom spacing is necessary so that
// the iconButton and the icon can horizontally
// align with the text
const customSpacing = css`
  && {
    padding-top: 4px;
  }
`;

export type WebBannerProps = {
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslySetClassName?: string;
  /**
   * @danger There may be times when you need to dynamically set styles. This comes at a performance cost, so use with caution.
   */
  dangerouslySetStyle?: React.CSSProperties;
} & BannerBaseProps;

const breakpointConfig = {
  breakpoints: { wide: 724 },
  // Ensure we only update on change, not for every resize event
  updateOnBreakpointChange: true,
};

export const Banner = memo(
  forwardRef(
    (
      {
        tone,
        startIcon,
        onClose,
        action,
        title,
        bordered = true,
        borderRadius = 'rounded',
        children,
        showDismiss = false,
        testID,
        dangerouslySetClassName,
        dangerouslySetStyle,
        numberOfLines = 3,
      }: WebBannerProps,
      forwardedRef: ForwardedRef<HTMLDivElement>,
    ) => {
      const [isCollapsed, setIsCollapsed] = useState(false);

      // Measure and configure layout
      const { observe, currentBreakpoint } = useDimensions(breakpointConfig);
      const isWide = useMemo(() => currentBreakpoint === 'wide', [currentBreakpoint]);
      const shouldUseVStack = useMemo(() => !isWide || showDismiss, [isWide, showDismiss]);
      // The nested Stack is referred to as Stack
      const Stack = useMemo(() => (shouldUseVStack ? VStack : HStack), [shouldUseVStack]);
      const stackGap: SpacingScale = useMemo(() => (isWide && action ? 2 : 1), [isWide, action]);
      const stackClassName = useMemo(
        () =>
          cx(
            tone === 'warning' ? warningClassName : undefined,
            tone === 'informational' ? informationalClassName : undefined,
            dangerouslySetClassName,
          ),
        [dangerouslySetClassName, tone],
      );
      const stackAlignment = useMemo(
        () => (shouldUseVStack ? 'flex-start' : 'center'),
        [shouldUseVStack],
      );

      // Events
      const handleOnDismiss = useCallback(() => {
        setIsCollapsed(true);
        onClose?.();
      }, [onClose]);

      // Spacing for a few regions is dynamic - we need dynamic configs
      const spacingEnd: SpacingScale = useMemo(() => (isWide && action ? 2 : 3), [isWide, action]);
      const spacingBottom: SpacingScale = useMemo(
        () => (!isWide && action ? 1 : 2),
        [isWide, action],
      );

      // Setup color configs
      const { iconColor, textColor, background, actionColor, iconButtonColor, borderColor } =
        tones[tone];

      // Ensure actions are themed to match the tone
      const clonedAction = useMemo(() => {
        if (isValidElement(action) && action.type === Link) {
          return React.cloneElement(action, {
            variant: 'headline',
            color: actionColor,
          });
        }

        if (isValidElement(action) && isDevelopment()) {
          // eslint-disable-next-line no-console
          console.error('Banner action needs to be a CDS Link component');
        }

        return action;
      }, [action, actionColor]);

      return (
        <Collapsible testID={`${testID}-collapsible`} collapsed={isCollapsed} ref={forwardedRef}>
          <HStack
            ref={observe}
            // Consistent props
            width="100%"
            gap={2}
            spacingTop={2}
            spacingStart={4}
            // Dynamic props
            spacingEnd={spacingEnd}
            spacingBottom={spacingBottom}
            testID={testID}
            borderRadius={borderRadius}
            bordered={bordered}
            background={background}
            borderColor={borderColor}
            dangerouslySetClassName={stackClassName}
            dangerouslySetStyle={dangerouslySetStyle}
          >
            {/** Start */}
            <Box dangerouslySetClassName={customSpacing}>
              <Icon testID={`${testID}-icon`} name={startIcon} size="s" color={iconColor} />
            </Box>
            <Stack
              testID={`${testID}-inner-end-box`}
              justifyContent="space-between"
              flexGrow={1}
              gap={stackGap}
              alignItems={stackAlignment}
            >
              {/** Middle */}
              <VStack testID={`${testID}-content-box`} gap={0.5}>
                <TextHeadline as="p" numberOfLines={2} color={textColor}>
                  {title}
                </TextHeadline>
                <TextBody as="p" numberOfLines={numberOfLines} color={textColor}>
                  {children}
                </TextBody>
              </VStack>
              {/** Actions */}
              {!!clonedAction && (
                <Box
                  testID={`${testID}-action`}
                  spacingVertical={1}
                  alignItems="center"
                  justifyContent="center"
                >
                  {clonedAction}
                </Box>
              )}
            </Stack>
            {/** Dismissable action */}
            {showDismiss && (
              <Box alignItems="flex-start" dangerouslySetClassName={customSpacing}>
                <Pressable
                  role="button"
                  accessibilityLabel="close"
                  accessibilityHint="close banner"
                  onPress={handleOnDismiss}
                  backgroundColor="transparent"
                  borderRadius="roundedFull"
                  testID={`${testID}-dimiss-btn`}
                >
                  <Icon size="s" name="close" color={iconButtonColor} />
                </Pressable>
              </Box>
            )}
          </HStack>
        </Collapsible>
      );
    },
  ),
);
