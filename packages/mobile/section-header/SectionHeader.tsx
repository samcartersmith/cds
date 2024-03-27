import React, { forwardRef, memo, useMemo } from 'react';
import { View } from 'react-native';
import { SectionHeaderProps } from '@cbhq/cds-common';
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
      spacingHorizontal,
      spacingVertical,
      spacing,
      spacingBottom,
      spacingEnd,
      spacingStart,
      spacingTop,
    }: SectionHeaderProps,
    ref: React.Ref<View>,
  ) {
    const spacingProps = useMemo(
      () => ({
        spacing,
        spacingBottom,
        spacingEnd,
        spacingHorizontal: spacingHorizontal ?? 2,
        spacingStart,
        spacingTop,
        spacingVertical: spacingVertical ?? 2,
      }),
      [
        spacing,
        spacingBottom,
        spacingEnd,
        spacingHorizontal,
        spacingStart,
        spacingTop,
        spacingVertical,
      ],
    );
    return (
      <HStack
        ref={ref}
        accessibilityLabel={accessibilityLabel}
        flexWrap="wrap"
        gap={1}
        justifyContent="space-between"
        testID={testID as string}
        {...spacingProps}
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
              <Icon color="foreground" name={icon as UiIconName} size="xs" />
            ) : (
              icon
            )}
          </HStack>
          {typeof balance === 'string' ? <TextTitle3>{balance}</TextTitle3> : balance}
          {typeof description === 'string' ? (
            <TextBody color="foregroundMuted" numberOfLines={2}>
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
