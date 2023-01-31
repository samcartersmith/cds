/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useContext, useMemo } from 'react';
import {
  FlatList,
  ListRenderItem,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  StackHeaderProps,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import includes from 'lodash/includes';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { emptyObject, mapValues } from '@cbhq/cds-utils';

import { IconButton } from '../buttons/IconButton';
import { ListCell } from '../cells/ListCell';
import { TextInput } from '../controls/TextInput';
import { useLayout } from '../hooks/useLayout';
import { usePalette } from '../hooks/usePalette';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Spacer } from '../layout/Spacer';
import { TextHeadline } from '../typography/TextHeadline';

import {
  ExamplesSearchProvider,
  SearchFilterContext,
  SetSearchFilterContext,
} from './ExamplesSearchProvider';
import { routes as codegenRoutes } from './routes';

const initialRouteKey = 'Examples' as const;
const searchRouteKey = 'Search' as const;

export const initialRouteName = transformKey(initialRouteKey);
export const searchRouteName = transformKey(searchRouteKey);

type RoutesMap = typeof codegenRoutes;
type OriginalKey = keyof RoutesMap | typeof initialRouteKey | typeof searchRouteKey;

export type DebugCdsStackParamList = {
  [key in `Debug${OriginalKey}`]: {};
};
export type DebugCdsRoute = (typeof routes)[number];
export type DebugCdsNavigation = StackNavigationProp<{ [key in keyof DebugCdsStackParamList]: {} }>;
export type ExamplesProps = {
  navigation: DebugCdsNavigation;
  children?: React.ReactNode;
};

const titleOverrides: { [key in OriginalKey]?: string } = {
  DebugFrontier: 'Frontier',
  Examples: 'CDS',
  Text: 'Text (all)',
};

function transformKey(key: OriginalKey) {
  return `Debug${key}` as const;
}

export function formatRoute<T>({
  getComponent,
  key,
  options = emptyObject,
}: {
  getComponent: () => React.ComponentType<React.PropsWithChildren<T>>;
  key: OriginalKey;
  options?: StackNavigationOptions | undefined;
}) {
  return {
    key,
    name: transformKey(key),
    getComponent,
    options: {
      title: titleOverrides[key] ?? key,
      headerStyleInterpolator: HeaderStyleInterpolators.forFade,
      ...options,
    },
  } as const;
}

export const routes = [
  ...Object.values(
    mapValues(codegenRoutes, (getComponent, key) => formatRoute({ getComponent, key })),
  ),
  formatRoute({
    key: initialRouteKey,
    getComponent: () => Examples,
    options: {
      title: 'CDS',
    },
  }),
  formatRoute({
    getComponent: () => Examples,
    key: searchRouteKey,
    options: {
      headerStyleInterpolator: HeaderStyleInterpolators.forFade,
      cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
    },
  }),
] as const;

export function useExampleScreenOptions() {
  const palette = usePalette();
  const { top } = useSafeAreaInsets();
  const [headerSize, onLayout] = useLayout();
  const iconButtonHeight = useInteractableHeight();
  const setFilter = useContext(SetSearchFilterContext);

  return useMemo(
    () =>
      ({
        initialRouteName,
        screenOptions: {
          headerBackAllowFontScaling: false,
          headerBackTitleVisible: false,
          headerTitleAllowFontScaling: false,
          headerStyle: {
            backgroundColor: palette.background,
            borderWidth: 0,
            shadowColor: 'transparent',
            height: headerSize.height,
          },
          safeAreaInsets: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          header: ({
            navigation,
            route,
            options,
            progress,
            styleInterpolator,
          }: StackHeaderProps) => {
            const isFocused = navigation.isFocused();
            const canGoBack = navigation.canGoBack();
            const goBack = () => {
              navigation.goBack();
              setFilter('');
            };
            const goToSearch = () => navigation.navigate(searchRouteName);
            const routeName = route.name;
            const titleForScene = options.title;
            const isSearch = routeName === searchRouteName;
            const { titleStyle } = styleInterpolator({
              current: { progress: progress.current },
              next: progress.next && { progress: progress.next },
              layouts: {
                header: headerSize,
                title: headerSize,
                screen: headerSize,
              },
            });
            const showBackButton = isFocused && canGoBack && !isSearch;
            const showSearch = routeName === initialRouteName;

            const iconButtonPlaceholder = <Box height={iconButtonHeight} />;

            const leftHeaderButton = showBackButton ? (
              <Box offsetHorizontal={1}>
                <IconButton transparent name="backArrow" onPress={goBack} />
              </Box>
            ) : (
              iconButtonPlaceholder
            );

            const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
              setFilter(e.nativeEvent.text);

            const rightHeaderButton = showSearch ? (
              <Box offsetHorizontal={1}>
                <IconButton transparent name="search" onPress={goToSearch} />
              </Box>
            ) : (
              iconButtonPlaceholder
            );
            return (
              <Box animated background onLayout={onLayout} dangerouslySetStyle={{ marginTop: top }}>
                <HStack
                  alignItems="center"
                  justifyContent="center"
                  spacingVertical={1}
                  spacingHorizontal={2}
                >
                  {leftHeaderButton}
                  <Spacer />
                  <Box
                    width="100%"
                    pointerEvents={isSearch ? undefined : 'none'}
                    position="absolute"
                    alignItems="center"
                  >
                    {isSearch ? (
                      <TextInput
                        accessibilityLabel="Search for component"
                        start={<IconButton transparent name="backArrow" onPress={goBack} />}
                        label=""
                        placeholder="Search"
                        onChange={handleSearch}
                        accessibilityHint="Search for component"
                      />
                    ) : (
                      <TextHeadline align="center" animated dangerouslySetStyle={titleStyle}>
                        {titleForScene}
                      </TextHeadline>
                    )}
                  </Box>
                  <Spacer />
                  {rightHeaderButton}
                </HStack>
              </Box>
            );
          },
          gestureDirection: 'horizontal',
        },
      } as const),
    [headerSize, iconButtonHeight, onLayout, palette.background, setFilter, top],
  );
}

export function Examples({ navigation: { navigate } }: ExamplesProps) {
  const searchFilter = useContext(SearchFilterContext);
  const setFilter = useContext(SetSearchFilterContext);

  const renderItem: ListRenderItem<DebugCdsRoute> = useCallback(
    ({ item }) => {
      const handlePress = () => {
        setFilter('');
        navigate({ name: item.name, params: {} });
      };
      return (
        <ListCell
          title={item.options.title}
          accessory="arrow"
          onPress={handlePress}
          reduceHorizontalSpacing
          compact
        />
      );
    },
    [navigate, setFilter],
  );

  const data = routes
    .filter((item) => item.key !== initialRouteKey && item.key !== searchRouteKey)
    .filter((route) => {
      if (searchFilter !== '') {
        return includes(route.name.toLowerCase(), searchFilter.toLowerCase());
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

export { ExamplesSearchProvider };
