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
      <Example title="As Background" inline>
        <LinearGradient colors={[primary, positive]}>
          <TextBody>First example</TextBody>
        </LinearGradient>
        <LinearGradient stops={stops} colors={[primary, positive, negative]}>
          <TextBody>Second example</TextBody>
        </LinearGradient>
        <TextLabel1>Horizontal gradient</TextLabel1>
        <LinearGradient angle={90} stops={stops} colors={[primary, positive, negative]}>
          <TextBody>Horizontal angle example</TextBody>
        </LinearGradient>
      </Example>
      <Example title="As Shadow" inline>
        <LinearGradient isBelowChildren={false} colors={[backgroundTransparent, background]}>
          <TextBody>{loremIpsum}...</TextBody>
        </LinearGradient>
        <TextLabel1>More</TextLabel1>
      </Example>
    </ExampleScreen>
  );
};

export default LinearGradientScreen;
