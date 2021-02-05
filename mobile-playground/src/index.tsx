import React, { useMemo } from 'react';

import { TextHeadline } from '@cds/mobile';
import { usePalette } from '@cds/theme/native';
import { StackScreenProps } from '@react-navigation/stack';
import { View, FlatList, TouchableHighlight } from 'react-native';

const components = [
  { key: 'Box' },
  { key: 'Text', label: 'Text (all)' },
  { key: 'TextBody' },
  { key: 'TextCaption' },
  { key: 'TextDisplay1' },
  { key: 'TextDisplay2' },
  { key: 'TextHeadline' },
  { key: 'TextLabel1' },
  { key: 'TextLabel2' },
  { key: 'TextLegal' },
  { key: 'TextTitle1' },
  { key: 'TextTitle2' },
  { key: 'TextTitle3' },
];

// eslint-disable-next-line @typescript-eslint/ban-types
const Index = ({ navigation }: StackScreenProps<{}>) => {
  const palette = usePalette();
  const styles = useMemo(
    () => ({
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: palette.stroke,
    }),
    [palette]
  );

  return (
    <View style={{ backgroundColor: palette.background, height: '100%' }}>
      <FlatList
        data={components}
        renderItem={({ item }) => (
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={palette.backgroundAlternate}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onPress={() => navigation.navigate(item.key as any)}
          >
            <View style={styles}>
              <TextHeadline>{item.label || item.key}</TextHeadline>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

export default Index;
