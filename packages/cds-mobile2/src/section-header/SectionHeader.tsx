import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { SectionHeaderProps } from '@cbhq/cds-common2';
import { UiIconName } from '@cbhq/cds-icons';

import { Icon } from '../icons';
import { HStack, VStack } from '../layout';
import { TextBody, TextTitle3 } from '../typography';

export const SectionHeader = memo(
  forwardRef(function SectionHeader(
    {
      title,
      start,
      icon,
      testID,
      balance,
      description,
      end,
      accessibilityLabel,
      padding = 2,
      ...props
    }: SectionHeaderProps,
    ref: React.Ref<View>,
  ) {
    return (
      <HStack
        ref={ref}
        accessibilityLabel={accessibilityLabel}
        flexWrap="wrap"
        gap={1}
        justifyContent="space-between"
        padding={padding}
        testID={testID as string}
        {...props}
      >
        <VStack gap={0.5}>
          <HStack alignItems="center" gap={1}>
            {!!start && start}
            {typeof title === 'string' ? (
              <TextTitle3 accessibilityRole="header">{title}</TextTitle3>
            ) : (
              title
            )}
            {typeof icon === 'string' ? (
              <Icon color="fg" name={icon as UiIconName} size="xs" />
            ) : (
              icon
            )}
          </HStack>
          {typeof balance === 'string' ? <TextTitle3>{balance}</TextTitle3> : balance}
          {typeof description === 'string' ? (
            <TextBody color="fgMuted" numberOfLines={2}>
              {description}
            </TextBody>
          ) : (
            description
          )}
        </VStack>
        {!!end && <HStack>{end}</HStack>}
      </HStack>
    );
  }),
);
