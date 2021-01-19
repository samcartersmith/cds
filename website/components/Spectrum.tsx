import React, { useMemo } from 'react';

import { ThemeProvider } from '@cds/theme';
import { TextCaption } from '@cds/web';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

import styles from './styles.module.css';

const hueNames = [
  'blue',
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
  const spectrumHues = useMemo(() => {
    return hueNames.map(hue => {
      return (
        <div key={hue} className={styles.hueColumn}>
          {hueSteps.map(step => {
            return (
              <div
                key={`${hue}${step}`}
                className={styles.hueBox}
                style={{ backgroundColor: `rgb(var(--${hue}${step}))` }}
              >
                <span className={styles.hue}>
                  <TextCaption as="span" align="center">{`${hue}${step}`}</TextCaption>
                </span>
              </div>
            );
          })}
        </div>
      );
    });
  }, []);

  return (
    <Tabs
      defaultValue="light"
      values={[
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ]}
    >
      <TabItem value="light">
        <ThemeProvider spectrum="light">
          <div className={styles.hueGrid}>{spectrumHues}</div>
        </ThemeProvider>
      </TabItem>
      <TabItem value="dark">
        <ThemeProvider spectrum="dark">
          <div className={styles.hueGrid}>{spectrumHues}</div>
        </ThemeProvider>
      </TabItem>
    </Tabs>
  );
};
