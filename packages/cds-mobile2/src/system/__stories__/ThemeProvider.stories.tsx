import React from 'react';

import { Button } from '../../buttons';
import { Theme } from '../../core/theme';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useColorScheme } from '../../hooks/useColorScheme';
import { VStack } from '../../layout/VStack';
import { darkTheme } from '../../themes/dark';
import { lightTheme } from '../../themes/light';
import { TextBody } from '../../typography';
import { ThemeProvider } from '../ThemeProvider';

const Child = ({ expectedColorScheme }: { expectedColorScheme: string }) => {
  const colorScheme = useColorScheme();

  return (
    <VStack background="background">
      <VStack gap={3} padding={1}>
        <VStack>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
          <TextBody color="backgroundSecondary">Secondary text</TextBody>
        </VStack>
        <VStack
          bordered
          background="background"
          borderRadius={200}
          elevation={1}
          gap={1}
          padding={2}
        >
          <TextBody>Elevation 1</TextBody>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
        </VStack>
        <VStack
          bordered
          background="background"
          borderRadius={200}
          elevation={2}
          gap={1}
          padding={2}
        >
          <TextBody>Elevation 2</TextBody>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
        </VStack>
        <TextBody>Spectrum value at parent level: {colorScheme}</TextBody>
        <TextBody>Should be {expectedColorScheme}</TextBody>
      </VStack>
    </VStack>
  );
};

const ChildThemeProviderDark = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Child expectedColorScheme="dark" />
    </ThemeProvider>
  );
};

const customLightTheme = {
  ...lightTheme,
  color: {
    ...lightTheme.color,
    backgroundSecondary: 'blue50',
    backgroundPrimary: 'red20',
    background: 'orange50',
  },
} satisfies Theme;

const ChildThemeWithOverrides = () => {
  return (
    <ThemeProvider theme={customLightTheme}>
      <TextBody>With theme overrides</TextBody>
      <Child expectedColorScheme="light" />
    </ThemeProvider>
  );
};

const customDarkTheme = {
  ...darkTheme,
  color: {
    ...darkTheme.color,
    backgroundSecondary: 'blue50',
    backgroundPrimary: 'red20',
    background: 'orange50',
  },
} satisfies Theme;

const ChildThemeWithOverridesDark = () => {
  return (
    <ThemeProvider theme={customDarkTheme}>
      <TextBody>With theme overrides</TextBody>
      <Child expectedColorScheme="dark" />
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverrides = () => {
  return (
    <ThemeProvider theme={customLightTheme}>
      <ThemeProvider theme={lightTheme}>
        <TextBody>With theme overrides</TextBody>
        <Child expectedColorScheme="light" />
      </ThemeProvider>
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverridesDark = () => {
  return (
    <ThemeProvider theme={customDarkTheme}>
      <ThemeProvider theme={darkTheme}>
        <TextBody>With theme overrides</TextBody>
        <Child expectedColorScheme="dark" />
      </ThemeProvider>
    </ThemeProvider>
  );
};

const ThemeProviderTest = () => {
  return (
    <ExampleScreen>
      <Example title="Nested ThemeProviders">
        <ThemeProvider theme={lightTheme}>
          <VStack gap={3}>
            <Child expectedColorScheme="light" />
            <ChildThemeProviderDark />
            <ChildThemeWithOverrides />
            <ChildThemeWithOverridesDark />
            <ChildThemeWithNestedOverrides />
            <ChildThemeWithNestedOverridesDark />
          </VStack>
        </ThemeProvider>
      </Example>
    </ExampleScreen>
  );
};

export default ThemeProviderTest;
