import React, { forwardRef, isValidElement, memo } from 'react';
import { View } from 'react-native';
import { IllustrationPictogramNames, MultiContentModuleBaseProps } from '@cbhq/cds-common2';

import { Button } from '../buttons';
import { Pictogram } from '../illustrations';
import { Box, VStack, VStackProps } from '../layout';
import { type PressableProps } from '../system';
import { Text } from '../typography/Text';

export type MultiContentModuleProps = MultiContentModuleBaseProps & {
  /** Callback fired when the action button pressed and cannot be used when `action` is a React Element */
  onActionPress?: PressableProps['onPress'];
} & Omit<VStackProps, 'children'>;

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
      style,
      ...props
    }: MultiContentModuleProps,
    ref: React.Ref<View>,
  ) {
    return (
      <VStack
        ref={ref}
        accessibilityLabel={accessibilityLabel}
        borderRadius={400}
        bordered={bordered}
        flexGrow={1}
        gap={2}
        paddingY={4}
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
        {typeof title === 'string' ? <Text font="title1">{title}</Text> : title}
        {typeof description === 'string' ? (
          <Text color="fgMuted" font="body" numberOfLines={3}>
            {description}
          </Text>
        ) : (
          description
        )}
        <Box flexGrow={1} testID={`${testID}-primary-content`}>
          {children}
        </Box>
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
