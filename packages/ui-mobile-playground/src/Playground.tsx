import React, { memo, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { routes as codegenRoutes } from '@cbhq/cds-mobile/examples/newRoutes';

import { ExamplesListScreen } from './ExamplesListScreen';
import { ExamplesSearchProvider } from './ExamplesSearchProvider';
import { PlaygroundRoute } from './PlaygroundRoute';
import { initialRouteKey, searchRouteKey } from './staticRoutes';
import { transformRouteToNavComponent } from './transformRouteToNavComponent';
import { useExampleScreenOptions } from './useExampleScreenOptions';

const Stack = createStackNavigator();

const examplesRoute: PlaygroundRoute = {
  key: initialRouteKey,
  getComponent: () => ExamplesListScreen,
};
const searchRoute: PlaygroundRoute = {
  key: searchRouteKey,
  getComponent: () => ExamplesListScreen,
};

type PlaygroundProps = {
  routes?: PlaygroundRoute[];
};

const PlaygroundContent = memo(({ routes = codegenRoutes }: PlaygroundProps) => {
  const screenOptions = useExampleScreenOptions();

  const routeKeys = useMemo(() => {
    return routes.map(({ key }) => key);
  }, [routes]);

  const homeScreen = useMemo(() => {
    return {
      ...transformRouteToNavComponent({
        route: examplesRoute,
      }),
      initialParams: { routeKeys },
    };
  }, [routeKeys]);

  const searchScreen = useMemo(() => {
    return {
      ...transformRouteToNavComponent({
        route: searchRoute,
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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screenOptions.initialRouteName}
        screenOptions={screenOptions.screenOptions}
      >
        <Stack.Screen {...homeScreen} />
        <Stack.Screen {...searchScreen} />
        {exampleScreens}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export const Playground = memo((props: PlaygroundProps) => {
  return (
    <ExamplesSearchProvider>
      <PlaygroundContent {...props} />
    </ExamplesSearchProvider>
  );
});
