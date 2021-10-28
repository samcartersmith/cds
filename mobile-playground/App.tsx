import React, { useMemo } from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FeatureFlagProvider } from '@cbhq/cds-mobile/system';
import { usePalette } from '../mobile/hooks/usePalette';
import { DevicePreferencesProvider } from '../mobile/system/DevicePreferencesProvider';
import { useTypographyStyles } from '../mobile/typography';

import List from './src';
import BoxScreen from './src/Box';
import ButtonScreen from './src/Button';
import ButtonGroupScreen from './src/ButtonGroup';
import CardScreen from './src/Card';
import CarouselScreen from './src/Carousel';
import CheckboxScreen from './src/Checkbox';
import ContentCellScreen from './src/ContentCell';
import ContentCellFallbackScreen from './src/ContentCellFallback';
import DividerScreen from './src/Divider';
import IconScreen from './src/Icon';
import IconButtonScreen from './src/IconButton';
import IllustrationScreen from './src/Illustration';
import InputScreen from './src/Input';
import InputStackScreen from './src/InputStack';
import LinkScreen from './src/Link';
import ListCellScreen from './src/ListCell';
import ListCellFallbackScreen from './src/ListCellFallback';
import LottieScreen from './src/Lottie';
import LottieStatusAnimationScreen from './src/LottieStatusAnimation';
import ModalScreen from './src/Modal';
import OverlayScreen from './src/Overlay';
import PressableScreen from './src/Pressable';
import PressableOpacityScreen from './src/PressableOpacity';
import RadioGroupScreen from './src/RadioGroup';
import RemoteImageScreen from './src/RemoteImage';
import SpacerScreen from './src/Spacer';
import SparklineScreen from './src/Sparkline';
import SparklineGradientScreen from './src/SparklineGradient';
import SwitchScreen from './src/Switch';
import TextScreen from './src/Text';
import TextBodyScreen from './src/TextBody';
import TextCaptionScreen from './src/TextCaption';
import TextDisplay1Screen from './src/TextDisplay1';
import TextDisplay2Screen from './src/TextDisplay2';
import TextDisplay3Screen from './src/TextDisplay3';
import TextHeadlineScreen from './src/TextHeadline';
import TextLabel1Screen from './src/TextLabel1';
import TextLabel2Screen from './src/TextLabel2';
import TextLegalScreen from './src/TextLegal';
import TextTitle1Screen from './src/TextTitle1';
import TextTitle2Screen from './src/TextTitle2';
import TextTitle3Screen from './src/TextTitle3';
import TextTitle4Screen from './src/TextTitle4';
import LogoScreen from './src/Logo';
import AvatarScreen from './src/Avatar';
import AvatarButtonScreen from './src/AvatarButton';

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
        <Stack.Screen name="Index" component={List} options={{ title: 'Coinbase Design System' }} />
        <Stack.Screen name="Illustration" component={IllustrationScreen} />
        <Stack.Screen name="Box" component={BoxScreen} />
        <Stack.Screen name="Button" component={ButtonScreen} />
        <Stack.Screen name="ButtonGroup" component={ButtonGroupScreen} />
        <Stack.Screen name="Card" component={CardScreen} />
        <Stack.Screen name="Carousel" component={CarouselScreen} />
        <Stack.Screen name="Checkbox" component={CheckboxScreen} />
        <Stack.Screen name="ContentCell" component={ContentCellScreen} />
        <Stack.Screen name="ContentCellFallback" component={ContentCellFallbackScreen} />
        <Stack.Screen name="Divider" component={DividerScreen} />
        <Stack.Screen name="Icon" component={IconScreen} />
        <Stack.Screen name="IconButton" component={IconButtonScreen} />
        <Stack.Screen name="Input" component={InputScreen} />
        <Stack.Screen name="InputStack" component={InputStackScreen} />
        <Stack.Screen name="Link" component={LinkScreen} />
        <Stack.Screen name="ListCell" component={ListCellScreen} />
        <Stack.Screen name="ListCellFallback" component={ListCellFallbackScreen} />
        <Stack.Screen name="Lottie" component={LottieScreen} />
        <Stack.Screen name="LottieStatusAnimation" component={LottieStatusAnimationScreen} />
        <Stack.Screen name="Logo" component={LogoScreen} />
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="Overlay" component={OverlayScreen} />
        <Stack.Screen name="Pressable" component={PressableScreen} />
        <Stack.Screen name="PressableOpacity" component={PressableOpacityScreen} />
        <Stack.Screen name="RadioGroup" component={RadioGroupScreen} />
        <Stack.Screen name="RemoteImage" component={RemoteImageScreen} />
        <Stack.Screen name="Spacer" component={SpacerScreen} />
        <Stack.Screen name="Sparkline" component={SparklineScreen} />
        <Stack.Screen name="SparklineGradient" component={SparklineGradientScreen} />
        <Stack.Screen name="Switch" component={SwitchScreen} />
        <Stack.Screen name="Text" component={TextScreen} options={{ title: 'Text (all)' }} />
        <Stack.Screen name="TextBody" component={TextBodyScreen} />
        <Stack.Screen name="TextCaption" component={TextCaptionScreen} />
        <Stack.Screen name="TextDisplay1" component={TextDisplay1Screen} />
        <Stack.Screen name="TextDisplay2" component={TextDisplay2Screen} />
        <Stack.Screen name="TextDisplay3" component={TextDisplay3Screen} />
        <Stack.Screen name="TextHeadline" component={TextHeadlineScreen} />
        <Stack.Screen name="TextLabel1" component={TextLabel1Screen} />
        <Stack.Screen name="TextLabel2" component={TextLabel2Screen} />
        <Stack.Screen name="TextLegal" component={TextLegalScreen} />
        <Stack.Screen name="TextTitle1" component={TextTitle1Screen} />
        <Stack.Screen name="TextTitle2" component={TextTitle2Screen} />
        <Stack.Screen name="TextTitle3" component={TextTitle3Screen} />
        <Stack.Screen name="TextTitle4" component={TextTitle4Screen} />
        <Stack.Screen name="Avatar" component={AvatarScreen} />
        <Stack.Screen name="AvatarButton" component={AvatarButtonScreen} />
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
