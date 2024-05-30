import React from 'react';
import { PartialPaletteConfig, useSpectrum } from '@cbhq/cds-common';

import { Button } from '../../buttons';
import { VStack } from '../../layout/VStack';
import { TextBody } from '../../typography';
import { ThemeProvider } from '../ThemeProvider';
import { useThemeProviderStyles } from '../useThemeProviderStyles';

const Child = ({ expectedSpectrum }: { expectedSpectrum: string }) => {
  const spectrum = useSpectrum();
  const { className } = useThemeProviderStyles();

  return (
    <VStack background>
      <VStack gap={3} spacing={1}>
        <VStack>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
          <TextBody as="p" color="secondary">
            Secondary text
          </TextBody>
        </VStack>
        <VStack background bordered borderRadius="rounded" elevation={1} gap={1} spacing={2}>
          <TextBody as="p">Elevation 1</TextBody>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
        </VStack>
        <VStack background bordered borderRadius="rounded" elevation={2} gap={1} spacing={2}>
          <TextBody as="p">Elevation 2</TextBody>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
        </VStack>
        <TextBody as="p">Spectrum value at parent level: {spectrum}</TextBody>
        <TextBody as="p">
          ClassName value at nested ThemeProvider parent level: {className}
        </TextBody>
        <TextBody as="p">Should be {expectedSpectrum}</TextBody>
      </VStack>
    </VStack>
  );
};

const StyledThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const props = useThemeProviderStyles();
  return (
    <div {...props} className={props.className}>
      {children}
    </div>
  );
};

const ChildThemeProviderDark = () => {
  return (
    <ThemeProvider spectrum="dark">
      <StyledThemeProvider>
        <Child expectedSpectrum="dark" />
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

const overrides: PartialPaletteConfig = {
  secondary: 'blue50',
  primary: 'red20',
  background: 'orange50',
};

const ChildThemeWithOverrides = () => {
  return (
    <ThemeProvider palette={overrides}>
      <TextBody as="p">With theme overrides</TextBody>
      <Child expectedSpectrum="light" />
    </ThemeProvider>
  );
};

const ChildThemeWithOverridesDark = () => {
  return (
    <ThemeProvider palette={overrides} spectrum="dark">
      <TextBody as="p">With theme overrides</TextBody>
      <Child expectedSpectrum="dark" />
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverrides = () => {
  return (
    <ThemeProvider palette={overrides}>
      <ThemeProvider spectrum="light">
        <TextBody as="p">With nested theme overrides</TextBody>
        <Child expectedSpectrum="light" />
      </ThemeProvider>
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverridesDark = () => {
  return (
    <ThemeProvider palette={overrides} spectrum="dark">
      <ThemeProvider spectrum="dark">
        <TextBody as="p">With nested theme overrides</TextBody>
        <Child expectedSpectrum="dark" />
      </ThemeProvider>
    </ThemeProvider>
  );
};

export const ThemeProviderTest = () => {
  return (
    <ThemeProvider spectrum="light">
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
