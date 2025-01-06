import { render, screen } from '@testing-library/react-native';

import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('passes a11y', () => {
    render(<Spinner testID="mock-spinner" />);
    expect(screen.getByTestId('mock-spinner')).toBeAccessible();
  });
});
