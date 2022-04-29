import { act, renderHook } from '@testing-library/react-hooks';

import { EventHandlerCustomConfig, EventHandlerProvider } from '../EventHandlerProvider';
import { useEventHandler } from '../useEventHandler';

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
    const { result } = renderHook(() => useEventHandler('Button', 'onPress'), {
      wrapper: ({ children }) => <EventHandlerProvider>{children}</EventHandlerProvider>,
    });
    expect(result.current).toBeDefined();
  });

  it('should use noOp because customOptions are not provided', () => {
    const { result } = renderHook(() => useEventHandler('Button', 'onPress'), {
      wrapper: ({ children }) => (
        <EventHandlerProvider config={EVENT_DELEGATION_CONFIG}>{children}</EventHandlerProvider>
      ),
    });
    expect(result.current).not.toBe(EVENT_DELEGATION_CONFIG.Button.onPress);
  });

  it('Button onPress should not be called with custom parameters and enabled undefined', () => {
    const customEventConfig: EventHandlerCustomConfig = {
      actions: ['onPress'],
      componentName: 'place_order',
      data: {
        side: 'buy',
      },
    };
    const { result } = renderHook(() => useEventHandler('Button', 'onPress', customEventConfig), {
      wrapper: ({ children }) => (
        <EventHandlerProvider config={EVENT_DELEGATION_CONFIG}>{children}</EventHandlerProvider>
      ),
    });
    expect(result.current).not.toBe(EVENT_DELEGATION_CONFIG.Button.onPress);
  });

  it('Button onPress should not be called with custom parameters and enabled set to false', () => {
    const customEventConfig: EventHandlerCustomConfig = {
      actions: ['onPress'],
      enabled: false,
      componentName: 'place_order',
      data: {
        currency: 'BTC',
      },
    };
    const { result } = renderHook(() => useEventHandler('Button', 'onPress', customEventConfig), {
      wrapper: ({ children }) => (
        <EventHandlerProvider config={EVENT_DELEGATION_CONFIG}>{children}</EventHandlerProvider>
      ),
    });
    void act(() => result.current());
    expect(EVENT_DELEGATION_CONFIG.Button.onPress).not.toHaveBeenCalled();
  });

  it('Button onPress should be called with custom parameters', () => {
    const customEventConfig: EventHandlerCustomConfig = {
      actions: ['onPress'],
      enabled: true,
      componentName: 'place_order',
      data: {
        currency: 'BTC',
      },
    };

    const { result } = renderHook(() => useEventHandler('Button', 'onPress', customEventConfig), {
      wrapper: ({ children }) => (
        <EventHandlerProvider config={EVENT_DELEGATION_CONFIG}>{children}</EventHandlerProvider>
      ),
    });
    void act(() => result.current());
    expect(EVENT_DELEGATION_CONFIG.Button.onPress).toHaveBeenCalledWith({
      componentName: customEventConfig.componentName,
      data: customEventConfig.data,
    });
  });
});
