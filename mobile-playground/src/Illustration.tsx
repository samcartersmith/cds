import { Button } from '@cbhq/cds-mobile/buttons/Button';
import { HeroSquare } from '@cbhq/cds-mobile/illustrations/HeroSquare';
import { Pictogram } from '@cbhq/cds-mobile/illustrations/Pictogram';
import { SpotRectangle } from '@cbhq/cds-mobile/illustrations/SpotRectangle';
import { SpotSquare } from '@cbhq/cds-mobile/illustrations/SpotSquare';
import { Box } from '@cbhq/cds-mobile/layout/Box';
import { TextCaption } from '@cbhq/cds-mobile/typography/TextCaption';
import { capitalize } from '@cbhq/cds-utils';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { View } from 'react-native';

import {
  IllustrationHeroSquareNames,
  IllustrationPictogramNames,
  IllustrationSpotRectangleNames,
  IllustrationSpotSquareNames,
} from '@cbhq/cds-common/types/Illustration';
import {
  heroSquareNames,
  spotRectangleNames,
  pictogramNames,
  spotSquareNames,
} from './data/illustrationData';
import Example from './internal/Example';
import ExampleScreen from './internal/ExamplesScreen';

const variantToNames: {
  [variant: string]: [
    readonly string[],
    React.ComponentType<{
      name: IllustrationHeroSquareNames &
        IllustrationPictogramNames &
        IllustrationSpotRectangleNames &
        IllustrationSpotSquareNames;
    }>
  ];
} = {
  HeroSquare: [heroSquareNames, HeroSquare],
  SpotRectangle: [spotRectangleNames, SpotRectangle],
  Pictogram: [pictogramNames, Pictogram],
  SpotSquare: [spotSquareNames, SpotSquare],
};

// eslint-disable-next-line @typescript-eslint/ban-types
const NavScreen = function NavScreen({ navigation }: StackScreenProps<{}>) {
  const ScreenBtn = function ScreenBtn({ variant }: { variant: string }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigateOnPress = useCallback(() => navigation.navigate(variant as any), [variant]);

    return (
      <Box spacing={2}>
        <Button onPress={navigateOnPress}>{variant}</Button>
      </Box>
    );
  };

  return (
    <View>
      {Object.keys(variantToNames).map(variant => {
        return <ScreenBtn key={`${variant}Component`} variant={variant} />;
      })}
    </View>
  );
};

const IllustrationList = function IllustrationList({ variant }: { variant: string }) {
  const [names, IllustrationComponent] = variantToNames[variant];

  return (
    <ExampleScreen>
      <Example title={capitalize(variant)}>
        {names.map(name => (
          <Box key={`${name}_${variant}`}>
            <TextCaption>{name}</TextCaption>
            <IllustrationComponent name={name as never} />
          </Box>
        ))}
      </Example>
    </ExampleScreen>
  );
};

const HeroSquareScreen = function HeroSquareScreen() {
  return <IllustrationList variant="HeroSquare" />;
};

const SpotRectangleScreen = function SpotRectangleScreen() {
  return <IllustrationList variant="SpotRectangle" />;
};
const PictogramScreen = function PictogramScreen() {
  return <IllustrationList variant="Pictogram" />;
};
const SpotSquareScreen = function SpotSquareScreen() {
  return <IllustrationList variant="SpotSquare" />;
};

const IllustrationScreen = function IllustrationScreen() {
  const IllustrationStack = createStackNavigator();

  return (
    <IllustrationStack.Navigator initialRouteName="IllustraionScreen">
      <IllustrationStack.Screen name="IllustrationScreen" component={NavScreen} />
      <IllustrationStack.Screen
        name="HeroSquare"
        key="HeroSquareScreen"
        component={HeroSquareScreen}
      />
      <IllustrationStack.Screen
        name="SpotRectangle"
        key="SpotRectangleScreen"
        component={SpotRectangleScreen}
      />
      <IllustrationStack.Screen
        name="Pictogram"
        key="PictogramScreen"
        component={PictogramScreen}
      />
      <IllustrationStack.Screen
        name="SpotSquare"
        key="SpotSquareScreen"
        component={SpotSquareScreen}
      />
    </IllustrationStack.Navigator>
  );
};

export default IllustrationScreen;
