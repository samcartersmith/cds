import { act, renderHook } from '@testing-library/react-hooks';

import {
  EventHandlerConfig,
  EventHandlerCustomConfig,
  EventHandlerProvider,
} from '../EventHandlerProvider';
import { useEventHandler } from '../useEventHandler';

const EVENT_HANDLER_CONFIG: EventHandlerConfig = {
  handlers: {
    Button: {
      onPress: jest.fn(),
    },
  },
};

const CUSTOM_EVENT_HANDLER_WITH_MAPPING: EventHandlerConfig = {
  actionMapping: { onPress: 'click' },
  handlers: {
    Button: {
      click: jest.fn(),
    },
  },
};

const CUSTOM_HANDLER_CONFIG: EventHandlerConfig = {
  handlers: {
    Button: {
      onPress: jest.fn(),
    },
  },
};

describe('EventDelegationProvider', () => {
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
        <EventHandlerProvider config={EVENT_HANDLER_CONFIG}>{children}</EventHandlerProvider>
      ),
    });
    expect(result.current).not.toBe(EVENT_HANDLER_CONFIG.handlers?.Button.onPress);
  });

  it('Button onPress should be called because onPress is listed in custom event config actions', () => {
    const customEventConfig: EventHandlerCustomConfig = {
      actions: ['onPress'],
      componentName: 'place_order',
      data: {
        currency: 'BTC',
      },
    };
    const { result } = renderHook(() => useEventHandler('Button', 'onPress', customEventConfig), {
      wrapper: ({ children }) => (
        <EventHandlerProvider config={EVENT_HANDLER_CONFIG}>{children}</EventHandlerProvider>
      ),
    });
    void act(() => result.current());
    expect(EVENT_HANDLER_CONFIG.handlers?.Button.onPress).toHaveBeenCalled();
  });

  it('Button onPress should not be called because onPress is not listed in custom event config actions', () => {
    const customEventConfig: EventHandlerCustomConfig = {
      actions: ['onHover'],
      componentName: 'place_order',
      data: {
        currency: 'BTC',
      },
    };
    const { result } = renderHook(() => useEventHandler('Button', 'onPress', customEventConfig), {
      wrapper: ({ children }) => (
        <EventHandlerProvider config={EVENT_HANDLER_CONFIG}>{children}</EventHandlerProvider>
      ),
    });
    void act(() => result.current());
    expect(EVENT_HANDLER_CONFIG.handlers?.Button.onPress).not.toHaveBeenCalled();
  });

  it('Button click action should be called because of actionMapping entry', () => {
    const customEventConfig: EventHandlerCustomConfig = {
      actions: ['click'],
      componentName: 'place_order',
      data: {
        currency: 'BTC',
      },
    };

    const { result } = renderHook(() => useEventHandler('Button', 'onPress', customEventConfig), {
      wrapper: ({ children }) => (
        <EventHandlerProvider config={CUSTOM_EVENT_HANDLER_WITH_MAPPING}>
          {children}
        </EventHandlerProvider>
      ),
    });

    void act(() => result.current());

    expect(CUSTOM_EVENT_HANDLER_WITH_MAPPING.handlers?.Button.click).toHaveBeenCalledWith({
      componentName: customEventConfig.componentName,
      data: customEventConfig.data,
    });
  });

  it('Button onPress should not be called because it is not defined in custom event config actions list', () => {
    const customEventConfig: EventHandlerCustomConfig = {
      actions: ['hover'],
      componentName: 'place_order',
      data: {
        currency: 'BTC',
      },
    };

    const { result } = renderHook(() => useEventHandler('Button', 'onPress', customEventConfig), {
      wrapper: ({ children }) => (
        <EventHandlerProvider config={CUSTOM_HANDLER_CONFIG}>{children}</EventHandlerProvider>
      ),
    });
    void act(() => result.current());
    expect(CUSTOM_HANDLER_CONFIG.handlers?.Button.onPress).not.toHaveBeenCalled();
  });
});
