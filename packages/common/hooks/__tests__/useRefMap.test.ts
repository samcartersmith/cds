import { act, renderHook } from '@testing-library/react-hooks';

import { useRefMap } from '../useRefMap';

const MOCKS = [
  { id: 'buy', label: 'Buy', testID: 'buy-tab' },
  { id: 'sell', label: 'Sell', testID: 'sell-tab' },
  { id: 'convert', label: 'Convert', testID: 'convert-tab' },
];

const mockElement1 = document.createElement('div');
const mockElement2 = document.createElement('span');
const mockElement3 = document.createElement('p');

const EXPECTED = new WeakMap();
EXPECTED.set(MOCKS[0], mockElement1);
EXPECTED.set(MOCKS[1], mockElement2);
EXPECTED.set(MOCKS[2], mockElement3);

describe('useRefMap', () => {
  it('should add elements to the refMap', () => {
    const { result } = renderHook(() => useRefMap(MOCKS));
    const { refs, getRef, registerRef } = result.current;

    act(() => {
      registerRef(MOCKS[0].id, mockElement1);
      registerRef(MOCKS[1].id, mockElement2);
      registerRef(MOCKS[2].id, mockElement3);
    });
    expect(getRef(MOCKS[0].id)).toEqual(mockElement1);
    expect(getRef(MOCKS[1].id)).toEqual(mockElement2);
    expect(getRef(MOCKS[2].id)).toEqual(mockElement3);
    expect(refs).toEqual(EXPECTED);
  });
});
