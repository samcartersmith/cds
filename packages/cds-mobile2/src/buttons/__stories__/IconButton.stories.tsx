import React from 'react';
import { GestureResponderEvent } from 'react-native';
import names from '@cbhq/cds-icons/__generated__/ui/data/names';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { Box } from '../../layout/Box';
import { Text } from '../../typography/Text';
import { IconButton } from '../IconButton';

function onPress(event: GestureResponderEvent) {
  console.log('Pressed', event.type || 'GestureResponderEvent');
}

const iconName = 'arrowsHorizontal';
const variants = [
  {
    component: <IconButton accessibilityLabel={iconName} name={iconName} variant="primary" />,
    title: <Text>Primary</Text>,
  },
  {
    component: (
      <IconButton transparent accessibilityLabel={iconName} name={iconName} variant="primary" />
    ),
    title: <Text>Primary transparent</Text>,
  },
  {
    component: <IconButton accessibilityLabel={iconName} name={iconName} variant="secondary" />,
    title: <Text>Secondary</Text>,
  },
  {
    component: (
      <IconButton transparent accessibilityLabel={iconName} name={iconName} variant="secondary" />
    ),
    title: <Text>Secondary transparent</Text>,
  },
  {
    component: (
      <IconButton accessibilityLabel={iconName} name={iconName} variant="foregroundMuted" />
    ),
    title: <Text>ForegroundMuted</Text>,
  },
  {
    component: (
      <IconButton
        accessibilityLabel={iconName}
        name={iconName}
        style={{ padding: 10, borderRadius: 15, transform: 'scale(0.5)' }}
      />
    ),
    title: <Text>Custom style</Text>,
  },
  {
    component: (
      <IconButton
        transparent
        accessibilityLabel={iconName}
        name={iconName}
        variant="foregroundMuted"
      />
    ),
    title: <Text>ForegroundMuted transparent</Text>,
  },
];

const IconButtonScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Default">
        <IconButton accessibilityLabel={iconName} name={iconName} onPress={onPress} />
      </Example>

      <Example inline title="States">
        <Box alignItems="center" flexDirection="row" justifyContent="space-between" width={350}>
          <IconButton disabled accessibilityLabel={iconName} name={iconName} variant="primary" />
          <Text>Disabled primary</Text>
        </Box>

        <Box alignItems="center" flexDirection="row" justifyContent="space-between" width={350}>
          <IconButton disabled accessibilityLabel={iconName} name={iconName} />
          <Text>Disabled secondary</Text>
        </Box>
      </Example>

      <Example inline title="Variants">
        {variants.map((variant, index) => {
          return (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
              width={350}
            >
              {variant.component}
              {variant.title}
            </Box>
          );
        })}
      </Example>
      <Example title="All">
        {names.map((name) => {
          return (
            <HStack key={`icon-wrapper-${name}`} flexWrap="wrap" gap={2}>
              <IconButton accessibilityLabel={name} name={name} variant="primary" />
              <IconButton accessibilityLabel={name} name={name} variant="secondary" />
              <IconButton accessibilityLabel={name} name={name} variant="foregroundMuted" />
              <IconButton accessibilityLabel={name} name={name} />
            </HStack>
          );
        })}
      </Example>
    </ExampleScreen>
  );
};

export default IconButtonScreen;
