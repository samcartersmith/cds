import { useRef } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { Box } from '../../layout/Box';
import { useClickOutside } from '../useClickOutside';

const outsideElTestID = 'outside-el';
const cbSpy = jest.fn();

const Example = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  useClickOutside({ element: elementRef.current, callback: cbSpy });
  return (
    <Box testID={outsideElTestID}>
      Click me
      <Box ref={elementRef}>Element</Box>
    </Box>
  );
};

describe('useClickOutside.test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('does not fire callback unless enabled', () => {
    renderHook(() =>
      useClickOutside({
        element: (<div>children</div>) as unknown as HTMLElement,
        callback: cbSpy,
        enabled: false,
      }),
    );

    expect(cbSpy).not.toHaveBeenCalled();
  });
  it('fires callback when user clicks outside of element', () => {
    const { getByTestId } = render(<Example />);

    fireEvent.click(getByTestId(outsideElTestID));

    expect(cbSpy).toHaveBeenCalled();
  });
});
