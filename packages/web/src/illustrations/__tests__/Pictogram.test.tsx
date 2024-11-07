import { render, screen } from '@testing-library/react';
import { IllustrationVariant } from '@cbhq/cds-common';
import { Spectrum } from '@cbhq/cds-common/types/Spectrum';
import pictogramVersionMap from '@cbhq/cds-illustrations/__generated__/pictogram/data/versionMap';

import { ThemeProvider } from '../../system';
import { Pictogram, PictogramName } from '../Pictogram';

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

Object.entries(pictogramVersionMap).forEach(([name, version]) => {
  const lightUrl = getURL('pictogram', name, version, 'light');
  const darkUrl = getURL('pictogram', name, version, 'dark');

  images.push([name, 'light', lightUrl]);
  images.push([name, 'dark', darkUrl]);
});

const TEST_ILLO_ALT = 'This is a special illustration';

describe('Pictograms have correct url and alt tag for light mode', () => {
  it.each(images)('%p-%p has correct src and alt prop', (name, spectrum, url) => {
    if (spectrum === 'dark') {
      render(
        <ThemeProvider spectrum="dark">
          <Pictogram name={name as PictogramName} testID={name} />
        </ThemeProvider>,
      );
    } else {
      render(<Pictogram name={name as PictogramName} testID={name} />);
    }

    expect(screen.getByTestId(name)).toHaveAttribute('src', url);
    expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
  });
});

describe('can set alt', () => {
  it('for a Pictogram', () => {
    render(<Pictogram alt={TEST_ILLO_ALT} name="2fa" testID="pictogram-example" />);
    expect(screen.getByTestId('pictogram-example')).toHaveAttribute('alt', TEST_ILLO_ALT);
  });
});
