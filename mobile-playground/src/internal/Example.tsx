import { useMemo, Children } from 'react';

import { usePalette } from '@cbhq/cds-mobile/hooks/usePalette';
import { TextTitle3 } from '@cbhq/cds-mobile/typography/TextTitle3';
import { View, ViewStyle } from 'react-native';

interface ExampleProps {
  children: React.ReactNode;
  inline?: boolean;
  title?: string;
}

const Example = ({ children, inline, title }: ExampleProps) => {
  const palette = usePalette();
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
        borderBottomColor: palette.lineHeavy,
        padding: 16,
        paddingBottom: 24,
      }}
    >
      {title && <TextTitle3>{title}</TextTitle3>}

      {typeof children === 'function'
        ? children()
        : Children.map(children, (item, index) => (
            <View key={index} style={childStyles}>
              {item}
            </View>
          ))}
    </View>
  );
};

export default Example;
