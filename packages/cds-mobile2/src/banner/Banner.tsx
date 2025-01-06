import React, { forwardRef, isValidElement, memo, useCallback, useMemo, useState } from 'react';
import { Animated, StyleProp, useWindowDimensions, View, ViewStyle } from 'react-native';
import { ThemeVars } from '@cbhq/cds-common2/new/vars';
import { variants } from '@cbhq/cds-common2/tokens/banner';
import { BannerBaseProps } from '@cbhq/cds-common2/types/BannerBaseProps';
import { ForwardedRef } from '@cbhq/cds-common2/types/ForwardedRef';
import { isDevelopment } from '@cbhq/cds-utils';

import { Collapsible } from '../collapsible/Collapsible';
import { useColorScheme } from '../hooks/useColorScheme';
import { Icon } from '../icons';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { useTheme } from '../system';
import { Pressable } from '../system/Pressable';
import { Link, LinkProps } from '../typography';
import { TextBody } from '../typography/TextBody';
import { TextHeadline } from '../typography/TextHeadline';

// This custom spacing is necessary so that
// the iconButton and the icon can horizontally
// align with the text
const customSpacing = { paddingTop: 4 };

// TODO use a system like tokens/tags.ts#tagColorMap
const stylesForVariant: Record<
  Exclude<BannerProps['variant'], 'danger' | 'informational'>,
  {
    light: {
      backgroundColor?: ThemeVars.SpectrumColor;
      borderColor: ThemeVars.SpectrumColor;
    };
    dark: {
      backgroundColor?: ThemeVars.SpectrumColor;
      borderColor: ThemeVars.SpectrumColor;
    };
  }
> = {
  warning: {
    light: {
      backgroundColor: 'red0',
      borderColor: 'red10',
    },
    dark: {
      backgroundColor: 'red0',
      borderColor: 'red10',
    },
  },
  promotional: {
    light: {
      borderColor: 'blue10',
    },
    dark: {
      borderColor: 'blue10',
    },
  },
  error: {
    light: {
      backgroundColor: 'yellow5',
      borderColor: 'yellow10',
    },
    dark: {
      backgroundColor: 'yellow15',
      borderColor: 'yellow10',
    },
  },
} as const;

export type BannerProps = BannerBaseProps & {
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

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
      borderRadius = 200,
      testID,
      numberOfLines = 3,
      style,
    }: BannerProps,
    forwardedRef: ForwardedRef<View>,
  ) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const theme = useTheme();
    const colorScheme = useColorScheme();

    // Measure and configure layout
    const { width } = useWindowDimensions();
    const isWide = useMemo(() => width > 724, [width]);
    const shouldUseVStack = useMemo(() => !isWide || showDismiss, [isWide, showDismiss]);
    // The nested Stack is referred to as Stack
    const Stack = useMemo(() => (shouldUseVStack ? VStack : HStack), [shouldUseVStack]);
    const stackGap = useMemo(() => (isWide && primaryAction ? 3 : 1), [isWide, primaryAction]);
    const stackAlignment = useMemo(
      () => (shouldUseVStack ? 'flex-start' : 'center'),
      [shouldUseVStack],
    );

    // Events
    const handleOnDismiss = useCallback(() => {
      setIsCollapsed(true);
      onClose?.();
    }, [onClose]);

    // Padding for a few regions is dynamic - we need dynamic configs
    const paddingBottom = useMemo(
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
          underline: variant === 'error',
          ...(primaryAction.props as LinkProps),
        });
      }

      // Throw warning in dev
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

    // The first HStack is referred to as root
    const rootStyle = useMemo(() => {
      const shouldOverride =
        variant === 'warning' || variant === 'promotional' || variant === 'error';
      if (shouldOverride) {
        const { backgroundColor, borderColor } = stylesForVariant[variant][colorScheme];
        return {
          backgroundColor: backgroundColor ? `rgb(${theme.spectrum[backgroundColor]})` : undefined,
          borderColor: `rgb(${theme.spectrum[borderColor]})`,
          ...(style as ViewStyle),
        };
      }

      return style;
    }, [colorScheme, variant, style, theme.spectrum]);

    // temporary fix for error banner
    const customIconColor = useMemo(
      () =>
        variant === 'error'
          ? {
              dangerouslySetColor: `rgb(${
                theme.spectrum[colorScheme === 'light' ? 'orange40' : 'orange70']
              })`,
            }
          : {},
      [variant, colorScheme, theme.spectrum],
    );

    return (
      <Collapsible ref={forwardedRef} collapsed={isCollapsed} testID={`${testID}-collapsible`}>
        <HStack
          // Consistent props
          background={background}
          borderColor={borderColor}
          borderRadius={borderRadius}
          bordered={bordered}
          flexShrink={1}
          gap={2}
          padding={2}
          paddingBottom={paddingBottom}
          style={rootStyle}
          testID={testID}
        >
          {/** Start */}
          <Icon
            accessibilityLabel={startIcon}
            color={iconColor}
            name={startIcon}
            size="s"
            style={customSpacing}
            testID={`${testID}-icon`}
            {...customIconColor}
          />
          <Stack
            alignItems={stackAlignment}
            flexGrow={1}
            flexShrink={1}
            gap={stackGap}
            justifyContent="space-between"
            testID={`${testID}-inner-end-box`}
          >
            {/** Middle */}
            <VStack gap={0.5} testID={`${testID}-content-box`}>
              <TextHeadline color={textColor} numberOfLines={2}>
                {title}
              </TextHeadline>
              <TextBody color={textColor} numberOfLines={numberOfLines}>
                {children}
              </TextBody>
            </VStack>
            {/** Actions */}
            {(!!clonedPrimaryAction || !!clonedSecondaryAction) && (
              <HStack alignItems="center" gap={4} paddingY={1} testID={`${testID}-action`}>
                {clonedPrimaryAction}
                {clonedSecondaryAction}
              </HStack>
            )}
          </Stack>
          {/** Dismissable action */}
          {showDismiss && (
            <Box alignItems="flex-start" style={customSpacing}>
              <Pressable
                accessibilityHint="close banner"
                accessibilityLabel="close"
                accessibilityRole="button"
                background="transparent"
                borderRadius={1000}
                hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}
                onPress={handleOnDismiss}
                testID={`${testID}-dimiss-btn`}
              >
                <Icon color={iconButtonColor} name="close" size="s" />
              </Pressable>
            </Box>
          )}
        </HStack>
      </Collapsible>
    );
  }),
);
