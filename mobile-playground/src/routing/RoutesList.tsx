/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useMemo, useCallback } from 'react';
import { View, FlatList, TouchableHighlight, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePalette } from '@cbhq/cds-mobile/hooks/usePalette';
import { TextHeadline } from '@cbhq/cds-mobile/typography/TextHeadline';
import { routes, CdsRoute, CdsUseNavigation } from './routes';

export const RoutesList = () => {
  const { navigate } = useNavigation<CdsUseNavigation>();
  const palette = usePalette();
  const styles = useMemo(
    () => ({
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: palette.lineHeavy,
    }),
    [palette],
  );

  const renderItem: ListRenderItem<CdsRoute> = useCallback(
    ({ item }) => {
      const handlePress = () => {
        navigate({ name: item.key, params: {} });
      };
      return (
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={palette.backgroundAlternate}
          onPress={handlePress}
        >
          <View style={styles}>
            <TextHeadline>{item.stackProps.options.title}</TextHeadline>
          </View>
        </TouchableHighlight>
      );
    },
    [navigate, palette.backgroundAlternate, styles],
  );

  return (
    <View style={{ backgroundColor: palette.background, height: '100%' }}>
      <FlatList data={routes} renderItem={renderItem} />
    </View>
  );
};
