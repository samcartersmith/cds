import { render, screen } from '@testing-library/react';
import { IllustrationVariant } from '@cbhq/cds-common';
import { Spectrum } from '@cbhq/cds-common/types/Spectrum';
import spotSquareVersionMap from '@cbhq/cds-illustrations/__generated__/spotSquare/data/versionMap';

import { ThemeProvider } from '../../system';
import { SpotSquare, SpotSquareName } from '../SpotSquare';

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

Object.entries(spotSquareVersionMap).forEach(([name, version]) => {
  const lightUrl = getURL('spotSquare', name, version, 'light');
  const darkUrl = getURL('spotSquare', name, version, 'dark');

  images.push([name, 'light', lightUrl]);
  images.push([name, 'dark', darkUrl]);
});

const TEST_ILLO_ALT = 'This is a special illustration';

describe('SpotSquares have correct url and alt tag for light mode', () => {
  it.each(images)('%p-%p has correct src and alt prop', (name, spectrum, url) => {
    if (spectrum === 'dark') {
      render(
        <ThemeProvider spectrum="dark">
          <SpotSquare name={name as SpotSquareName} testID={name} />
        </ThemeProvider>,
      );
    } else {
      render(<SpotSquare name={name as SpotSquareName} testID={name} />);
    }

    expect(screen.getByTestId(name)).toHaveAttribute('src', url);
    expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
  });
});

describe('can set alt', () => {
  it('for a SpotSquare', () => {
    render(
      <SpotSquare name="accessToAdvancedCharts" testID="spotSquare-example" alt={TEST_ILLO_ALT} />,
    );
    expect(screen.getByTestId('spotSquare-example')).toHaveAttribute('alt', TEST_ILLO_ALT);
  });
});
