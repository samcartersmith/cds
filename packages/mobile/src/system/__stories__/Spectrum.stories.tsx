import React from 'react';
import { useSpectrum } from '@cbhq/cds-common/src/spectrum/useSpectrum';
import { useFeatureFlag } from '@cbhq/cds-common/src/system/useFeatureFlag';

import { useAccessibleForeground } from '../../color/useAccessibleForeground';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout/VStack';
import { TextCaption } from '../../typography/TextCaption';
import { paletteValueToRgbaString } from '../../utils/palette';

const hueNames = [
  'blue',
  'teal',
  'green',
  'orange',
  'yellow',
  'gray',
  'indigo',
  'pink',
  'purple',
  'red',
] as const;
export const hueSteps = [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const;

const SpectrumScreen = () => {
  const spectrum = useSpectrum();
  const hasFrontier = useFeatureFlag('frontierColor');
  const getAccessibleForeground = useAccessibleForeground();

  return (
    <ExampleScreen>
      <Example title="Default">
        {hueNames.map((hue) => {
          return (
            <VStack key={hue}>
              {hueSteps.map((step) => {
                const paletteValue = `${hue}${step}` as const;
                const background = paletteValueToRgbaString(paletteValue, spectrum, hasFrontier);
                const foreground = getAccessibleForeground({
                  background,
                  color: 'auto',
                  usage: 'normalText',
                });
                return (
                  <VStack key={paletteValue} dangerouslySetBackground={background}>
                    <TextCaption dangerouslySetColor={foreground} align="center">
                      {paletteValue}
                    </TextCaption>
                  </VStack>
                );
              })}
            </VStack>
          );
        })}
      </Example>
    </ExampleScreen>
  );
};

export default SpectrumScreen;
