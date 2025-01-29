import { render, screen } from '@testing-library/react';
import { ColorScheme } from '@cbhq/cds-common2/core/theme';
import { IllustrationVariant } from '@cbhq/cds-common2/types/IllustrationNames';
import spotSquareVersionMap from '@cbhq/cds-illustrations/__generated__/spotSquare/data/versionMap';

import { DefaultThemeProvider } from '../../utils/test';
import { SpotSquare, SpotSquareName } from '../SpotSquare';

const getURL = (
  type: IllustrationVariant,
  name: string,
  versionNum: number,
  activeColorScheme: ColorScheme,
) => {
  return `https://static-assets.coinbase.com/ui-infra/illustration/v1/${type}/svg/${activeColorScheme}/${name}-${versionNum}.svg`;
};

type ImageData = [name: string, activeColorScheme: ColorScheme, url: string];

const images: ImageData[] = [];

Object.entries(spotSquareVersionMap).forEach(([name, version]) => {
  const lightUrl = getURL('spotSquare', name, version, 'light');
  const darkUrl = getURL('spotSquare', name, version, 'dark');

  images.push([name, 'light', lightUrl]);
  images.push([name, 'dark', darkUrl]);
});

const TEST_ILLO_ALT = 'This is a special illustration';

describe('SpotSquares have correct url and alt tag for light mode', () => {
  it.each(images)('%p-%p has correct src and alt prop', (name, activeColorScheme, url) => {
    render(
      <DefaultThemeProvider activeColorScheme={activeColorScheme}>
        <SpotSquare name={name as SpotSquareName} testID={name} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(name)).toHaveAttribute('src', url);
    expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
  });
});

describe('can set alt', () => {
  it('for a SpotSquare', () => {
    render(
      <DefaultThemeProvider>
        <SpotSquare alt={TEST_ILLO_ALT} name="accessToAdvancedCharts" testID="spotSquare-example" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('spotSquare-example')).toHaveAttribute('alt', TEST_ILLO_ALT);
  });
});
