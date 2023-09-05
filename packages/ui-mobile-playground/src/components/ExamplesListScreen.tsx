import React, { useCallback, useContext } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import includes from 'lodash/includes';
import { CellSpacing } from '@cbhq/cds-common';
import { ListCell } from '@cbhq/cds-mobile/cells/ListCell';
import { Box } from '@cbhq/cds-mobile/layout/Box';

import { SearchFilterContext, SetSearchFilterContext } from './ExamplesSearchProvider';
import { keyToRouteName } from './keyToRouteName';
import { initialRouteKey, searchRouteKey } from './staticRoutes';

const innerSpacingConfig: CellSpacing = { spacingHorizontal: 1 };

export function ExamplesListScreen() {
  const searchFilter = useContext(SearchFilterContext);
  const setFilter = useContext(SetSearchFilterContext);

  // React Navigation Route Param typing is not clean because our routes are dynamic
  const routeKeys = (useRoute().params as { routeKeys: string[] } | undefined)?.routeKeys ?? [];
  const { navigate } = useNavigation();

  const renderItem: ListRenderItem<string> = useCallback(
    ({ item }) => {
      // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
      const handlePress = () => {
        setFilter('');
        // typing not clean due to dynamic routes
        navigate(keyToRouteName(item) as never);
      };

      return (
        <ListCell
          title={item}
          accessory="arrow"
          onPress={handlePress}
          innerSpacing={innerSpacingConfig}
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
    <Box background flexGrow={1} testID="mobile-playground-home-screen">
      <FlatList
        testID="mobile-playground-home-flatlist"
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={null}
        initialNumToRender={14}
      />
    </Box>
  );
}
