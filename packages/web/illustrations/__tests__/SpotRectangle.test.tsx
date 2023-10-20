import { render, screen } from '@testing-library/react';
import { IllustrationVariant } from '@cbhq/cds-common';
import { Spectrum } from '@cbhq/cds-common/types/Spectrum';
import spotRectangleVersionMap from '@cbhq/cds-illustrations/__generated__/spotRectangle/data/versionMap';

import { ThemeProvider } from '../../system';
import { SpotRectangle, SpotRectangleName } from '../SpotRectangle';

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

const versionMaps = {
  spotRectangle: spotRectangleVersionMap,
};

Object.entries(versionMaps).forEach(([type, items]) => {
  Object.entries(items).forEach(([name, version]) => {
    const lightUrl = getURL(type as IllustrationVariant, name, version, 'light');
    const darkUrl = getURL(type as IllustrationVariant, name, version, 'dark');

    images.push([name, 'light', lightUrl]);
    images.push([name, 'dark', darkUrl]);
  });
});

Object.entries(spotRectangleVersionMap).forEach(([name, version]) => {
  const lightUrl = getURL('spotRectangle', name, version, 'light');
  const darkUrl = getURL('spotRectangle', name, version, 'dark');

  images.push([name, 'light', lightUrl]);
  images.push([name, 'dark', darkUrl]);
});

const TEST_ILLO_ALT = 'This is a special illustration';

describe('SpotRectangles have correct url and alt tag for light mode', () => {
  it.each(images)('%p-%p has correct src and alt prop', (name, spectrum, url) => {
    if (spectrum === 'dark') {
      render(
        <ThemeProvider spectrum="dark">
          <SpotRectangle name={name as SpotRectangleName} testID={name} />
        </ThemeProvider>,
      );
    } else {
      render(<SpotRectangle name={name as SpotRectangleName} testID={name} />);
    }

    expect(screen.getByTestId(name)).toHaveAttribute('src', url);
    expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
  });
});

describe('can set alt', () => {
  it('for a SpotRectangle', () => {
    render(<SpotRectangle alt={TEST_ILLO_ALT} name="addBank" testID="spotRectangle-example" />);
    expect(screen.getByTestId('spotRectangle-example')).toHaveAttribute('alt', TEST_ILLO_ALT);
  });
});
