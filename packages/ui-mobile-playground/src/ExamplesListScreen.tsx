import React, { useCallback, useContext } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import includes from 'lodash/includes';
import { ListCell } from '@cbhq/cds-mobile/cells/ListCell';
import { Box } from '@cbhq/cds-mobile/layout/Box';

import { SearchFilterContext, SetSearchFilterContext } from './ExamplesSearchProvider';
import { keyToRouteName } from './keyToRouteName';
import { initialRouteKey, searchRouteKey } from './staticRoutes';

export function ExamplesListScreen() {
  const searchFilter = useContext(SearchFilterContext);
  const setFilter = useContext(SetSearchFilterContext);

  // React Navigation Route Param typing is not clean because our routes are dynamic
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routeKeys = (useRoute().params as any).routeKeys as string[];
  const { navigate } = useNavigation();

  const renderItem: ListRenderItem<string> = useCallback(
    ({ item }) => {
      // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
      const handlePress = () => {
        setFilter('');
        navigate({ name: keyToRouteName(item), params: {} });
      };

      return (
        <ListCell
          title={item}
          accessory="arrow"
          onPress={handlePress}
          reduceHorizontalSpacing
          compact
        />
      );
    },
    [navigate, setFilter],
  );

  const data = routeKeys
    .filter((key) => key !== initialRouteKey && key !== searchRouteKey)
    .filter((key) => {
      if (searchFilter !== '') {
        return includes(key.toLowerCase(), searchFilter.toLowerCase());
      }
      return true;
    });

  return (
    <Box background flexGrow={1}>
      <FlatList
        testID="cds_home_flatlist"
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={null}
        initialNumToRender={14}
      />
    </Box>
  );
}
