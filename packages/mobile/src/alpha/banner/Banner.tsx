import React, { forwardRef, isValidElement, memo, useCallback, useMemo, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { paletteValueToRgbaString } from '@cbhq/cds-common/palette/paletteValueToRgbaString';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';
import { variants } from '@cbhq/cds-common/tokens/alphaBanner';
import { BannerBaseProps, BannerStyleVariant } from '@cbhq/cds-common/types/AlphaBannerBaseProps';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import { isDevelopment } from '@cbhq/cds-utils';

import { Collapsible } from '../../collapsible/Collapsible';
import { usePalette } from '../../hooks/usePalette';
import { Icon } from '../../icons';
import { Box, HStack, HStackProps, VStack } from '../../layout';
import { Pressable } from '../../system/Pressable';
import { Link, LinkProps } from '../../typography';
import { TextLabel1, TextLabel2, TextLegal } from '../../typography';

const variantStyleProps: Record<BannerStyleVariant, HStackProps> = {
  contextual: {
    spacingHorizontal: 2,
    borderRadius: 'roundedLarge',
  },
  global: {
    spacingHorizontal: 3,
    borderRadius: undefined,
  },
  inline: {
    spacingHorizontal: 3,
    borderRadius: undefined,
  },
};

export type MobileBannerProps = BannerBaseProps & Omit<HStackProps, 'children'>;

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
      testID,
      numberOfLines = 3,
      style,
      label,
      styleVariant = 'contextual',
      startIconAccessibilityLabel,
      closeAccessibilityLabel,
      // offset
      offset,
      offsetVertical,
      offsetHorizontal,
      offsetTop,
      offsetBottom,
      offsetStart,
      offsetEnd,
      ...props
    }: MobileBannerProps,
    forwardedRef: ForwardedRef<View>,
  ) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const spectrum = useSpectrum();
    const palette = usePalette();

    // Events
    const handleOnDismiss = useCallback(() => {
      setIsCollapsed(true);
      onClose?.();
    }, [onClose]);

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
          variant: 'label1',
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
          variant: 'label1',
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

    const offsetStyles = useMemo(
      () => ({
        offset,
        offsetVertical,
        offsetHorizontal,
        offsetTop,
        offsetBottom,
        offsetStart,
        offsetEnd,
      }),
      [offset, offsetVertical, offsetHorizontal, offsetTop, offsetBottom, offsetStart, offsetEnd],
    );

    // The first HStack is referred to as root
    const rootStyle = useMemo(() => {
      return {
        // todo: remove this override when token is available
        ...(variant === 'warning'
          ? {
              backgroundColor: paletteValueToRgbaString('orange0', spectrum),
            }
          : {}),
        ...(style as ViewStyle),
      };
    }, [spectrum, variant, style]);

    const borderBox = <Box dangerouslySetBackground={palette[borderColor]} pin="left" width={4} />;

    const content = (
      <Box {...(showDismiss ? {} : offsetStyles)}>
        <HStack
          ref={forwardedRef}
          background={background}
          borderRadius="roundedLarge"
          gap={1}
          spacingVertical={2}
          style={rootStyle}
          testID={testID}
          {...variantStyleProps[styleVariant]}
          {...props}
        >
          {/** Start */}
          <Box
            accessibilityLabel={startIconAccessibilityLabel}
            accessibilityRole="image"
            accessible={!!startIconAccessibilityLabel}
          >
            <Icon
              color={iconColor}
              name={startIcon}
              size="s"
              spacing={0.5}
              testID={`${testID}-icon`}
            />
          </Box>
          <VStack
            flexGrow={1}
            flexShrink={1}
            gap={2}
            justifyContent="space-between"
            testID={`${testID}-inner-end-box`}
          >
            {/** Middle */}
            <VStack gap={2} testID={`${testID}-content-box`}>
              <VStack gap={0.5}>
                {typeof title === 'string' ? (
                  <TextLabel1 color={textColor} numberOfLines={2}>
                    {title}
                  </TextLabel1>
                ) : (
                  title
                )}
                {typeof children === 'string' ? (
                  <TextLabel2 color={textColor} numberOfLines={numberOfLines}>
                    {children}
                  </TextLabel2>
                ) : (
                  children
                )}
              </VStack>
              {typeof label === 'string' ? (
                <TextLegal color="foregroundMuted" numberOfLines={1}>
                  {label}
                </TextLegal>
              ) : (
                label
              )}
            </VStack>
            {/** Actions */}
            {(!!clonedPrimaryAction || !!clonedSecondaryAction) && (
              <HStack alignItems="center" gap={2} testID={`${testID}-action`}>
                {clonedPrimaryAction}
                {clonedSecondaryAction}
              </HStack>
            )}
          </VStack>
          {/** Dismissable action */}
          {showDismiss && (
            <Box alignItems="flex-start" spacing={0.5}>
              <Pressable
                accessibilityLabel={closeAccessibilityLabel}
                accessibilityRole="button"
                background="transparent"
                borderRadius="roundedFull"
                hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}
                onPress={handleOnDismiss}
                testID={`${testID}-dimiss-btn`}
              >
                <Icon color={iconButtonColor} name="close" size="s" />
              </Pressable>
            </Box>
          )}
        </HStack>
        {styleVariant === 'global' && !showDismiss && borderBox}
      </Box>
    );

    return showDismiss ? (
      <Box {...offsetStyles}>
        <Collapsible collapsed={isCollapsed} testID={`${testID}-collapsible`}>
          {content}
        </Collapsible>
        {styleVariant === 'global' && borderBox}
      </Box>
    ) : (
      content
    );
  }),
);
