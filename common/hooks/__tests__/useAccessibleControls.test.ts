import { renderHook } from '@testing-library/react-hooks';
import { useAccessibleControlledVisibility } from '../useAccessibleControlledVisibility';

const mockAccessibilityLabel = 'test';

describe('useAccessibleControlledVisibility', () => {
  it('expect it to return the correct attributes when given a visibility prop of false', () => {
    const { result } = renderHook(() => useAccessibleControlledVisibility(false));
    expect(result.current.triggerAccessibilityProps['aria-expanded']).toEqual(false);
    expect(result.current.triggerAccessibilityProps['aria-haspopup']).toEqual('dialog');
  });
  it('expect it to return the correct attributes when given a visibility prop of true', () => {
    const { result } = renderHook(() => useAccessibleControlledVisibility(true));
    expect(result.current.triggerAccessibilityProps['aria-expanded']).toEqual(true);
    expect(result.current.triggerAccessibilityProps['aria-haspopup']).toEqual('dialog');
  });
  it('expect trigger aria-controls prop and controlled element id to contain accessibility label when provided', () => {
    const { result } = renderHook(() =>
      useAccessibleControlledVisibility(false, mockAccessibilityLabel),
    );
    expect(result.current.triggerAccessibilityProps['aria-controls']).toContain(
      mockAccessibilityLabel,
    );
    expect(result.current.controlledElementAccessibilityProps.id).toContain(mockAccessibilityLabel);
  });
});
