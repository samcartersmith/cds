import React from 'react';

import { Button } from '../../buttons';
import type { ThemeConfig } from '../../core/theme';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { VStack } from '../../layout/VStack';
import { defaultTheme } from '../../themes/defaultTheme';
import { TextBody } from '../../typography';
import { ThemeProvider } from '../ThemeProvider';

const Child = ({ expectedColorScheme }: { expectedColorScheme: string }) => {
  const { colorScheme } = useTheme();

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
    <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
      <Child expectedColorScheme="dark" />
    </ThemeProvider>
  );
};

const customLightTheme = {
  ...defaultTheme,
  light: {
    ...defaultTheme.light,
    backgroundSecondary: `rgb(${defaultTheme.lightSpectrum.blue50})`,
    backgroundPrimary: `rgb(${defaultTheme.lightSpectrum.red20})`,
    background: `rgb(${defaultTheme.lightSpectrum.orange50})`,
  },
} satisfies ThemeConfig;

const ChildThemeWithOverrides = () => {
  return (
    <ThemeProvider activeColorScheme="light" theme={customLightTheme}>
      <TextBody>With theme overrides</TextBody>
      <Child expectedColorScheme="light" />
    </ThemeProvider>
  );
};

const customDarkTheme = {
  ...defaultTheme,
  dark: {
    ...defaultTheme.dark,
    backgroundSecondary: `rgb(${defaultTheme.darkSpectrum.blue50})`,
    backgroundPrimary: `rgb(${defaultTheme.darkSpectrum.red20})`,
    background: `rgb(${defaultTheme.darkSpectrum.orange50})`,
  },
} satisfies ThemeConfig;

const ChildThemeWithOverridesDark = () => {
  return (
    <ThemeProvider activeColorScheme="dark" theme={customDarkTheme}>
      <TextBody>With theme overrides</TextBody>
      <Child expectedColorScheme="dark" />
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverrides = () => {
  return (
    <ThemeProvider activeColorScheme="light" theme={customLightTheme}>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <TextBody>With theme overrides</TextBody>
        <Child expectedColorScheme="light" />
      </ThemeProvider>
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverridesDark = () => {
  return (
    <ThemeProvider activeColorScheme="dark" theme={customDarkTheme}>
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
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
        <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
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
