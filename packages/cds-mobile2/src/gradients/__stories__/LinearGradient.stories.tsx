import React from 'react';
import { loremIpsum } from '@cbhq/cds-common2/internal/data/loremIpsum';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { TextBody, TextLabel1 } from '../../typography';
import { LinearGradient } from '../LinearGradient';

const stops = [0, 0.5, 1];
const LinearGradientScreen = () => {
  const theme = useTheme();
  const { background, backgroundPrimary, backgroundPositive, backgroundNegative } = theme.color;
  const backgroundTransparent = theme.color.transparent;
  return (
    <ExampleScreen>
      <Example inline title="As Background">
        <LinearGradient colors={[backgroundPrimary, backgroundPositive]}>
          <TextBody>First example</TextBody>
        </LinearGradient>
        <LinearGradient
          colors={[backgroundPrimary, backgroundPositive, backgroundNegative]}
          stops={stops}
        >
          <TextBody>Second example</TextBody>
        </LinearGradient>
        <TextLabel1>Horizontal gradient</TextLabel1>
        <LinearGradient
          angle={90}
          colors={[backgroundPrimary, backgroundPositive, backgroundNegative]}
          stops={stops}
        >
          <TextBody>Horizontal angle example</TextBody>
        </LinearGradient>
      </Example>
      <Example inline title="As overlay with isBelowChildren set to false">
        <LinearGradient colors={[backgroundTransparent, background]} isBelowChildren={false}>
          <TextBody>{loremIpsum}...</TextBody>
        </LinearGradient>
        <TextLabel1>More</TextLabel1>
      </Example>
      <Example inline title="As overlay with elevated prop">
        <LinearGradient elevated colors={[backgroundTransparent, background]}>
          <TextBody>{loremIpsum}...</TextBody>
        </LinearGradient>
        <TextLabel1>More</TextLabel1>
      </Example>
    </ExampleScreen>
  );
};

export default LinearGradientScreen;
