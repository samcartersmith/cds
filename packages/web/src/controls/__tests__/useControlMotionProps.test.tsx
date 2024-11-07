import { renderHook } from '@testing-library/react-hooks';

import { palette } from '../../tokens';
import { useControlMotionProps } from '../useControlMotionProps';

describe('useControlMotionProps.test', () => {
  it('animates enter if checked', () => {
    const { result } = renderHook(() => useControlMotionProps({ checked: true }));

    expect(result.current.innerContainerMotionProps.animate).toBe('enter');
  });

  it('animates exit if unchecked', () => {
    const { result } = renderHook(() => useControlMotionProps({ checked: false }));

    expect(result.current.innerContainerMotionProps.animate).toBe('exit');
  });

  it('animates background color', () => {
    const { result } = renderHook(() =>
      useControlMotionProps({ checked: false, shouldAnimateBackground: true }),
    );

    expect(result.current.outerContainerMotionProps.variants?.enter).toMatchObject({
      backgroundColor: palette.primary,
    });
    expect(result.current.outerContainerMotionProps.variants?.exit).toMatchObject({
      backgroundColor: palette.background,
    });
  });

  it('does not animates background color', () => {
    const { result } = renderHook(() =>
      useControlMotionProps({ checked: false, shouldAnimateBackground: false }),
    );

    expect(result.current.outerContainerMotionProps.variants?.enter).not.toHaveProperty(
      'backgroundColor',
    );
    expect(result.current.outerContainerMotionProps.variants?.exit).not.toHaveProperty(
      'backgroundColor',
    );
  });

  it('animates initial background color', () => {
    const { result } = renderHook(() =>
      useControlMotionProps({
        checked: false,
        shouldAnimateBackground: true,
        initialBackground: palette.backgroundAlternate,
      }),
    );

    expect(result.current.outerContainerMotionProps.variants?.enter).toMatchObject({
      backgroundColor: palette.primary,
    });
    expect(result.current.outerContainerMotionProps.variants?.exit).toMatchObject({
      backgroundColor: palette.backgroundAlternate,
    });
  });
});
