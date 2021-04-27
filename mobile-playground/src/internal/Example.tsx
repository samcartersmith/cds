import { useMemo, Children } from 'react';

import { usePalette } from '@cbhq/cds-mobile/hooks/usePalette';
import { Box, Divider } from '@cbhq/cds-mobile/layout';
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

  const content = (
    <>
      <Box spacing={2} spacingBottom={3} background>
        {title && <TextTitle3>{title}</TextTitle3>}

        {typeof children === 'function'
          ? children()
          : Children.map(children, (item, index) => (
              <View key={index} style={childStyles}>
                {item}
              </View>
            ))}
      </Box>
      <Divider />
    </>
  );

  return content;
};

export default Example;
