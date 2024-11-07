import React, {
  forwardRef,
  isValidElement,
  memo,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react';
import { css } from 'linaria';
import { ForwardedRef, SpacingScale } from '@cbhq/cds-common';
import { paletteValueToRgbaString } from '@cbhq/cds-common/palette/paletteValueToRgbaString';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';
import { variants } from '@cbhq/cds-common/tokens/banner';
import { BannerBaseProps } from '@cbhq/cds-common/types/BannerBaseProps';
import { isChildrenFalsy } from '@cbhq/cds-common/utils/isChildrenFalsy';
import { isDevelopment } from '@cbhq/cds-utils';

import { Collapsible } from '../collapsible';
import { useDimensions } from '../hooks/useDimensions';
import { Icon } from '../icons';
import { HStack, VStack } from '../layout';
import { Box } from '../layout/Box';
import { deviceBreakpoints } from '../layout/breakpoints';
import { Pressable } from '../system/Pressable';
import { Link, LinkProps } from '../typography';
import { TextBody } from '../typography/TextBody';
import { TextHeadline } from '../typography/TextHeadline';
import { cx } from '../utils/linaria';

const warningClassName = css`
  && {
    background-color: rgb(var(--red0));
    border-color: rgb(var(--red10));
  }
`;

const promotionalClassName = css`
  && {
    border-color: rgb(var(--blue10));
  }
`;

const errorClassNameLight = css`
  && {
    background-color: rgb(var(--yellow5));
    border-color: rgb(var(--yellow10));
  }
`;

const errorClassNameDark = css`
  && {
    background-color: rgb(var(--yellow15));
    border-color: rgb(var(--yellow10));
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

const actionContainerStyle = css`
  && {
    white-space: nowrap;
  }
`;

export type WebBannerProps = {
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  className?: string;
  /**
   * @danger There may be times when you need to dynamically set styles. This comes at a performance cost, so use with caution.
   */
  style?: React.CSSProperties;
} & BannerBaseProps;

const breakpointConfig = {
  breakpoints: {
    wide: deviceBreakpoints.phoneLandscape,
  },
  // Ensure we only update on change, not for every resize event
  updateOnBreakpointChange: true,
};

export const Banner = memo(
  forwardRef(
    (
      {
        variant,
        startIcon,
        onClose,
        primaryAction,
        secondaryAction,
        title,
        bordered = true,
        borderRadius = 'rounded',
        children,
        showDismiss = false,
        testID,
        style,
        className,
        numberOfLines = 3,
      }: WebBannerProps,
      forwardedRef: ForwardedRef<HTMLDivElement>,
    ) => {
      const [isCollapsed, setIsCollapsed] = useState(false);
      const titleId = useId();

      // Measure and configure layout
      const { observe, currentBreakpoint } = useDimensions(breakpointConfig);
      const isWide = useMemo(() => currentBreakpoint === 'wide', [currentBreakpoint]);
      const shouldUseVStack = useMemo(() => !isWide || showDismiss, [isWide, showDismiss]);
      // The nested Stack is referred to as Stack
      const Stack = useMemo(() => (shouldUseVStack ? VStack : HStack), [shouldUseVStack]);
      const spacingStart: SpacingScale = useMemo(() => (isWide ? 4 : 2), [isWide]);
      const stackGap: SpacingScale = useMemo(
        () => (isWide && primaryAction && !showDismiss ? 3 : 1),
        [isWide, primaryAction, showDismiss],
      );
      // temporary fix for error banner
      const spectrum = useSpectrum();
      const errorClassName = useMemo(
        () => (spectrum === 'light' ? errorClassNameLight : errorClassNameDark),
        [spectrum],
      );
      const stackClassName = useMemo(
        () =>
          cx(
            variant === 'warning' ? warningClassName : undefined,
            variant === 'promotional' ? promotionalClassName : undefined,
            variant === 'error' ? errorClassName : undefined,
            className,
          ),
        [className, variant, errorClassName],
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
      const spacingBottom: SpacingScale = useMemo(
        () => (!isWide && primaryAction ? 1 : 2),
        [isWide, primaryAction],
      );

      // Setup color configs
      const {
        iconColor,
        textColor,
        background,
        primaryActionColor,
        secondaryActionColor,
        iconButtonColor,
        borderColor,
      } = variants[variant];

      // Ensure primaryActions are themed to match the variant
      const clonedPrimaryAction = useMemo(() => {
        if (isValidElement(primaryAction) && primaryAction.type === Link) {
          return React.cloneElement(primaryAction, {
            variant: 'headline',
            color: primaryActionColor,
            testID: `${testID}-action--primary`,
            underline: variant === 'error',
            ...(primaryAction.props as LinkProps),
          });
        }

        if (isValidElement(primaryAction) && isDevelopment()) {
          // eslint-disable-next-line no-console
          console.error('Banner primaryAction needs to be a CDS Link component');
        }

        return primaryAction;
      }, [primaryAction, primaryActionColor, testID, variant]);
      const clonedSecondaryAction = useMemo(() => {
        if (isValidElement(secondaryAction) && secondaryAction.type === Link) {
          return React.cloneElement(secondaryAction, {
            variant: 'headline',
            color: secondaryActionColor,
            testID: `${testID}-action--secondary`,
            ...(secondaryAction.props as LinkProps),
          });
        }

        if (isValidElement(secondaryAction) && isDevelopment()) {
          // eslint-disable-next-line no-console
          console.error('Banner secondaryAction needs to be a CDS Link component');
        }

        return secondaryAction;
      }, [secondaryAction, secondaryActionColor, testID]);

      // temporary fix for error banner
      const customIconColor = useMemo(
        () =>
          variant === 'error'
            ? {
                dangerouslySetColor: paletteValueToRgbaString(
                  spectrum === 'light' ? 'orange40' : 'orange70',
                  spectrum,
                ),
              }
            : {},
        [variant, spectrum],
      );

      return (
        <Collapsible
          ref={observe}
          accessibilityLabelledBy={titleId}
          collapsed={isCollapsed}
          id={`${titleId}--controller`}
          testID={`${testID}-collapsible`}
        >
          <HStack
            ref={forwardedRef}
            alignItems={isChildrenFalsy(children) && isWide ? 'center' : undefined}
            background={background}
            borderColor={borderColor}
            borderRadius={borderRadius}
            bordered={bordered}
            className={stackClassName}
            gap={2}
            spacingBottom={spacingBottom}
            spacingEnd={3}
            spacingStart={spacingStart}
            spacingTop={2}
            style={style}
            testID={testID}
            width="100%"
          >
            {/** Start */}
            <Box className={isChildrenFalsy(children) && isWide ? undefined : customSpacing}>
              <Icon
                color={iconColor}
                name={startIcon}
                size="s"
                testID={`${testID}-icon`}
                {...customIconColor}
              />
            </Box>
            <Stack
              alignItems={stackAlignment}
              flexGrow={1}
              gap={stackGap}
              justifyContent="space-between"
              testID={`${testID}-inner-end-box`}
            >
              {/** Middle */}
              <VStack gap={0.5} testID={`${testID}-content-box`}>
                <TextHeadline as="p" color={textColor} id={titleId} numberOfLines={2}>
                  {title}
                </TextHeadline>
                <TextBody as="p" color={textColor} numberOfLines={numberOfLines}>
                  {children}
                </TextBody>
              </VStack>
              {/** Actions */}
              {(!!clonedPrimaryAction || !!clonedSecondaryAction) && (
                <HStack
                  alignItems="center"
                  className={actionContainerStyle}
                  gap={4}
                  spacingVertical={1}
                  testID={`${testID}-action`}
                >
                  {clonedPrimaryAction}
                  {clonedSecondaryAction}
                </HStack>
              )}
            </Stack>
            {/** Dismissable action */}
            {showDismiss && (
              <Box alignItems="flex-start" className={customSpacing}>
                <Pressable
                  accessibilityHint="close banner"
                  accessibilityLabel="close"
                  background="transparent"
                  borderRadius="roundedFull"
                  onPress={handleOnDismiss}
                  role="button"
                  testID={`${testID}-dimiss-btn`}
                >
                  <Icon color={iconButtonColor} name="close" size="s" />
                </Pressable>
              </Box>
            )}
          </HStack>
        </Collapsible>
      );
    },
  ),
);
