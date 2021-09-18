import React, { useCallback } from 'react';
import { Button } from '@cbhq/cds-mobile/buttons/Button';
import { HeroSquare, Pictogram, SpotRectangle, SpotSquare } from '@cbhq/cds-mobile/illustrations';
import { Box } from '@cbhq/cds-mobile/layout/Box';
import { HStack } from '@cbhq/cds-mobile/layout/HStack';
import { VStack } from '@cbhq/cds-mobile/layout/VStack';
import { TextLabel1 } from '@cbhq/cds-mobile/typography/TextLabel1';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';

import { View } from 'react-native';
import { pascalCase } from '@cbhq/cds-utils';
import { illustrationSizes } from '@cbhq/cds-common/tokens/illustrations';
import { createStories } from ':cds-storybook/stories/Illustration';

import Example from './internal/Example';
import ExampleScreen from './internal/ExamplesScreen';

const { ListPictograms, ListHeroSquares, ListSpotSquares, ListSpotRectangles } = createStories(
  Pictogram,
  SpotSquare,
  SpotRectangle,
  HeroSquare,
  HStack,
  VStack,
  Box,
  TextLabel1,
);

// eslint-disable-next-line @typescript-eslint/ban-types
const NavScreen = function NavScreen({ navigation }: StackScreenProps<Record<string, {}>>) {
  const ScreenBtn = function ScreenBtn({ variant }: { variant: string }) {
    const navigateOnPress = useCallback(
      () => navigation.navigate({ name: variant, params: {} }),
      [variant],
    );

    return (
      <Box spacing={2}>
        <Button onPress={navigateOnPress}>{variant}</Button>
      </Box>
    );
  };

  return (
    <View>
      {Object.keys(illustrationSizes).map((variant) => {
        const variantPC = pascalCase(variant);
        return <ScreenBtn key={`${variantPC}Component`} variant={variantPC} />;
      })}
    </View>
  );
};

const HeroSquareScreen = () => (
  <ExampleScreen>
    <Example title="HeroSquare">
      <ListHeroSquares />
    </Example>
  </ExampleScreen>
);

const SpotRectangleScreen = () => (
  <ExampleScreen>
    <Example title="SpotRectangle">
      <ListSpotRectangles />
    </Example>
  </ExampleScreen>
);

const PictogramScreen = () => (
  <ExampleScreen>
    <Example title="Pictogram">
      <ListPictograms />
    </Example>
  </ExampleScreen>
);

const SpotSquareScreen = () => (
  <ExampleScreen>
    <Example title="SpotSquare">
      <ListSpotSquares />
    </Example>
  </ExampleScreen>
);

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
