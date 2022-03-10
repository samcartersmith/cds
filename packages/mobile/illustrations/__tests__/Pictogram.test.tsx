import { render } from '@testing-library/react-native';

import { Pictogram } from '../Pictogram';

const PICTOGRAM_TEST_ID = 'add-pictogram-test';

describe('Pictogram', () => {
  it('renders a pictogram', () => {
    const result = render(<Pictogram name="add" testID={PICTOGRAM_TEST_ID} />);
    expect(result.getByTestId(PICTOGRAM_TEST_ID)).toBeTruthy();
  });
});
