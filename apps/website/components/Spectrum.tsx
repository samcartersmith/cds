import React from 'react';
import ExampleWithThemeToggles from '@theme/ExampleWithThemeToggles';
import { useAccessibleForeground } from '@cbhq/cds-web/color/useAccessibleForeground';
import { usePaletteValueToRgbaString } from '@cbhq/cds-web/color/usePaletteValueToRgbaString';
import { TextCaption } from '@cbhq/cds-web/typography/TextCaption';
import { paletteValueToCssVar } from '@cbhq/cds-web/utils/palette';

import styles from './styles.module.css';

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

export const Spectrum = () => {
  const getAccessibleForeground = useAccessibleForeground();
  const getRgbaString = usePaletteValueToRgbaString();
  return (
    <ExampleWithThemeToggles>
      <div className={styles.hueGrid}>
        {hueNames.map((hue) => {
          return (
            <div key={hue} className={styles.hueColumn}>
              {hueSteps.map((step) => {
                const paletteValue = `${hue}${step}` as const;
                const background = getRgbaString(paletteValue);
                const backgroundColor = paletteValueToCssVar(paletteValue);
                const foreground = getAccessibleForeground({
                  background,
                  color: 'auto',
                  usage: 'normalText',
                });
                return (
                  <div key={paletteValue} className={styles.hueBox} style={{ backgroundColor }}>
                    <span className={styles.hue}>
                      <TextCaption dangerouslySetColor={foreground} as="span" align="center">
                        {paletteValue}
                      </TextCaption>
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </ExampleWithThemeToggles>
  );
};
