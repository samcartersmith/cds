import { render, screen } from '@testing-library/react-native';

import { Button } from '../../buttons';
import { StickyFooter } from '../StickyFooter';

jest.mock('../../hooks/useSafeBottomPadding', () => {
  return {
    useSafeBottomPadding: jest.fn().mockReturnValue(0),
  };
});

describe('StickyFooter', () => {
  it('passes a11y', () => {
    render(<StickyFooter />);
    expect(screen.getByTestId('sticky-footer')).toBeAccessible();
  });
  it('renders children', () => {
    render(
      <StickyFooter>
        <Button>Action</Button>
      </StickyFooter>,
    );
    expect(screen.getByText('Action')).toBeTruthy();
  });
});
