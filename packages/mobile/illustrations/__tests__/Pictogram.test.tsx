import { render, screen } from '@testing-library/react-native';

import { Pictogram } from '../Pictogram';

const PICTOGRAM_TEST_ID = 'add-pictogram-test';

describe('Pictogram', () => {
  it('passes a11y', () => {
    render(<Pictogram name="add" testID={PICTOGRAM_TEST_ID} />);
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toBeAccessible();
  });

  it('renders a pictogram', () => {
    render(<Pictogram name="add" testID={PICTOGRAM_TEST_ID} />);
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toBeTruthy();
  });
});
