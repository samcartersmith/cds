import React, { useMemo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { DevicePreferencesProvider } from '../mobile/system/DevicePreferencesProvider';
import { FeatureFlagProvider } from '../mobile/system/FeatureFlagProvider';
import { PortalProvider } from '../mobile/overlays/PortalProvider';

import {
  ExamplesSearchProvider,
  useExampleScreenOptions,
  routes,
} from '../mobile/examples/Examples';

// this code allows the use of toLocaleString() on Android
if (Platform.OS === 'android') {
  // eslint-disable-next-line global-require
  require('intl');
  // eslint-disable-next-line global-require
  require('intl/locale-data/jsonp/en-US');
}

const Stack = createStackNavigator();

const AppContent = () => {
  const screenOptions = useExampleScreenOptions();

  return (
    <NavigationContainer>
      <Stack.Navigator {...screenOptions}>
        {useMemo(() => routes.map((route) => <Stack.Screen {...route} />), [])}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <FeatureFlagProvider>
        <DevicePreferencesProvider>
          <PortalProvider>
            <ExamplesSearchProvider>
              <AppContent />
            </ExamplesSearchProvider>
          </PortalProvider>
        </DevicePreferencesProvider>
      </FeatureFlagProvider>
    </SafeAreaProvider>
  );
};

export default App;
