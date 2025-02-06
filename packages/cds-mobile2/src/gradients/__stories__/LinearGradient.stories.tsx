import React from 'react';
import { loremIpsum } from '@cbhq/cds-common2/internal/data/loremIpsum';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { TextBody, TextLabel1 } from '../../typography';
import { LinearGradient } from '../LinearGradient';

const stops = [0, 0.5, 1];
const LinearGradientScreen = () => {
  const theme = useTheme();
  const { bg, bgPrimary, bgPositive, bgNegative, transparent } = theme.color;
  return (
    <ExampleScreen>
      <Example inline title="As Background">
        <LinearGradient colors={[bgPrimary, bgPositive]}>
          <TextBody>First example</TextBody>
        </LinearGradient>
        <LinearGradient colors={[bgPrimary, bgPositive, bgNegative]} stops={stops}>
          <TextBody>Second example</TextBody>
        </LinearGradient>
        <TextLabel1>Horizontal gradient</TextLabel1>
        <LinearGradient angle={90} colors={[bgPrimary, bgPositive, bgNegative]} stops={stops}>
          <TextBody>Horizontal angle example</TextBody>
        </LinearGradient>
      </Example>
      <Example inline title="As overlay with isBelowChildren set to false">
        <LinearGradient colors={[transparent, bg]} isBelowChildren={false}>
          <TextBody>{loremIpsum}...</TextBody>
        </LinearGradient>
        <TextLabel1>More</TextLabel1>
      </Example>
      <Example inline title="As overlay with elevated prop">
        <LinearGradient elevated colors={[transparent, bg]}>
          <TextBody>{loremIpsum}...</TextBody>
        </LinearGradient>
        <TextLabel1>More</TextLabel1>
      </Example>
    </ExampleScreen>
  );
};

export default LinearGradientScreen;
