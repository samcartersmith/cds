import React from 'react';

import { Button } from '../../buttons';
import { ThemeConfig } from '../../core/theme';
import { useTheme } from '../../hooks/useTheme';
import { VStack } from '../../layout/VStack';
import { defaultTheme } from '../../themes/defaultTheme';
import { TextBody } from '../../typography/TextBody';
import { ThemeProvider, useThemeProviderStyles } from '../ThemeProvider';

const Child = ({ expectedSpectrum }: { expectedSpectrum: string }) => {
  const theme = useTheme();
  const { className } = useThemeProviderStyles(theme);
  return (
    <VStack>
      <VStack gap={3} padding={1}>
        <VStack>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
          <TextBody as="p" color="backgroundSecondary">
            Secondary text
          </TextBody>
        </VStack>
        <VStack bordered borderRadius={400} elevation={1} gap={1} padding={2}>
          <TextBody as="p">Elevation 1</TextBody>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
        </VStack>
        <VStack bordered borderRadius={400} elevation={2} gap={1} padding={2}>
          <TextBody as="p">Elevation 2</TextBody>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
        </VStack>
        <TextBody as="p">
          ClassName value at nested ThemeProvider parent level: {className}
        </TextBody>
        <TextBody as="p">Should be {expectedSpectrum}</TextBody>
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
    backgroundSecondary: 'rgb(var(--blue50))',
    backgroundPrimary: 'rgb(var(--red20))',
    background: 'rgb(var(--orange50))',
  },
  dark: {
    ...defaultTheme.dark,
    backgroundSecondary: 'rgb(var(--blue50))',
    backgroundPrimary: 'rgb(var(--red20))',
    background: 'rgb(var(--orange50))',
  },
};

const ChildThemeWithOverrides = () => {
  const theme = useTheme();
  return (
    <ThemeProvider activeColorScheme={theme.colorScheme} theme={customTheme}>
      <TextBody as="p">With theme overrides</TextBody>
      <Child expectedSpectrum="light" />
    </ThemeProvider>
  );
};

const ChildThemeWithOverridesDark = () => {
  return (
    <ThemeProvider activeColorScheme="dark" theme={customTheme}>
      <TextBody as="p">With theme overrides</TextBody>
      <Child expectedSpectrum="dark" />
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverrides = () => {
  const theme = useTheme();
  return (
    <ThemeProvider activeColorScheme={theme.colorScheme} theme={customTheme}>
      <ThemeProvider activeColorScheme="light" theme={theme}>
        <TextBody as="p">With nested theme overrides</TextBody>
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
        <TextBody as="p">With nested theme overrides</TextBody>
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
