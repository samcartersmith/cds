import { render, screen } from '@testing-library/react';
import type { IllustrationNames, IllustrationVariant } from '@cbhq/cds-common';
import { sortedImg } from '@cbhq/cds-common/internal/data/sortedIllustrationData';
import { Spectrum } from '@cbhq/cds-common/types/Spectrum';

import { ThemeProvider } from '../../system';
import { Illustration } from '../Illustration';
import { versionNumManifest } from '../versionNumManifest';

const getURL = (name: string, versionNum: number, spectrum: Spectrum) => {
  return `https://static-assets.coinbase.com/design-system/illustrations/${spectrum}/${name}-${versionNum}.svg`;
};

type ImageData = [type: IllustrationVariant, name: string, spectrum: Spectrum, url: string];

const images: ImageData[] = [];

Object.entries(sortedImg).forEach(([type, names]) => {
  names.forEach((nameAndSpectrum) => {
    const [name, spectrum] = nameAndSpectrum.split('-') as [string, Spectrum];
    const versionNum = versionNumManifest[nameAndSpectrum];
    const url = getURL(name, versionNum, spectrum);

    images.push([type as IllustrationVariant, name, spectrum, url]);
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
