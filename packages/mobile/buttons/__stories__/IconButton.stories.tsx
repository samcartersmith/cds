/* eslint-disable react-native-a11y/has-accessibility-hint */
import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { TextBody } from '../../typography/TextBody';
import { IconButton } from '../IconButton';

function onPress(event: GestureResponderEvent) {
  // eslint-disable-next-line no-console
  console.log('Pressed', event.type || 'GestureResponderEvent');
}

const iconName = 'arrowsHorizontal';
const variants = [
  {
    component: <IconButton variant="primary" accessibilityLabel={iconName} name={iconName} />,
    title: <TextBody>Primary</TextBody>,
  },
  {
    component: (
      <IconButton transparent variant="primary" accessibilityLabel={iconName} name={iconName} />
    ),
    title: <TextBody>Primary transparent</TextBody>,
  },
  {
    component: <IconButton variant="secondary" accessibilityLabel={iconName} name={iconName} />,
    title: <TextBody>Secondary</TextBody>,
  },
  {
    component: (
      <IconButton transparent variant="secondary" accessibilityLabel={iconName} name={iconName} />
    ),
    title: <TextBody>Secondary transparent</TextBody>,
  },
  {
    component: (
      <IconButton variant="foregroundMuted" accessibilityLabel={iconName} name={iconName} />
    ),
    title: <TextBody>ForegroundMuted</TextBody>,
  },
  {
    component: (
      <IconButton
        transparent
        variant="foregroundMuted"
        accessibilityLabel={iconName}
        name={iconName}
      />
    ),
    title: <TextBody>ForegroundMuted transparent</TextBody>,
  },
];

const IconButtonScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default" inline>
        <IconButton onPress={onPress} accessibilityLabel={iconName} name={iconName} />
      </Example>

      <Example title="States" inline>
        <Box flexDirection="row" alignItems="center" justifyContent="space-between" width={350}>
          <IconButton accessibilityLabel={iconName} disabled name={iconName} variant="primary" />
          <TextBody>Disabled primary</TextBody>
        </Box>

        <Box flexDirection="row" alignItems="center" justifyContent="space-between" width={350}>
          <IconButton accessibilityLabel={iconName} disabled name={iconName} />
          <TextBody>Disabled secondary</TextBody>
        </Box>
      </Example>

      <Example title="Variants" inline>
        {variants.map((variant, index) => {
          return (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              flexDirection="row"
              alignItems="center"
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
