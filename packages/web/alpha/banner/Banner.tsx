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
import { ForwardedRef, ResponsiveProps } from '@cbhq/cds-common';
import { bannerMinWidth, BannerVariantStyle, variants } from '@cbhq/cds-common/tokens/alphaBanner';
import { BannerBaseProps, BannerStyleVariant } from '@cbhq/cds-common/types/AlphaBannerBaseProps';
import { isDevelopment } from '@cbhq/cds-utils';

import { Collapsible } from '../../collapsible';
import { Icon } from '../../icons';
import { Box, BoxElement, HStack, HStackProps, Spacer, VStack } from '../../layout';
import { Pressable } from '../../system/Pressable';
import { Link, LinkProps } from '../../typography';
import { TextLabel1, TextLabel2, TextLegal } from '../../typography';
import { cx } from '../../utils/linaria';

const warningClassName = css`
  && {
    background-color: rgb(var(--orange0));
  }
`;

const contentResponsiveConfig: ResponsiveProps = {
  phone: {
    flexDirection: 'column',
  },
  tablet: {
    flexDirection: 'row',
  },
  desktop: {
    flexDirection: 'row',
  },
};

export type WebBannerProps = BannerBaseProps & Omit<HStackProps<BoxElement>, 'children'>;

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
        responsiveConfig,
        // offset
        offset,
        offsetVertical,
        offsetHorizontal,
        offsetTop,
        offsetBottom,
        offsetStart,
        offsetEnd,
        ...props
      }: WebBannerProps,
      forwardedRef: ForwardedRef<HTMLDivElement>,
    ) => {
      const [isCollapsed, setIsCollapsed] = useState(false);
      const titleId = useId();

      const accessibilityLabelledBy = useMemo(
        () => (typeof title === 'string' ? titleId : undefined),
        [title, titleId],
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
      }: BannerVariantStyle = variants[variant];

      const stackClassName = useMemo(
        () => cx(variant === 'warning' ? warningClassName : undefined, className),
        [className, variant],
      );

      // Events
      const handleOnDismiss = useCallback(() => {
        setIsCollapsed(true);
        onClose?.();
      }, [onClose]);

      // Ensure primaryActions are themed to match the variant
      const clonedPrimaryAction = useMemo(() => {
        if (isValidElement(primaryAction) && primaryAction.type === Link) {
          return React.cloneElement(primaryAction, {
            variant: 'label1',
            color: primaryActionColor,
            testID: `${testID}-action--primary`,
            ...(primaryAction.props as LinkProps),
          });
        }

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

      const actionContainerStyle: React.CSSProperties = useMemo(
        () => ({
          whiteSpace: 'nowrap',
        }),
        [],
      );

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

      const variantStyleProps: Record<BannerStyleVariant, HStackProps<BoxElement>> = useMemo(
        () => ({
          contextual: {
            spacingStart: 2,
            spacingEnd: 2,
            borderRadius: 'roundedLarge',
          },
          global: {
            spacingStart: 2,
            spacingEnd: 3,
            borderRadius: undefined,
            borderColor,
            style: {
              borderWidth: 0,
              borderLeftWidth: 4,
              ...style,
            },
          },
          inline: {
            spacingStart: 3,
            spacingEnd: 3,
            borderRadius: undefined,
          },
        }),
        [borderColor, style],
      );

      const content = (
        <Box flexGrow={1}>
          <HStack
            ref={forwardedRef}
            background={background}
            borderRadius="roundedLarge"
            className={stackClassName}
            flexGrow={1}
            gap={1}
            minWidth={bannerMinWidth}
            responsiveConfig={responsiveConfig}
            spacingVertical={2}
            style={style}
            testID={testID}
            {...(showDismiss ? {} : offsetStyles)}
            {...variantStyleProps[styleVariant]}
            {...props}
          >
            {/** Start */}
            <HStack spacing={0.5}>
              {styleVariant === 'global' && <Spacer horizontal={0.5} />}
              <Icon
                accessibilityLabel={startIconAccessibilityLabel}
                color={iconColor}
                name={startIcon}
                size="s"
                testID={`${testID}-icon`}
              />
            </HStack>
            <VStack
              flexGrow={1}
              gap={2}
              justifyContent="space-between"
              responsiveConfig={contentResponsiveConfig}
              testID={`${testID}-inner-end-box`}
            >
              {/** Middle */}
              <VStack gap={2} testID={`${testID}-content-box`}>
                <VStack gap={0.5}>
                  {typeof title === 'string' ? (
                    <TextLabel1 as="p" color={textColor} id={titleId} numberOfLines={2}>
                      {title}
                    </TextLabel1>
                  ) : (
                    title
                  )}
                  {typeof children === 'string' ? (
                    <TextLabel2 as="p" color={textColor} numberOfLines={numberOfLines}>
                      {children}
                    </TextLabel2>
                  ) : (
                    children
                  )}
                </VStack>
                {typeof label === 'string' ? (
                  <TextLegal as="p" color="foregroundMuted" numberOfLines={2}>
                    {label}
                  </TextLegal>
                ) : (
                  label
                )}
              </VStack>
              {/** Actions */}
              {(!!clonedPrimaryAction || !!clonedSecondaryAction) && (
                <HStack
                  alignItems="center"
                  gap={2}
                  style={actionContainerStyle}
                  testID={`${testID}-action`}
                >
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
        </Box>
      );

      return showDismiss ? (
        <Box display="block" {...offsetStyles}>
          <Collapsible
            accessibilityLabelledBy={accessibilityLabelledBy}
            collapsed={isCollapsed}
            id={`${titleId}--controller`}
            testID={`${testID}-collapsible`}
          >
            {content}
          </Collapsible>
        </Box>
      ) : (
        content
      );
    },
  ),
);
