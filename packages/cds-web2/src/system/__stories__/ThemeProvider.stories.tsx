import React from 'react';

import { Button } from '../../buttons';
import { ThemeConfig } from '../../core/theme';
import { useTheme } from '../../hooks/useTheme';
import { VStack } from '../../layout/VStack';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { ThemeProvider, useThemeProviderStyles } from '../ThemeProvider';

const Child = ({ expectedSpectrum }: { expectedSpectrum: string }) => {
  const theme = useTheme();
  const { className } = useThemeProviderStyles(theme);
  return (
    <VStack background="bg">
      <VStack gap={3} padding={1}>
        <VStack>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
          <Text as="p" color="bgSecondary" display="block" font="body">
            Secondary text
          </Text>
        </VStack>
        <VStack bordered background="bg" borderRadius={400} elevation={1} gap={1} padding={2}>
          <Text as="p" display="block" font="body">
            Elevation 1
          </Text>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
        </VStack>
        <VStack bordered background="bg" borderRadius={400} elevation={2} gap={1} padding={2}>
          <Text as="p" display="block" font="body">
            Elevation 2
          </Text>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
        </VStack>
        <Text as="p" display="block" font="body">
          ClassName value at nested ThemeProvider parent level: {className}
        </Text>
        <Text as="p" display="block" font="body">
          Should be {expectedSpectrum}
        </Text>
      </VStack>
    </VStack>
  );
};

const StyledThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const props = useThemeProviderStyles(theme);
  return (
    <div {...props} className={props.className}>
      {children}
    </div>
  );
};

const ChildThemeProviderDark = () => {
  const theme = useTheme();
  return (
    <ThemeProvider activeColorScheme="dark" theme={theme}>
      <StyledThemeProvider>
        <Child expectedSpectrum="dark" />
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

const customTheme: ThemeConfig = {
  ...defaultTheme,
  light: {
    ...defaultTheme.light,
    bg: `rgb(${defaultTheme.lightSpectrum.orange50})`,
    bgPrimary: `rgb(${defaultTheme.lightSpectrum.red20})`,
    bgSecondary: `rgb(${defaultTheme.lightSpectrum.blue50})`,
  },
  dark: {
    ...defaultTheme.dark,
    bg: `rgb(${defaultTheme.darkSpectrum.orange50})`,
    bgPrimary: `rgb(${defaultTheme.darkSpectrum.red20})`,
    bgSecondary: `rgb(${defaultTheme.darkSpectrum.blue50})`,
  },
};

const ChildThemeWithOverrides = () => {
  const theme = useTheme();
  return (
    <ThemeProvider activeColorScheme={theme.colorScheme} theme={customTheme}>
      <Text as="p" display="block" font="body">
        With theme overrides
      </Text>
      <Child expectedSpectrum="light" />
    </ThemeProvider>
  );
};

const ChildThemeWithOverridesDark = () => {
  return (
    <ThemeProvider activeColorScheme="dark" theme={customTheme}>
      <Text as="p" display="block" font="body">
        With theme overrides
      </Text>
      <Child expectedSpectrum="dark" />
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverrides = () => {
  const theme = useTheme();
  return (
    <ThemeProvider activeColorScheme={theme.colorScheme} theme={customTheme}>
      <ThemeProvider activeColorScheme="light" theme={theme}>
        <Text as="p" display="block" font="body">
          With nested theme overrides
        </Text>
        <Child expectedSpectrum="light" />
      </ThemeProvider>
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverridesDark = () => {
  const theme = useTheme();
  return (
    <ThemeProvider activeColorScheme="dark" theme={customTheme}>
      <ThemeProvider activeColorScheme="dark" theme={theme}>
        <Text as="p" display="block" font="body">
          With nested theme overrides
        </Text>
        <Child expectedSpectrum="dark" />
      </ThemeProvider>
    </ThemeProvider>
  );
};

export const ThemeProviderTest = () => {
  const theme = useTheme();
  return (
    <ThemeProvider activeColorScheme="light" theme={theme}>
      <VStack gap={3}>
        <Child expectedSpectrum="light" />
        <ChildThemeProviderDark />
        <ChildThemeWithOverrides />
        <ChildThemeWithOverridesDark />
        <ChildThemeWithNestedOverrides />
        <ChildThemeWithNestedOverridesDark />
      </VStack>
    </ThemeProvider>
  );
};

ThemeProviderTest.parameters = {
  a11y: {
    config: {
      /**
       * Color contrast ratio doesn't need to meet 4.5:1, as these are test examples for color override
       * @link https://dequeuniversity.com/rules/axe/4.3/color-contrast
       */
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export default {
  title: 'Core Components/ThemeProvider',
};
