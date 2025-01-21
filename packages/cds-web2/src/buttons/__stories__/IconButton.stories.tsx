import React from 'react';
import names from '@cbhq/cds-icons/__generated__/ui/data/names';

import { HStack, VStack } from '../../layout';
import { IconButton } from '../IconButton';

export const Default = () => (
  <VStack>
    <IconButton accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
    <IconButton accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
  </VStack>
);

export const WithoutCompactStyles = () => (
  <VStack>
    <IconButton accessibilityLabel="Horizontal arrows" compact={false} name="arrowsHorizontal" />
    <IconButton accessibilityLabel="Horizontal arrows" compact={false} name="arrowsHorizontal" />
  </VStack>
);

export const WithCustomStyle = () => (
  <VStack>
    <IconButton
      accessibilityLabel="Horizontal arrows"
      compact={false}
      name="arrowsHorizontal"
      // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
      style={{ backgroundColor: 'red', transform: 'scale(0.5)' }}
    />
  </VStack>
);

export const PrimaryDisabled = () => (
  <IconButton
    disabled
    accessibilityLabel="Horizontal arrows"
    name="arrowsHorizontal"
    variant="primary"
  />
);

export const SecondaryDisabled = () => (
  <IconButton disabled accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
);
export const Primary = () => (
  <VStack gap={2}>
    <IconButton accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" variant="primary" />
    <IconButton
      transparent
      accessibilityLabel="Horizontal arrows"
      name="arrowsHorizontal"
      variant="primary"
    />
  </VStack>
);

export const Secondary = () => (
  <VStack gap={2}>
    <IconButton accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
    <IconButton transparent accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
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
