import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { TextBody } from '../../typography/TextBody';
import { IconButton } from '../IconButton';

function onPress(event: GestureResponderEvent) {
  console.log('Pressed', event.type || 'GestureResponderEvent');
}

const iconName = 'arrowsHorizontal';
const variants = [
  {
    component: <IconButton accessibilityLabel={iconName} name={iconName} variant="primary" />,
    title: <TextBody>Primary</TextBody>,
  },
  {
    component: (
      <IconButton transparent accessibilityLabel={iconName} name={iconName} variant="primary" />
    ),
    title: <TextBody>Primary transparent</TextBody>,
  },
  {
    component: <IconButton accessibilityLabel={iconName} name={iconName} variant="secondary" />,
    title: <TextBody>Secondary</TextBody>,
  },
  {
    component: (
      <IconButton transparent accessibilityLabel={iconName} name={iconName} variant="secondary" />
    ),
    title: <TextBody>Secondary transparent</TextBody>,
  },
  {
    component: (
      <IconButton accessibilityLabel={iconName} name={iconName} variant="foregroundMuted" />
    ),
    title: <TextBody>ForegroundMuted</TextBody>,
  },
  {
    component: (
      <IconButton
        accessibilityLabel={iconName}
        name={iconName}
        style={{ padding: 10, borderRadius: 15, transform: 'scale(0.5)' }}
      />
    ),
    title: <TextBody>Custom style</TextBody>,
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
    title: <TextBody>ForegroundMuted transparent</TextBody>,
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
          <TextBody>Disabled primary</TextBody>
        </Box>

        <Box alignItems="center" flexDirection="row" justifyContent="space-between" width={350}>
          <IconButton disabled accessibilityLabel={iconName} name={iconName} />
          <TextBody>Disabled secondary</TextBody>
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
    </ExampleScreen>
  );
};

export default IconButtonScreen;
