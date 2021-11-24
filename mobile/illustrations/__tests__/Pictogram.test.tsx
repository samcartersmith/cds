import { render, waitFor } from '@testing-library/react-native';

import { Pictogram } from '../Pictogram';

const PICTOGRAM_TEST_ID = 'add-pictogram-test';

describe('Pictogram', () => {
  it('renders a pictogram', async () => {
    const result = render(<Pictogram name="add" testID={PICTOGRAM_TEST_ID} />);

    await waitFor(() => result.getByTestId(PICTOGRAM_TEST_ID));

    expect(result.getByTestId('add-pictogram-test')).toBeTruthy();
  });
});
