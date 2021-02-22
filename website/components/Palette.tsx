import React from 'react';

import { wordCase, capitalize } from '@cbhq/cds-utils';
import {
  defaultPalette,
  palette,
  PaletteAlias,
  Spectrum,
  ThemeProvider,
  TextHeadline,
  TextLabel1,
} from '@cbhq/cds-web';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

import styles from './styles.module.css';

const nRows = Math.ceil(Object.keys(defaultPalette).length / 2);

export const PaletteTiles = () => {
  return (
    <section className={styles.twoColumns} style={{ gridTemplateRows: `repeat(${nRows}, auto)` }}>
      {Object.entries(defaultPalette).map(([name, value]) => (
        <div
          key={name}
          className={styles.paletteTile}
          style={{
            backgroundColor: palette[name as PaletteAlias],
            color:
              name.startsWith('foreground') || name === 'secondaryForeground'
                ? `var(--background)`
                : `var(--${name}-foreground, var(--foreground))`,
          }}
        >
          <TextHeadline
            color="currentColor"
            as="span"
            display="block"
            transform="capitalize"
            noWrap
          >
            {wordCase(name)}
          </TextHeadline>
          <TextLabel1 color="currentColor" as="span" display="block" transform="capitalize">
            {typeof value === 'string' ? value : value.join(' @ ')}
          </TextLabel1>
        </div>
      ))}
    </section>
  );
};

const Palette = ({ spectrum }: { spectrum: Spectrum }) => (
  <ThemeProvider scale="xSmall" spectrum={spectrum}>
    <h4>{capitalize(spectrum)}</h4>
    <PaletteTiles />
  </ThemeProvider>
);

export const Palettes = () => (
  <Tabs
    defaultValue="light"
    values={[
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ]}
  >
    <TabItem value="light">
      <Palette spectrum="light" />
    </TabItem>
    <TabItem value="dark">
      <Palette spectrum="dark" />
    </TabItem>
  </Tabs>
);
