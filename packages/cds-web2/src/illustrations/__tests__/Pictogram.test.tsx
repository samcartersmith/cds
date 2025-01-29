import { render, screen } from '@testing-library/react';
import { ColorScheme } from '@cbhq/cds-common2/core/theme';
import { IllustrationVariant } from '@cbhq/cds-common2/types/IllustrationNames';
import pictogramVersionMap from '@cbhq/cds-illustrations/__generated__/pictogram/data/versionMap';

import { DefaultThemeProvider } from '../../utils/test';
import { Pictogram, PictogramName } from '../Pictogram';

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

Object.entries(pictogramVersionMap).forEach(([name, version]) => {
  const lightUrl = getURL('pictogram', name, version, 'light');
  const darkUrl = getURL('pictogram', name, version, 'dark');

  images.push([name, 'light', lightUrl]);
  images.push([name, 'dark', darkUrl]);
});

const TEST_ILLO_ALT = 'This is a special illustration';

describe('Pictograms have correct url and alt tag for light mode', () => {
  it.each(images)('%p-%p has correct src and alt prop', (name, activeColorScheme, url) => {
    render(
      <DefaultThemeProvider activeColorScheme={activeColorScheme}>
        <Pictogram name={name as PictogramName} testID={name} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(name)).toHaveAttribute('src', url);
    expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
  });
});

describe('can set alt', () => {
  it('for a Pictogram', () => {
    render(
      <DefaultThemeProvider>
        <Pictogram alt={TEST_ILLO_ALT} name="2fa" testID="pictogram-example" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('pictogram-example')).toHaveAttribute('alt', TEST_ILLO_ALT);
  });
});
