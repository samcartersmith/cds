import React, { useCallback, useContext } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import includes from 'lodash/includes';
import { CellSpacing } from '@cbhq/cds-mobile2/cells/Cell';
import { ListCell } from '@cbhq/cds-mobile2/cells/ListCell';
import { Box } from '@cbhq/cds-mobile2/layout/Box';

import { SearchFilterContext, SetSearchFilterContext } from './ExamplesSearchProvider';
import { keyToRouteName } from './keyToRouteName';
import { initialRouteKey, searchRouteKey } from './staticRoutes';

const innerSpacingConfig: CellSpacing = { paddingX: 1 };

export function ExamplesListScreen() {
  const searchFilter = useContext(SearchFilterContext);
  const setFilter = useContext(SetSearchFilterContext);

  // React Navigation Route Param typing is not clean because our routes are dynamic
  const routeKeys = (useRoute().params as { routeKeys: string[] } | undefined)?.routeKeys ?? [];
  const { navigate } = useNavigation();

  const renderItem: ListRenderItem<string> = useCallback(
    ({ item }) => {
      const handlePress = () => {
        setFilter('');
        // typing not clean due to dynamic routes
        navigate(keyToRouteName(item) as never);
      };

      return (
        <ListCell
          compact
          accessory="arrow"
          innerSpacing={innerSpacingConfig}
          onPress={handlePress}
          title={item}
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
    <Box background="bg" flexGrow={1} testID="mobile-playground-home-screen">
      <FlatList
        ItemSeparatorComponent={null}
        data={data}
        initialNumToRender={14}
        renderItem={renderItem}
        testID="mobile-playground-home-flatlist"
      />
    </Box>
  );
}
