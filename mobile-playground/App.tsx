import { useMemo } from 'react';

import 'react-native-gesture-handler';
import { usePalette } from '@cbhq/cds-mobile/hooks/usePalette';
import { ThemeProvider } from '@cbhq/cds-mobile/system/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import List from './src';
import BoxScreen from './src/Box';
import ButtonScreen from './src/Button';
import CheckboxScreen from './src/Checkbox';
import DividerScreen from './src/Divider';
import IconScreen from './src/Icon';
import IconButtonScreen from './src/IconButton';
import LinkButtonScreen from './src/LinkButton';
import LottieScreen from './src/Lottie';
import RadioGroupScreen from './src/RadioGroup';
import SpacerScreen from './src/Spacer';
import SwitchScreen from './src/Switch';
import TextScreen from './src/Text';
import TextBodyScreen from './src/TextBody';
import TextCaptionScreen from './src/TextCaption';
import TextDisplay1Screen from './src/TextDisplay1';
import TextDisplay2Screen from './src/TextDisplay2';
import TextHeadlineScreen from './src/TextHeadline';
import TextLabel1Screen from './src/TextLabel1';
import TextLabel2Screen from './src/TextLabel2';
import TextLegalScreen from './src/TextLegal';
import TextTitle1Screen from './src/TextTitle1';
import TextTitle2Screen from './src/TextTitle2';
import TextTitle3Screen from './src/TextTitle3';

const Stack = createStackNavigator();

const App = () => {
  const palette = usePalette();
  const screenOptions = useMemo(
    () =>
      ({
        headerBackAllowFontScaling: true,
        headerBackTitle: 'All',
        headerBackTitleVisible: true,
        headerStyle: {
          backgroundColor: palette.primary,
        },
        headerTintColor: palette.primaryForeground,
        headerTitleAllowFontScaling: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        gestureDirection: 'horizontal',
      } as const),
    [palette]
  );

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Index" screenOptions={screenOptions}>
          <Stack.Screen
            name="Index"
            component={List}
            options={{ title: 'Coinbase Design System' }}
          />
          <Stack.Screen name="Box" component={BoxScreen} />
          <Stack.Screen name="Button" component={ButtonScreen} />
          <Stack.Screen name="LinkButton" component={LinkButtonScreen} />
          <Stack.Screen name="Checkbox" component={CheckboxScreen} />
          <Stack.Screen name="RadioGroup" component={RadioGroupScreen} />
          <Stack.Screen name="Switch" component={SwitchScreen} />
          <Stack.Screen name="Divider" component={DividerScreen} />
          <Stack.Screen name="Spacer" component={SpacerScreen} />
          <Stack.Screen name="IconButton" component={IconButtonScreen} />
          <Stack.Screen name="Icon" component={IconScreen} />
          <Stack.Screen name="Lottie" component={LottieScreen} />
          <Stack.Screen name="Text" component={TextScreen} options={{ title: 'Text (all)' }} />
          <Stack.Screen name="TextBody" component={TextBodyScreen} />
          <Stack.Screen name="TextCaption" component={TextCaptionScreen} />
          <Stack.Screen name="TextDisplay1" component={TextDisplay1Screen} />
          <Stack.Screen name="TextDisplay2" component={TextDisplay2Screen} />
          <Stack.Screen name="TextHeadline" component={TextHeadlineScreen} />
          <Stack.Screen name="TextLabel1" component={TextLabel1Screen} />
          <Stack.Screen name="TextLabel2" component={TextLabel2Screen} />
          <Stack.Screen name="TextLegal" component={TextLegalScreen} />
          <Stack.Screen name="TextTitle1" component={TextTitle1Screen} />
          <Stack.Screen name="TextTitle2" component={TextTitle2Screen} />
          <Stack.Screen name="TextTitle3" component={TextTitle3Screen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
