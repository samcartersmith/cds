import React from 'react';
import { useSpectrum } from '@cbhq/cds-common';

import { IconButton } from '../../buttons/IconButton';
import { VStack } from '../../layout/VStack';
import { TextBody } from '../../typography';
import { ThemeProvider } from '../ThemeProvider';
import { useThemeProviderStyles } from '../useThemeProviderStyles';

const ParentThemeProvider = ({ children }: React.PropsWithChildren) => {
  const spectrum = useSpectrum();
  const { className } = useThemeProviderStyles();
  return (
    <ThemeProvider spectrum="light">
      <TextBody as="p">Spectrum value at parent level: {spectrum}</TextBody>
      <TextBody as="p">ClassName value at parent level: {className}</TextBody>
      {children}
    </ThemeProvider>
  );
};

const Child = () => {
  const spectrum = useSpectrum();
  const { className } = useThemeProviderStyles();

  return (
    <VStack>
      <TextBody as="p" color="secondary">
        Spectrum value at nested ThemeProvider child level: {spectrum}
      </TextBody>
      <TextBody as="p" color="secondary">
        ClassName value at nested ThemeProvider parent level: {className}
      </TextBody>
      <IconButton name="caretDown" accessibilityLabel="Test" />
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

const ChildThemeProvider = () => {
  return (
    <ThemeProvider spectrum="dark">
      <StyledThemeProvider>
        <Child />
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

export const ThemeProviderTest = () => {
  return (
    <ParentThemeProvider>
      <ChildThemeProvider />
    </ParentThemeProvider>
  );
};

export default {
  title: 'Core Components/ThemeProvider',
};
