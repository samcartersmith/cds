import { render, screen } from '@testing-library/react';
import { sortedImg } from '@cbhq/cds-common/internal/data/sortedIllustrationData';
import { Spectrum } from '@cbhq/cds-common/types/Spectrum';

import { ThemeProvider } from '../../system';
import { Illustration } from '../Illustration';
import { versionNumManifest } from '../versionNumManifest';

const getURL = (name: string, versionNum: number, spectrum: Spectrum) => {
  return `https://static-assets.coinbase.com/design-system/illustrations/${spectrum}/${name}-${versionNum}.svg`;
};

type ImageData = [name: string, spectrum: Spectrum, url: string];

const images: ImageData[] = sortedImg.map((nameAndSpectrum) => {
  const [name, spectrum] = nameAndSpectrum.split('-') as [string, Spectrum];
  const versionNum = versionNumManifest[nameAndSpectrum];
  const url = getURL(name, versionNum, spectrum);

  return [name, spectrum, url];
});

describe('illustrations have correct url and alt tag for light mode', () => {
  it.each(images)('%p-%p has correct src and alt prop', (name, spectrum, url) => {
    if (spectrum === 'dark') {
      render(
        <ThemeProvider spectrum="dark">
          <Illustration name={name as never} />
        </ThemeProvider>,
      );
    } else {
      render(<Illustration name={name as never} />);
    }

    expect(screen.getByAltText(name)).toHaveAttribute('src', url);
  });
});
