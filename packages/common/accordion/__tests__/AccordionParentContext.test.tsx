import { renderHook } from '@testing-library/react-hooks';

import { AccordionBaseProps } from '../../types';
import { AccordionParentProvider, useAccordionParent } from '../AccordionParentContext';

describe('AccordionParentProvider', () => {
  it('sets default active key', () => {
    const { result } = renderHook(() => useAccordionParent(), {
      wrapper: ({ children }: { children: AccordionBaseProps['children'] }) => (
        <AccordionParentProvider defaultActiveKey="2">{children}</AccordionParentProvider>
      ),
    });
    expect(result.current.activeKey).toBe('2');
  });

  it('sets active key on item press', () => {
    const { result } = renderHook(() => useAccordionParent(), {
      wrapper: ({ children }: { children: AccordionBaseProps['children'] }) => (
        <AccordionParentProvider defaultActiveKey="2">{children}</AccordionParentProvider>
      ),
    });

    // sets to undefined if active item is pressed
    result.current.onChange('2');
    expect(result.current.activeKey).toBeUndefined();

    result.current.onChange('1');
    expect(result.current.activeKey).toBe('1');
  });
});
