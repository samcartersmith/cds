import React from 'react';

import { TextTitle3, usePalette } from '@cds/mobile';
import { View } from 'react-native';

interface ExampleProps {
  children: React.ReactNode;
  title?: string;
}

const Example = ({ children, title }: ExampleProps) => {
  const palette = usePalette();
  const items = React.Children.toArray(children);

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: palette.stroke,
        padding: 16,
        paddingBottom: 24,
      }}
    >
      {title && <TextTitle3>{title}</TextTitle3>}

      {items.map((item, index) => (
        <View key={index} style={{ paddingTop: 12, alignItems: 'flex-start' }}>
          {item}
        </View>
      ))}
    </View>
  );
};

export default Example;
