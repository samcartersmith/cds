import { render, screen } from '@testing-library/react-native';

import { Fallback } from '../Fallback';

const testID = 'test-fallback';
const props = {
  width: 100,
  height: 50,
  testID,
};

describe('Fallback', () => {
  it('passes accessibility', async () => {
    render(<Fallback {...props} />);
    expect(screen.getByTestId(testID)).toBeAccessible();
  });
});
