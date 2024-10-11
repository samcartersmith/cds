import { fireEvent, screen } from '@testing-library/react';
import { measureRenders } from 'reassure';
import { NoopFn } from '@cbhq/cds-common/utils/mockUtils';

import { Button } from '../Button';

describe('Button performance tests', () => {
  it('fires `onPress` when clicked', async () => {
    const scenario = async () => {
      fireEvent.click(screen.getByRole('button'));
    };
    await measureRenders(<Button onPress={NoopFn}>Child</Button>, { scenario });
  });
  it('renders when loading', async () => {
    await measureRenders(<Button loading>Child</Button>);
  });
});
