import React, { forwardRef, isValidElement, memo, useCallback, useMemo, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { paletteValueToRgbaString } from '@cbhq/cds-common/palette/paletteValueToRgbaString';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';
import { variants } from '@cbhq/cds-common/tokens/banner';
import { BannerBaseProps } from '@cbhq/cds-common/types/BannerBaseProps';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import { SpacingScale } from '@cbhq/cds-common/types/SpacingScale';
import { isDevelopment } from '@cbhq/cds-utils';

import { Collapsible } from '../collapsible';
import { Icon } from '../icons';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Pressable } from '../system/Pressable';
import { Link, LinkProps } from '../typography';
import { TextBody } from '../typography/TextBody';
import { TextHeadline } from '../typography/TextHeadline';

// This custom spacing is necessary so that
// the iconButton and the icon can horizontally
// align with the text
const customSpacing = { paddingTop: 2 };

// TODO use a system like tokens/tags.ts#tagColorMap
const stylesForVariant = {
  warning: {
    light: {
      backgroundColor: paletteValueToRgbaString('red0', 'light', true),
      borderColor: paletteValueToRgbaString('red10', 'light', true),
    },
    dark: {
      backgroundColor: paletteValueToRgbaString('red0', 'dark', true),
      borderColor: paletteValueToRgbaString('red10', 'dark', true),
    },
  },
  promotional: {
    light: {
      borderColor: paletteValueToRgbaString('blue10', 'light', true),
    },
    dark: {
      borderColor: paletteValueToRgbaString('blue10', 'dark', true),
    },
  },
} as const;

export const Banner = memo(
  forwardRef(function Banner(
    {
      variant,
      startIcon,
      onClose,
      primaryAction,
      secondaryAction,
      title,
      children,
      showDismiss = false,
      bordered = true,
      borderRadius = 'rounded',
      testID,
      numberOfLines = 3,
    }: BannerBaseProps,
    forwardedRef: ForwardedRef<View>,
  ) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const spectrum = useSpectrum();

    // Measure and configure layout
    const { width } = useWindowDimensions();
    const isWide = useMemo(() => width > 724, [width]);
    const shouldUseVStack = useMemo(() => !isWide || showDismiss, [isWide, showDismiss]);
    // The nested Stack is referred to as Stack
    const Stack = useMemo(() => (shouldUseVStack ? VStack : HStack), [shouldUseVStack]);
    const stackGap: SpacingScale = useMemo(
      () => (isWide && primaryAction ? 3 : 1),
      [isWide, primaryAction],
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
      [primaryAction, isWide],
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
      if (isValidElement(primaryAction) && primaryAction?.type === Link) {
        return React.cloneElement(primaryAction, {
          variant: 'headline',
          color: primaryActionColor,
          testID: `${testID}-action--primary`,
          ...(primaryAction.props as LinkProps),
        });
      }

      // Throw warning in dev
      if (isValidElement(primaryAction) && isDevelopment()) {
        // eslint-disable-next-line no-console
        console.error('Banner primaryAction needs to be a CDS Link component');
      }

      return primaryAction;
    }, [primaryAction, primaryActionColor, testID]);
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

    // The first HStack is referred to as root
    const rootStyle = useMemo(() => {
      const shouldOverride = variant === 'warning' || variant === 'promotional';
      if (shouldOverride) return stylesForVariant[variant][spectrum];

      return undefined;
    }, [spectrum, variant]);

    return (
      <Collapsible testID={`${testID}-collapsible`} collapsed={isCollapsed} ref={forwardedRef}>
        <HStack
          // Consistent props
          gap={2}
          spacing={2}
          spacingBottom={spacingBottom}
          testID={testID}
          borderRadius={borderRadius}
          bordered={bordered}
          background={background}
          borderColor={borderColor}
          dangerouslySetStyle={rootStyle}
          flexShrink={1}
        >
          {/** Start */}
          <Icon
            testID={`${testID}-icon`}
            name={startIcon}
            size="s"
            dangerouslySetStyle={customSpacing}
            color={iconColor}
          />
          <Stack
            testID={`${testID}-inner-end-box`}
            justifyContent="space-between"
            flexGrow={1}
            flexShrink={1}
            gap={stackGap}
            alignItems={stackAlignment}
          >
            {/** Middle */}
            <VStack testID={`${testID}-content-box`} gap={0.5}>
              <TextHeadline numberOfLines={2} color={textColor}>
                {title}
              </TextHeadline>
              <TextBody numberOfLines={numberOfLines} color={textColor}>
                {children}
              </TextBody>
            </VStack>
            {/** Actions */}
            {(!!clonedPrimaryAction || !!clonedSecondaryAction) && (
              <HStack testID={`${testID}-action`} spacingVertical={1} alignItems="center" gap={4}>
                {clonedPrimaryAction}
                {clonedSecondaryAction}
              </HStack>
            )}
          </Stack>
          {/** Dismissable action */}
          {showDismiss && (
            <Box alignItems="flex-start" dangerouslySetStyle={customSpacing}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="close"
                accessibilityHint="close banner"
                onPress={handleOnDismiss}
                backgroundColor="transparent"
                borderRadius="round"
                testID={`${testID}-dimiss-btn`}
                hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}
              >
                <Icon size="s" name="close" color={iconButtonColor} />
              </Pressable>
            </Box>
          )}
        </HStack>
      </Collapsible>
    );
  }),
);
