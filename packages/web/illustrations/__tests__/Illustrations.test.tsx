import { render, screen } from '@testing-library/react';
import { IllustrationNames, IllustrationVariant } from '@cbhq/cds-common';
import { Spectrum } from '@cbhq/cds-common/types/Spectrum';

import { ThemeProvider } from '../../system';
import { HeroSquare } from '../HeroSquare';
import { Illustration, versionMaps } from '../Illustration';
import { Pictogram } from '../Pictogram';
import { SpotRectangle } from '../SpotRectangle';
import { SpotSquare } from '../SpotSquare';

const getURL = (
  type: IllustrationVariant,
  name: string,
  versionNum: number,
  spectrum: Spectrum,
) => {
  return `https://static-assets.coinbase.com/ui-infra/illustration/v1/${type}/svg/${spectrum}/${name}-${versionNum}.svg`;
};

type ImageData = [type: IllustrationVariant, name: string, spectrum: Spectrum, url: string];

const images: ImageData[] = [];

Object.entries(versionMaps).forEach(([type, items]) => {
  Object.entries(items).forEach(([name, version]) => {
    const lightUrl = getURL(type as IllustrationVariant, name, version, 'light');
    const darkUrl = getURL(type as IllustrationVariant, name, version, 'dark');

    images.push([type as IllustrationVariant, name, 'light', lightUrl]);
    images.push([type as IllustrationVariant, name, 'dark', darkUrl]);
  });
});

const TEST_ILLO_NAME: IllustrationNames = 'accessToAdvancedCharts';
const TEST_ILLO_ALT = 'This is a special illustration';

describe('illustrations have correct url and alt tag for light mode', () => {
  it.each(images)('%p-%p has correct src and alt prop', (type, name, spectrum, url) => {
    if (spectrum === 'dark') {
      render(
        <ThemeProvider spectrum="dark">
          <Illustration type={type} name={name as never} testID={name} />
        </ThemeProvider>,
      );
    } else {
      render(<Illustration type={type} name={name as never} testID={name} />);
    }

    expect(screen.getByTestId(name)).toHaveAttribute('src', url);
    expect(screen.getByTestId(name)).toHaveAttribute('alt', '');
  });

  it('can set a custom alt attr', () => {
    render(
      <Illustration
        type="heroSquare"
        name={TEST_ILLO_NAME}
        testID={TEST_ILLO_NAME}
        alt={TEST_ILLO_ALT}
      />,
    );

    expect(screen.getByTestId(TEST_ILLO_NAME)).toHaveAttribute('alt', TEST_ILLO_ALT);
  });
});

describe('can set alt for each variant', () => {
  it('can set a custom alt attr for a Pictogram', () => {
    render(<Pictogram name="2fa" testID="pictogram-example" alt={TEST_ILLO_ALT} />);

    expect(screen.getByTestId('pictogram-example')).toHaveAttribute('alt', TEST_ILLO_ALT);
  });
  it('can set a custom alt attr for a SpotSquare', () => {
    render(
      <SpotSquare name="accessToAdvancedCharts" testID="spotSquare-example" alt={TEST_ILLO_ALT} />,
    );

    expect(screen.getByTestId('spotSquare-example')).toHaveAttribute('alt', TEST_ILLO_ALT);
  });
  it('can set a custom alt attr for a SpotRectangle', () => {
    render(<SpotRectangle name="addBank" testID="SpotRectangle-example" alt={TEST_ILLO_ALT} />);

    expect(screen.getByTestId('SpotRectangle-example')).toHaveAttribute('alt', TEST_ILLO_ALT);
  });
  it('can set a custom alt attr for a HeroSquare', () => {
    render(<HeroSquare name="add2Fa" testID="HeroSquare-example" alt={TEST_ILLO_ALT} />);

    expect(screen.getByTestId('HeroSquare-example')).toHaveAttribute('alt', TEST_ILLO_ALT);
  });
});
