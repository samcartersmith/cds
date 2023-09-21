import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useTriggerFocus } from '../useTriggerFocus';

const focusSpy = jest.fn();
let mockRef = { current: { focus: jest.fn() } };

describe('useTriggerFocus', () => {
  beforeEach(() => {
    mockRef = { current: { focus: focusSpy } };
    jest.spyOn(React, 'useRef').mockReturnValue(mockRef);
  });

  it('returns expected props', () => {
    const { result } = renderHook(() => useTriggerFocus());

    expect(result.current.triggerRef).toEqual(mockRef);
    expect(typeof result.current.focusTrigger).toBe('function');
  });

  it('focusTrigger method calls focus on trigger element', () => {
    const { result } = renderHook(() => useTriggerFocus());
    result.current.focusTrigger();

    expect(focusSpy).toHaveBeenCalledTimes(1);
  });
});
