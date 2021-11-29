import React, { useMemo } from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FeatureFlagProvider } from '@cbhq/cds-mobile/system';
import { usePalette } from '../mobile/hooks/usePalette';
import { DevicePreferencesProvider } from '../mobile/system/DevicePreferencesProvider';
import { useTypographyStyles } from '../mobile/typography';

import { RoutesList } from './src/routing/RoutesList';
import { routes } from './src/routing/routes';

const Stack = createStackNavigator();

const AppContent = () => {
  const palette = usePalette();
  const headlineStyles = useTypographyStyles('headline');
  const screenOptions = useMemo(
    () =>
      ({
        headerBackAllowFontScaling: false,
        headerBackTitle: 'All',
        headerBackTitleVisible: true,
        headerStyle: {
          backgroundColor: palette.primary,
        },
        headerTintColor: palette.primaryForeground,
        headerTitleAllowFontScaling: false,
        headerTitleAlign: 'center',
        headerTitleStyle: headlineStyles,
        gestureDirection: 'horizontal',
      } as const),
    [headlineStyles, palette.primary, palette.primaryForeground],
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index" screenOptions={screenOptions}>
        <Stack.Screen
          name="Index"
          component={RoutesList}
          options={{ title: 'Coinbase Design System' }}
        />
        {routes.map((route) => (
          <Stack.Screen {...route.stackProps} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <FeatureFlagProvider fontMigration>
      <DevicePreferencesProvider>
        <AppContent />
      </DevicePreferencesProvider>
    </FeatureFlagProvider>
  );
};

export default App;
