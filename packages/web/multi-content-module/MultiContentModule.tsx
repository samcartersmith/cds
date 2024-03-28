import React, { forwardRef, isValidElement, memo, useMemo } from 'react';
import {
  IllustrationPictogramNames,
  MultiContentModuleBaseProps,
  ResponsiveProps,
} from '@cbhq/cds-common';
import { defaultMaxWidth } from '@cbhq/cds-common/tokens/multiContentModule';

import { Button } from '../buttons';
import { Pictogram } from '../illustrations';
import { Box, BoxElement, VStack, VStackProps } from '../layout';
import { type PressableProps } from '../system';
import { TextBody, TextTitle1 } from '../typography';

export type MultiContentModuleProps = MultiContentModuleBaseProps & {
  /** Callback fired when the action button pressed and cannot be used when `action` is a React Element */
  onActionPress?: PressableProps['onPress'];
} & Omit<VStackProps<BoxElement>, 'children'>;

export const MultiContentModule = memo(
  forwardRef(function MultiContentModule(
    {
      pictogram,
      title,
      description,
      children,
      action,
      onActionPress,
      actionAccessibilityLabel,
      end,
      bordered = false,
      testID,
      accessibilityLabel,
      maxWidth = defaultMaxWidth,
      responsiveConfig,
      style,
      ...props
    }: MultiContentModuleProps,
    ref: React.Ref<HTMLElement>,
  ) {
    const defaultResponsiveConfig = useMemo(
      () =>
        ({
          phone: {
            spacingHorizontal: bordered ? 4 : 0,
            spacingVertical: 4,
          },
          tablet: {
            spacing: 4,
          },
          desktop: {
            spacing: 4,
          },
        } as ResponsiveProps),
      [bordered],
    );

    return (
      <VStack
        ref={ref}
        accessibilityLabel={accessibilityLabel}
        background="background"
        borderRadius="roundedLarge"
        bordered={bordered}
        gap={2}
        maxWidth={maxWidth}
        responsiveConfig={responsiveConfig ?? defaultResponsiveConfig}
        style={style}
        testID={testID}
        {...props}
      >
        {typeof pictogram === 'string' ? (
          <Pictogram
            dimension="48x48"
            name={pictogram as IllustrationPictogramNames}
            testID={`${testID}-pictogram`}
          />
        ) : (
          pictogram
        )}
        {typeof title === 'string' ? <TextTitle1 as="h1">{title}</TextTitle1> : title}
        {typeof description === 'string' ? (
          <TextBody as="p" color="foregroundMuted" numberOfLines={3}>
            {description}
          </TextBody>
        ) : (
          description
        )}
        {!!children && (
          <Box display="block" testID={`${testID}-primary-content`}>
            {children}
          </Box>
        )}
        {action &&
          (isValidElement(action) ? (
            action
          ) : (
            <Button accessibilityLabel={actionAccessibilityLabel} onPress={onActionPress}>
              {action}
            </Button>
          ))}
        {end}
      </VStack>
    );
  }),
);
