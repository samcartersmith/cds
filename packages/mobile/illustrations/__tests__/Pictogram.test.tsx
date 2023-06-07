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

  it('renders a pictogram with accessibilityHint and accessibilityLabel', () => {
    render(
      <Pictogram
        name="add"
        testID={PICTOGRAM_TEST_ID}
        accessibilityHint="Accessibility Hint"
        accessibilityLabel="Accessibility Label"
      />,
    );
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toBeTruthy();
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp(
      'accessibilityLabel',
      'Accessibility Label',
    );
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp(
      'accessibilityHint',
      'Accessibility Hint',
    );
    // This should automatically be set always
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp('accessibilityRole', 'image');

    // This should be true if accessibility label is passed
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp('accessible', true);
  });

  it('renders a Pictogram with accessibilityHint and no accessibilityLabel', () => {
    render(
      <Pictogram name="add" testID={PICTOGRAM_TEST_ID} accessibilityHint="Accessibility Hint" />,
    );
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toBeTruthy();

    const PictogramComponent = screen.getByTestId(PICTOGRAM_TEST_ID);

    expect(PictogramComponent).toHaveProp('accessibilityLabel', undefined);
    expect(PictogramComponent).toHaveProp('accessibilityHint', 'Accessibility Hint');

    // This should automatically be set always
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp('accessibilityRole', 'image');

    // This should be false since there's no accessible prop or accessibilityLabel prop
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp('accessible', false);
  });
});
