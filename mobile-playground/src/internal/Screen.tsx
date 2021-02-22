import React from 'react';

import { usePalette } from '@cbhq/cds-mobile';
import { ScrollView } from 'react-native';

interface ScreenProps {
  children: React.ReactNode;
}

const Screen = ({ children }: ScreenProps) => {
  const palette = usePalette();

  return (
    <ScrollView style={{ backgroundColor: palette.background, height: '100%' }}>
      {children}
    </ScrollView>
  );
};

export default Screen;
