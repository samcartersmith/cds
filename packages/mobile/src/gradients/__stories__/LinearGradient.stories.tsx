import React from 'react';
import { overrideAlpha } from '@cbhq/cds-common/color/overrideAlpha';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { usePalette } from '../../hooks/usePalette';
import { TextBody, TextLabel1 } from '../../typography';
import { LinearGradient } from '../LinearGradient';

const stops = [0, 0.5, 1];
const LinearGradientScreen = () => {
  const { background, primary, positive, negative } = usePalette();
  const backgroundTransparent = overrideAlpha(background, 0);
  return (
    <ExampleScreen>
      <Example inline title="As Background">
        <LinearGradient colors={[primary, positive]}>
          <TextBody>First example</TextBody>
        </LinearGradient>
        <LinearGradient colors={[primary, positive, negative]} stops={stops}>
          <TextBody>Second example</TextBody>
        </LinearGradient>
        <TextLabel1>Horizontal gradient</TextLabel1>
        <LinearGradient angle={90} colors={[primary, positive, negative]} stops={stops}>
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
