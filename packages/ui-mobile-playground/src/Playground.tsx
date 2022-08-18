import React, { memo, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { routes as codegenRoutes } from '@cbhq/cds-mobile/examples/newRoutes';

import { ExamplesListScreen } from './ExamplesListScreen';
import { ExamplesSearchProvider } from './ExamplesSearchProvider';
import { PlaygroundRoute } from './PlaygroundRoute';
import { createStaticRoute, initialRouteKey, searchRouteKey } from './staticRoutes';
import { transformRouteToNavComponent } from './transformRouteToNavComponent';
import { useExampleNavigatorProps } from './useExampleNavigatorProps';

const Stack = createStackNavigator();

type PlaygroundProps = {
  routes?: PlaygroundRoute[];
  listScreenTitle?: string;
};

const PlaygroundContent = memo(({ routes = codegenRoutes, listScreenTitle }: PlaygroundProps) => {
  const navigatorProps = useExampleNavigatorProps();

  const routeKeys = useMemo(() => {
    return routes.map(({ key }) => key);
  }, [routes]);

  const listScreenProps = useMemo(() => {
    let options: StackNavigationOptions = {};

    if (listScreenTitle) {
      options = { ...options, title: listScreenTitle };
    }

    return {
      ...transformRouteToNavComponent({
        route: createStaticRoute(initialRouteKey, ExamplesListScreen),
        options,
      }),
      initialParams: { routeKeys },
    };
  }, [listScreenTitle, routeKeys]);

  const searchScreenProps = useMemo(() => {
    return {
      ...transformRouteToNavComponent({
        route: createStaticRoute(searchRouteKey, ExamplesListScreen),
      }),
      initialParams: { routeKeys },
    };
  }, [routeKeys]);

  const exampleScreens = useMemo(
    () =>
      [...routes].map((route) => (
        <Stack.Screen
          {...transformRouteToNavComponent({
            route,
          })}
        />
      )),
    [routes],
  );

  return (
    <Stack.Navigator {...navigatorProps}>
      <Stack.Screen {...listScreenProps} />
      <Stack.Screen {...searchScreenProps} />
      {exampleScreens}
    </Stack.Navigator>
  );
});

export const Playground = memo((props: PlaygroundProps) => {
  return (
    <ExamplesSearchProvider>
      <PlaygroundContent {...props} />
    </ExamplesSearchProvider>
  );
});

export const PlaygroundWithNavContainer = memo((props: PlaygroundProps) => {
  return (
    <NavigationContainer>
      <Playground {...props} />
    </NavigationContainer>
  );
});
