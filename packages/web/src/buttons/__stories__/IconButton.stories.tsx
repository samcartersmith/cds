import React from 'react';
import names from '@cbhq/cds-icons/__generated__/ui/data/names';

import { HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { IconButton, type IconButtonBaseProps } from '../IconButton';

const iconName = 'arrowsHorizontal';
const accessibilityLabel = 'Horizontal arrows';

const variants = [
  {
    component: (props?: Partial<IconButtonBaseProps>) => (
      <IconButton name={iconName} variant="primary" {...props} />
    ),
    title: 'Primary',
  },
  {
    component: (props?: Partial<IconButtonBaseProps>) => (
      <IconButton transparent name={iconName} variant="primary" {...props} />
    ),
    title: 'Primary transparent',
  },
  {
    component: (props?: Partial<IconButtonBaseProps>) => (
      <IconButton name={iconName} variant="secondary" {...props} />
    ),
    title: 'Secondary',
  },
  {
    component: (props?: Partial<IconButtonBaseProps>) => (
      <IconButton transparent name={iconName} variant="secondary" {...props} />
    ),
    title: 'Secondary transparent',
  },
  {
    component: (props?: Partial<IconButtonBaseProps>) => (
      <IconButton name={iconName} variant="foregroundMuted" {...props} />
    ),
    title: 'ForegroundMuted',
  },
  {
    component: (props?: Partial<IconButtonBaseProps>) => (
      <IconButton transparent name={iconName} variant="foregroundMuted" {...props} />
    ),
    title: 'ForegroundMuted transparent',
  },
];

export const Default = () => (
  <VStack gap={6}>
    <VStack gap={2}>
      <Text font="title3">Basic Usage</Text>
      <IconButton accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
    </VStack>
    <VStack gap={2}>
      <Text font="title3">States</Text>
      <HStack alignItems="center" gap={4}>
        <IconButton
          disabled
          accessibilityLabel={accessibilityLabel}
          name={iconName}
          variant="primary"
        />
        <Text font="body">Disabled primary</Text>
      </HStack>
      <HStack alignItems="center" gap={4}>
        <IconButton disabled accessibilityLabel={accessibilityLabel} name={iconName} />
        <Text font="body">Disabled secondary</Text>
      </HStack>
    </VStack>
    <VStack gap={2}>
      <Text font="title3">Without Compact Styles</Text>
      <IconButton accessibilityLabel={accessibilityLabel} compact={false} name={iconName} />
    </VStack>
    <VStack gap={2}>
      <Text font="title3">Custom Style</Text>
      <IconButton
        accessibilityLabel={accessibilityLabel}
        compact={false}
        name={iconName}
        style={{ backgroundColor: 'red', transform: 'scale(0.5)' }}
      />
    </VStack>
    <VStack gap={2}>
      <Text font="title3">Variants</Text>
      {variants.map((variant, index) => (
        <HStack key={index} alignItems="center" gap={4}>
          {variant.component({ accessibilityLabel })}
          <Text font="body">{variant.title}</Text>
        </HStack>
      ))}
    </VStack>
    <VStack gap={2}>
      <Text font="title3">Variants Loading</Text>
      {variants.map((variant, index) => (
        <HStack key={index} alignItems="center" gap={4}>
          {variant.component({ accessibilityLabel, loading: true })}
          <Text font="body">{variant.title}</Text>
        </HStack>
      ))}
    </VStack>
  </VStack>
);

export const All1 = () => {
  const startIndex = 0;
  const endIndex = 160;

  return (
    <HStack flexWrap="wrap" gap={2} paddingBottom={2}>
      {names.slice(startIndex, endIndex).map((name) => {
        return (
          <VStack key={`icon-wrapper-${name}`} gap={2}>
            <HStack alignItems="center" gap={2}>
              <IconButton accessibilityLabel={name} name={name} variant="primary" />
              <IconButton accessibilityLabel={name} name={name} variant="secondary" />
              <IconButton accessibilityLabel={name} name={name} variant="foregroundMuted" />
              <IconButton accessibilityLabel={name} name={name} />
            </HStack>
          </VStack>
        );
      })}
    </HStack>
  );
};

export const All2 = () => {
  const startIndex = 160;
  const endIndex = 320;

  return (
    <HStack flexWrap="wrap" gap={2} paddingBottom={2}>
      {names.slice(startIndex, endIndex).map((name) => {
        return (
          <VStack key={`icon-wrapper-${name}`} gap={2}>
            <HStack alignItems="center" gap={2}>
              <IconButton accessibilityLabel={name} name={name} variant="primary" />
              <IconButton accessibilityLabel={name} name={name} variant="secondary" />
              <IconButton accessibilityLabel={name} name={name} variant="foregroundMuted" />
              <IconButton accessibilityLabel={name} name={name} />
            </HStack>
          </VStack>
        );
      })}
    </HStack>
  );
};

export default {
  title: 'Core Components/Buttons/IconButton',
  component: IconButton,
};
