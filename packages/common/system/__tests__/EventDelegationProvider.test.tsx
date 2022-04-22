import { act, renderHook } from '@testing-library/react-hooks';

import { EventCustomConfig, EventDelegationProvider } from '../EventDelegationProvider';
import { useEventDelegation } from '../useEventDelegation';

describe('EventDelegationProvider', () => {
  const EVENT_DELEGATION_CONFIG = {
    Button: {
      onPress: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should return noOp when called with no config and no parameters', () => {
    const { result } = renderHook(() => useEventDelegation('Button', 'onPress'), {
      wrapper: ({ children }) => <EventDelegationProvider>{children}</EventDelegationProvider>,
    });
    expect(result.current).toBeDefined();
  });

  it('should use noOp because customOptions are not provided', () => {
    const { result } = renderHook(() => useEventDelegation('Button', 'onPress'), {
      wrapper: ({ children }) => (
        <EventDelegationProvider config={EVENT_DELEGATION_CONFIG}>
          {children}
        </EventDelegationProvider>
      ),
    });
    expect(result.current).not.toBe(EVENT_DELEGATION_CONFIG.Button.onPress);
  });

  it('Button onPress should not be called with custom parameters and enabled undefined', () => {
    const customEventConfig: EventCustomConfig = {
      actions: ['onPress'],
      componentName: 'place_order',
      data: {
        side: 'buy',
      },
    };
    const { result } = renderHook(
      () => useEventDelegation('Button', 'onPress', customEventConfig),
      {
        wrapper: ({ children }) => (
          <EventDelegationProvider config={EVENT_DELEGATION_CONFIG}>
            {children}
          </EventDelegationProvider>
        ),
      },
    );
    expect(result.current).not.toBe(EVENT_DELEGATION_CONFIG.Button.onPress);
  });

  it('Button onPress should not be called with custom parameters and enabled set to false', () => {
    const customEventConfig: EventCustomConfig = {
      actions: ['onPress'],
      enabled: false,
      componentName: 'place_order',
      data: {
        currency: 'BTC',
      },
    };
    const { result } = renderHook(
      () => useEventDelegation('Button', 'onPress', customEventConfig),
      {
        wrapper: ({ children }) => (
          <EventDelegationProvider config={EVENT_DELEGATION_CONFIG}>
            {children}
          </EventDelegationProvider>
        ),
      },
    );
    void act(() => result.current());
    expect(EVENT_DELEGATION_CONFIG.Button.onPress).not.toHaveBeenCalled();
  });

  it('Button onPress should be called with custom parameters', () => {
    const customEventConfig: EventCustomConfig = {
      actions: ['onPress'],
      enabled: true,
      componentName: 'place_order',
      data: {
        currency: 'BTC',
      },
    };

    const { result } = renderHook(
      () => useEventDelegation('Button', 'onPress', customEventConfig),
      {
        wrapper: ({ children }) => (
          <EventDelegationProvider config={EVENT_DELEGATION_CONFIG}>
            {children}
          </EventDelegationProvider>
        ),
      },
    );
    void act(() => result.current());
    expect(EVENT_DELEGATION_CONFIG.Button.onPress).toHaveBeenCalledWith({
      componentName: customEventConfig.componentName,
      data: customEventConfig.data,
    });
  });
});
