import React, { useMemo } from 'react';

import { TextTitle3, usePalette } from '@cds/mobile';
import { View, ViewStyle } from 'react-native';

interface ExampleProps {
  children: React.ReactNode;
  inline?: boolean;
  title?: string;
}

const Example = ({ children, inline, title }: ExampleProps) => {
  const palette = usePalette();
  const items = React.Children.toArray(children);
  const childStyles = useMemo(() => {
    const style: ViewStyle = { paddingTop: 12 };

    if (inline) {
      style.alignItems = 'flex-start';
    }

    return style;
  }, [inline]);

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
        <View key={index} style={childStyles}>
          {item}
        </View>
      ))}
    </View>
  );
};

export default Example;
