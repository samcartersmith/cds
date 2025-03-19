import React, {
  forwardRef,
  isValidElement,
  memo,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react';
import { css, cx } from '@linaria/core';
import { bannerMinWidth, BannerVariantStyle, variants } from '@cbhq/cds-common2/tokens/banner';
import { BannerBaseProps, BannerStyleVariant } from '@cbhq/cds-common2/types/BannerBaseProps';
import { isDevelopment } from '@cbhq/cds-utils';

import { Collapsible } from '../collapsible';
import { Icon } from '../icons/Icon';
import { Box, BoxDefaultElement, HStack, HStackProps, VStack } from '../layout';
import type { ResponsiveProps, StaticStyleProps } from '../styles/styleProps';
import { Pressable } from '../system/Pressable';
import { Link, LinkDefaultElement, LinkProps } from '../typography/Link';
import { Text } from '../typography/Text';

const warningStyle = css`
  background-color: rgb(var(--orange0));
`;

const actionContainerStyle = css`
  white-space: nowrap;
`;

export const contentResponsiveConfig: ResponsiveProps<StaticStyleProps>['flexDirection'] = {
  phone: 'column',
  tablet: 'row',
  desktop: 'row',
} as const;

const variantStyleProps: Record<BannerStyleVariant, HStackProps<React.ElementType>> = {
  contextual: {
    paddingX: 2,
    borderRadius: 400,
  },
  global: {
    paddingX: 3,
    borderRadius: undefined,
  },
  inline: {
    paddingX: 3,
    borderRadius: undefined,
  },
};

export type BannerProps = BannerBaseProps &
  Omit<HStackProps<BoxDefaultElement>, 'children' | 'title'>;

export const Banner = memo(
  forwardRef(
    (
      {
        variant,
        borderRadius = 400,
        bordered = true,
        startIcon,
        onClose,
        primaryAction,
        secondaryAction,
        title,
        children,
        showDismiss = false,
        testID,
        style,
        className,
        numberOfLines = 3,
        label,
        styleVariant = 'contextual',
        startIconAccessibilityLabel,
        closeAccessibilityLabel,
        margin,
        marginY,
        marginX,
        marginTop,
        marginBottom,
        marginStart,
        marginEnd,
        ...props
      }: BannerProps,
      ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const [isCollapsed, setIsCollapsed] = useState(false);
      const titleId = useId();

      const accessibilityLabelledBy = typeof title === 'string' ? titleId : undefined;

      // Setup color configs
      const {
        iconColor,
        textColor,
        background,
        primaryActionColor,
        secondaryActionColor,
        iconButtonColor,
        borderColor,
      }: BannerVariantStyle = variants[variant];

      const stackClassName = cx(variant === 'warning' && warningStyle, className);

      // Events
      const handleOnDismiss = useCallback(() => {
        setIsCollapsed(true);
        onClose?.();
      }, [onClose]);

      // Ensure primaryActions are themed to match the variant
      const clonedPrimaryAction = useMemo(() => {
        if (
          isValidElement<LinkProps<LinkDefaultElement>>(primaryAction) &&
          primaryAction.type === Link
        ) {
          return React.cloneElement(primaryAction, {
            font: 'label1',
            color: primaryActionColor,
            testID: `${testID}-action--primary`,
            ...primaryAction.props,
          });
        }

        if (isValidElement(primaryAction) && isDevelopment()) {
          console.error('Banner primaryAction needs to be a CDS Link component');
        }

        return primaryAction;
      }, [primaryAction, primaryActionColor, testID]);

      const clonedSecondaryAction = useMemo(() => {
        if (
          isValidElement<LinkProps<LinkDefaultElement>>(secondaryAction) &&
          secondaryAction.type === Link
        ) {
          return React.cloneElement(secondaryAction, {
            font: 'label1',
            color: secondaryActionColor,
            testID: `${testID}-action--secondary`,
            ...secondaryAction.props,
          });
        }

        if (isValidElement(secondaryAction) && isDevelopment()) {
          console.error('Banner secondaryAction needs to be a CDS Link component');
        }

        return secondaryAction;
      }, [secondaryAction, secondaryActionColor, testID]);

      const marginStyles = useMemo(
        () => ({
          margin,
          marginY,
          marginX,
          marginTop,
          marginBottom,
          marginStart,
          marginEnd,
        }),
        [margin, marginX, marginY, marginStart, marginEnd, marginTop, marginBottom],
      );

      const borderBox = useMemo(
        () => <Box background={borderColor} pin="left" width={4} />,
        [borderColor],
      );

      const content = (
        <Box flexGrow={1} position="relative" {...(!showDismiss && marginStyles)}>
          <HStack
            ref={ref}
            background={background}
            borderRadius={borderRadius}
            bordered={bordered}
            className={stackClassName}
            flexGrow={1}
            gap={1}
            minWidth={bannerMinWidth}
            paddingY={2}
            style={style}
            testID={testID}
            {...variantStyleProps[styleVariant]}
            {...props}
          >
            {/** Start */}
            <Box padding={0.5}>
              <Icon
                accessibilityLabel={startIconAccessibilityLabel}
                color={iconColor}
                name={startIcon}
                size="s"
                testID={`${testID}-icon`}
              />
            </Box>
            <VStack
              flexDirection={contentResponsiveConfig}
              flexGrow={1}
              gap={2}
              justifyContent="space-between"
              testID={`${testID}-inner-end-box`}
            >
              {/** Middle */}
              <VStack gap={2} testID={`${testID}-content-box`}>
                <VStack gap={0.5}>
                  {typeof title === 'string' ? (
                    <Text color={textColor} font="label1" id={titleId} numberOfLines={2}>
                      {title}
                    </Text>
                  ) : (
                    title
                  )}
                  {typeof children === 'string' ? (
                    <Text color={textColor} font="label2" numberOfLines={numberOfLines}>
                      {children}
                    </Text>
                  ) : (
                    children
                  )}
                </VStack>
                {typeof label === 'string' ? (
                  <Text color="fgMuted" font="legal" numberOfLines={2}>
                    {label}
                  </Text>
                ) : (
                  label
                )}
              </VStack>
              {/** Actions */}
              {(!!clonedPrimaryAction || !!clonedSecondaryAction) && (
                <HStack
                  alignItems="center"
                  className={actionContainerStyle}
                  gap={2}
                  testID={`${testID}-action`}
                >
                  {clonedPrimaryAction}
                  {clonedSecondaryAction}
                </HStack>
              )}
            </VStack>
            {/** Dismissable action */}
            {showDismiss && (
              <Box alignItems="flex-start" padding={0.5}>
                <Pressable
                  accessibilityLabel={closeAccessibilityLabel}
                  background="transparent"
                  borderRadius={1000}
                  onClick={handleOnDismiss}
                  role="button"
                  testID={`${testID}-dismiss-btn`}
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
        <Box display="block" position="relative" {...marginStyles}>
          <Collapsible
            accessibilityLabelledBy={accessibilityLabelledBy}
            collapsed={isCollapsed}
            id={`${titleId}--controller`}
            testID={`${testID}-collapsible`}
          >
            {content}
          </Collapsible>
          {styleVariant === 'global' && borderBox}
        </Box>
      ) : (
        content
      );
    },
  ),
);
