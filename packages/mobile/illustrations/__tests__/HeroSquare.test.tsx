import { render, screen } from '@testing-library/react-native';

import { HeroSquare } from '../HeroSquare';

const PICTOGRAM_TEST_ID = 'add-hero-square-test';

describe('HeroSquare', () => {
  it('passes a11y', () => {
    render(<HeroSquare name="docError" testID={PICTOGRAM_TEST_ID} />);
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toBeAccessible();
  });

  it('renders a HeroSquare', () => {
    render(<HeroSquare name="docError" testID={PICTOGRAM_TEST_ID} />);
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toBeTruthy();
  });

  it('renders a HeroSquare with accessibilityHint and accessibilityLabel', () => {
    render(
      <HeroSquare
        name="docError"
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
    // This should automatically be set to always be image
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp('accessibilityRole', 'image');

    // This should be true if accessibility label is passed
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp('accessible', true);
  });
  it('renders a HeroSquare with accessibilityHint and no accessibilityLabel', () => {
    render(
      <HeroSquare
        name="docError"
        testID={PICTOGRAM_TEST_ID}
        accessibilityHint="Accessibility Hint"
      />,
    );
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toBeTruthy();

    const HeroSquareComponent = screen.getByTestId(PICTOGRAM_TEST_ID);

    expect(HeroSquareComponent).toHaveProp('accessibilityLabel', undefined);
    expect(HeroSquareComponent).toHaveProp('accessibilityHint', 'Accessibility Hint');

    // This should automatically be set to always be image
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp('accessibilityRole', 'image');

    // This should be false since there's no accessible prop or accessibilityLabel prop
    expect(screen.getByTestId(PICTOGRAM_TEST_ID)).toHaveProp('accessible', false);
  });
});
