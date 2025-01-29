import { render, screen } from '@testing-library/react';
import { ColorScheme } from '@cbhq/cds-common2/core/theme';
import { IllustrationVariant } from '@cbhq/cds-common2/types/IllustrationNames';
import heroSquareVersionMap from '@cbhq/cds-illustrations/__generated__/heroSquare/data/versionMap';

import { DefaultThemeProvider } from '../../utils/test';
import { HeroSquare, HeroSquareName } from '../HeroSquare';

const getURL = (
  type: IllustrationVariant,
  name: string,
  version: number,
  activeColorScheme: ColorScheme,
) => {
  return `https://static-assets.coinbase.com/ui-infra/illustration/v1/${type}/svg/${activeColorScheme}/${name}-${version}.svg`;
};

type ImageData = [name: string, activeColorScheme: ColorScheme, url: string];

const images: ImageData[] = [];

Object.entries(heroSquareVersionMap).forEach(([name, version]) => {
  const lightUrl = getURL('heroSquare', name, version, 'light');
  const darkUrl = getURL('heroSquare', name, version, 'dark');

  images.push([name, 'light', lightUrl]);
  images.push([name, 'dark', darkUrl]);
});

const TEST_ILLO_ALT = 'This is a special illustration';

describe('HeroSquares have correct url and alt tag for light mode', () => {
  it.each(images)('%p-%p has correct src and alt prop', (name, activeColorScheme, url) => {
    render(
      <DefaultThemeProvider activeColorScheme={activeColorScheme}>
        <HeroSquare name={name as HeroSquareName} testID={name} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(name)).toHaveAttribute('src', url);
    expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
  });
});

describe('can set alt', () => {
  it('for a HeroSquare', () => {
    render(
      <DefaultThemeProvider>
        <HeroSquare alt={TEST_ILLO_ALT} name="add2Fa" testID="HeroSquare-example" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('HeroSquare-example')).toHaveAttribute('alt', TEST_ILLO_ALT);
  });
});
