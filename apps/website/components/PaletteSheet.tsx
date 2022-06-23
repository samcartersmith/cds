import { Fragment } from 'react';
import ExampleWithThemeToggles from '@theme/ExampleWithThemeToggles';
import { css } from 'linaria';
import { usePaletteConfig } from '@cbhq/cds-common';
import { paletteValueToTuple } from '@cbhq/cds-common/palette/paletteValueToTuple';
import { entries, wordCase } from '@cbhq/cds-utils';
import { usePalette } from '@cbhq/cds-web/hooks/usePalette';
import { TextHeadline, TextLabel1 } from '@cbhq/cds-web/typography';

const tile = css`
  padding: 12px 16px;
  border: 1px solid var(--palette-line);
  border-radius: 8px;
`;

const twoColumns = css`
  background-color: var(--background);
  padding: 16px;
  display: grid;
  column-gap: 20px;
  row-gap: 16px;
  grid-auto-flow: column;
  grid-auto-columns: min-content min-content;
  padding-right: 50px;
`;

type PaletteSheetProps = {
  hideToggles?: boolean;
};

export const PaletteTiles = () => {
  const palette = usePalette();
  const paletteConfig = usePaletteConfig();
  const nRows = Math.ceil(Object.keys(palette).length / 2);
  return (
    <section className={twoColumns} style={{ gridTemplateRows: `repeat(${nRows}, auto)` }}>
      {entries(palette).map(([name]) => {
        const paletteValue = paletteConfig[name];
        const [hueStep, opacity] = paletteValueToTuple(paletteValue);
        const foreground = ['foreground', 'secondaryForeground'].includes(name)
          ? `var(--background)`
          : `var(--${name}-foreground, var(--foreground))`;
        return (
          <div
            key={name}
            className={tile}
            style={{
              background: palette[name],
              color: foreground,
              border: `1px solid ${palette.line}`,
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
              {opacity !== 1 ? `${hueStep} @ ${opacity}` : hueStep}
            </TextLabel1>
          </div>
        );
      })}
    </section>
  );
};

export const PaletteSheet = ({ hideToggles }: PaletteSheetProps) => {
  const Wrapper = hideToggles ? Fragment : ExampleWithThemeToggles;
  return (
    <Wrapper>
      <PaletteTiles />
    </Wrapper>
  );
};
