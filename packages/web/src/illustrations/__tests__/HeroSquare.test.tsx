import { render, screen } from '@testing-library/react';
import { IllustrationVariant } from '@cbhq/cds-common';
import { Spectrum } from '@cbhq/cds-common/types/Spectrum';
import heroSquareVersionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/versionMap';

import { ThemeProvider } from '../../system';
import { HeroSquare, HeroSquareName } from '../HeroSquare';

const getURL = (
  type: IllustrationVariant,
  name: string,
  versionNum: number,
  spectrum: Spectrum,
) => {
  return `https://static-assets.coinbase.com/ui-infra/illustration/v1/${type}/svg/${spectrum}/${name}-${versionNum}.svg`;
};

type ImageData = [name: string, spectrum: Spectrum, url: string];

const images: ImageData[] = [];

Object.entries(heroSquareVersionMap).forEach(([name, version]) => {
  const lightUrl = getURL('heroSquare', name, version, 'light');
  const darkUrl = getURL('heroSquare', name, version, 'dark');

  images.push([name, 'light', lightUrl]);
  images.push([name, 'dark', darkUrl]);
});

const TEST_ILLO_ALT = 'This is a special illustration';

describe('HeroSquares have correct url and alt tag for light mode', () => {
  it.each(images)('%p-%p has correct src and alt prop', (name, spectrum, url) => {
    if (spectrum === 'dark') {
      render(
        <ThemeProvider spectrum="dark">
          <HeroSquare name={name as HeroSquareName} testID={name} />
        </ThemeProvider>,
      );
    } else {
      render(<HeroSquare name={name as HeroSquareName} testID={name} />);
    }

    expect(screen.getByTestId(name)).toHaveAttribute('src', url);
    expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
  });
});

describe('can set alt', () => {
  it('for a HeroSquare', () => {
    render(<HeroSquare alt={TEST_ILLO_ALT} name="add2Fa" testID="HeroSquare-example" />);

    expect(screen.getByTestId('HeroSquare-example')).toHaveAttribute('alt', TEST_ILLO_ALT);
  });
});
