import { IconButton } from '@cbhq/cds-mobile/buttons/IconButton';
import { Box } from '@cbhq/cds-mobile/layout/Box';
import { TextBody } from '@cbhq/cds-mobile/typography/TextBody';
import { GestureResponderEvent } from 'react-native';

import Example from './internal/Example';
import Screen from './internal/Screen';

function onPress(event: GestureResponderEvent) {
  console.log('Pressed', event.type || 'GestureResponderEvent');
}
const iconName = 'arrowsHorizontalHeavy';
const variants = [
  {
    component: <IconButton variant="primary" accessibilityLabel={iconName} name={iconName} />,
    title: <TextBody>Primary</TextBody>,
  },
  {
    component: <IconButton variant="secondary" accessibilityLabel={iconName} name={iconName} />,
    title: <TextBody>Secondary</TextBody>,
  },
];
const spacings = [
  {
    component: (
      <IconButton spacing={3} variant="primary" accessibilityLabel={iconName} name={iconName} />
    ),
    title: 'All',
  },
  {
    component: (
      <IconButton spacingTop={3} variant="primary" accessibilityLabel={iconName} name={iconName} />
    ),
    title: 'Top',
  },
  {
    component: (
      <IconButton
        spacingBottom={3}
        variant="primary"
        accessibilityLabel={iconName}
        name={iconName}
      />
    ),
    title: 'Bottom',
  },
  {
    component: (
      <IconButton
        spacingStart={3}
        variant="primary"
        accessibilityLabel={iconName}
        name={iconName}
      />
    ),
    title: 'Start',
  },
  {
    component: (
      <IconButton spacingEnd={3} variant="primary" accessibilityLabel={iconName} name={iconName} />
    ),
    title: 'End',
  },
  {
    component: (
      <IconButton
        spacingVertical={3}
        variant="primary"
        accessibilityLabel={iconName}
        name={iconName}
      />
    ),
    title: 'Vertical',
  },
  {
    component: (
      <IconButton
        spacingHorizontal={3}
        variant="primary"
        accessibilityLabel={iconName}
        name={iconName}
      />
    ),
    title: 'Horizontal',
  },
];

const IconButtonScreen = () => {
  return (
    <Screen>
      <Example title="Default" inline>
        <IconButton onPress={onPress} accessibilityLabel={iconName} name={iconName} />
      </Example>

      <Example title="States" inline>
        <Box flexDirection="row" alignItems="center" justifyContent="space-between" width={350}>
          <IconButton accessibilityLabel={iconName} disabled name={iconName} />
          <TextBody>Disabled</TextBody>
        </Box>
      </Example>

      <Example title="Variants" inline>
        {variants.map((variant, index) => {
          return (
            <Box
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

      <Example title="Spacing" inline>
        {spacings.map((spacing, index) => {
          return (
            <Box
              key={index}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width={350}
            >
              <Box background="backgroundAlternate">{spacing.component}</Box>
              <TextBody>{spacing.title}</TextBody>
            </Box>
          );
        })}
      </Example>
    </Screen>
  );
};

export default IconButtonScreen;
