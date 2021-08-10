/* eslint-disable react-perf/jsx-no-new-function-as-prop */

import React, { useMemo } from 'react';
import { usePalette } from '@cbhq/cds-mobile/hooks/usePalette';
import { TextHeadline } from '@cbhq/cds-mobile/typography/TextHeadline';
import { StackScreenProps } from '@react-navigation/stack';
import { View, FlatList, TouchableHighlight } from 'react-native';

const components = [
  { key: 'Box' },
  { key: 'Button' },
  { key: 'ButtonGroup' },
  { key: 'Card' },
  { key: 'Carousel' },
  { key: 'Checkbox' },
  { key: 'ContentCell' },
  { key: 'ContentCellFallback' },
  { key: 'Divider' },
  { key: 'Icon' },
  { key: 'IconButton' },
  { key: 'Illustration' },
  { key: 'Link' },
  { key: 'ListCell' },
  { key: 'ListCellFallback' },
  { key: 'Lottie' },
  { key: 'LottieStatusAnimation' },
  { key: 'Overlay' },
  { key: 'Pressable' },
  { key: 'PressableOpacity' },
  { key: 'RadioGroup' },
  { key: 'RemoteImage' },
  { key: 'Spacer' },
  { key: 'Sparkline' },
  { key: 'SparklineGradient' },
  { key: 'Switch' },
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
const Index = ({ navigation }: StackScreenProps<Record<string, {}>>) => {
  const palette = usePalette();
  const styles = useMemo(
    () => ({
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: palette.lineHeavy,
    }),
    [palette],
  );

  return (
    <View style={{ backgroundColor: palette.background, height: '100%' }}>
      <FlatList
        data={components}
        renderItem={({ item }) => (
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={palette.backgroundAlternate}
            onPress={() => navigation.navigate({ name: item.key, params: {} })}
          >
            <View style={styles}>
              <TextHeadline>{item.label ?? item.key}</TextHeadline>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

export default Index;
