import { measureRenders } from 'reassure';
import { ElevationLevels, ResponsiveProps } from '@cbhq/cds-common';

import { Box } from '../Box';

const responsiveConfig: ResponsiveProps = {
  phone: {
    justifyContent: 'flex-start',
    spacing: 5,
  },
  tablet: {
    justifyContent: 'space-around',
    spacing: 3,
  },
  desktop: {
    justifyContent: 'flex-end',
    spacing: 1,
  },
};

describe('Box performance test', () => {
  it('renders', async () => {
    await measureRenders(<Box />);
  });
  it('renders with elevation', async () => {
    await measureRenders(<Box elevation={2 as ElevationLevels} />);
  });
  it('renders with a responsive config', async () => {
    await measureRenders(<Box responsiveConfig={responsiveConfig} />);
  });
});
