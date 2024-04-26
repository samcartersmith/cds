import React from 'react';
import { PartialPaletteConfig, useSpectrum } from '@cbhq/cds-common';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout/VStack';
import { TextBody } from '../../typography';
import { ThemeProvider } from '../ThemeProvider';

const Child = ({ expectedSpectrum }: { expectedSpectrum: string }) => {
  const spectrum = useSpectrum();

  return (
    <VStack background>
      <VStack gap={3} spacing={1}>
        <VStack>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
          <TextBody color="secondary">Secondary text</TextBody>
        </VStack>
        <VStack background bordered borderRadius="rounded" elevation={1} gap={1} spacing={2}>
          <TextBody>Elevation 1</TextBody>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
        </VStack>
        <VStack background bordered borderRadius="rounded" elevation={2} gap={1} spacing={2}>
          <TextBody>Elevation 2</TextBody>
          <Button variant="secondary">Secondary button</Button>
          <Button variant="primary">Primary button</Button>
        </VStack>
        <TextBody>Spectrum value at parent level: {spectrum}</TextBody>
        <TextBody>Should be {expectedSpectrum}</TextBody>
      </VStack>
    </VStack>
  );
};

const ChildThemeProviderDark = () => {
  return (
    <ThemeProvider name="child-dark" spectrum="dark">
      <Child expectedSpectrum="dark" />
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
    <ThemeProvider name="child-overrides" palette={overrides}>
      <TextBody>With theme overrides</TextBody>
      <Child expectedSpectrum="light" />
    </ThemeProvider>
  );
};

const ChildThemeWithOverridesDark = () => {
  return (
    <ThemeProvider name="child-overrides-dark" palette={overrides} spectrum="dark">
      <TextBody>With theme overrides</TextBody>
      <Child expectedSpectrum="dark" />
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverrides = () => {
  return (
    <ThemeProvider name="child-overrides" palette={overrides}>
      <ThemeProvider name="child-overrides-1" spectrum="light">
        <TextBody>With theme overrides</TextBody>
        <Child expectedSpectrum="light" />
      </ThemeProvider>
    </ThemeProvider>
  );
};

const ChildThemeWithNestedOverridesDark = () => {
  return (
    <ThemeProvider name="child-overrides-dark" palette={overrides} spectrum="dark">
      <ThemeProvider name="child-overrides-dark-1" spectrum="dark">
        <TextBody>With theme overrides</TextBody>
        <Child expectedSpectrum="dark" />
      </ThemeProvider>
    </ThemeProvider>
  );
};

const ThemeProviderTest = () => {
  return (
    <ExampleScreen>
      <Example title="Nested ThemeProviders">
        <ThemeProvider name="parent" spectrum="light">
          <VStack gap={3}>
            <Child expectedSpectrum="light" />
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
