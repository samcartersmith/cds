import { fireEvent, render } from '@testing-library/react';
import {
  EventCustomConfig,
  EventDelegationProvider,
} from '@cbhq/cds-common/system/EventDelegationProvider';

import { Button } from '../Button';

describe('ButtonEventDelegation', () => {
  const EVENT_DELEGATION_CONFIG = {
    Button: {
      onPress: jest.fn(),
    },
  };

  let customEventConfig: EventCustomConfig = {
    actions: [],
    componentName: 'place_order',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('EventDelegationConfig `Button.onPress` should not be called because config is not provided to EventDelegationProvider', () => {
    const spy = jest.fn();

    const { container } = render(
      <EventDelegationProvider>
        <Button onPress={spy}>Child</Button>
      </EventDelegationProvider>,
    );

    fireEvent.click(container.querySelector('button') as Element);

    // callback should be called
    expect(spy).toHaveBeenCalled();
    expect(EVENT_DELEGATION_CONFIG.Button.onPress).not.toHaveBeenCalled();
  });

  it('EventDelegationConfig `Button.onPress` should not be called because eventConfig is not provided to `Button`', () => {
    const spy = jest.fn();

    const { container } = render(
      <EventDelegationProvider config={EVENT_DELEGATION_CONFIG}>
        <Button onPress={spy}>Child</Button>
      </EventDelegationProvider>,
    );

    fireEvent.click(container.querySelector('button') as Element);

    // callback should be called
    expect(spy).toHaveBeenCalled();
    expect(EVENT_DELEGATION_CONFIG.Button.onPress).not.toHaveBeenCalled();
  });

  it('EventDelegationConfig `Button.onPress` should not be called because eventConfig has enabled set to undefined', () => {
    const spy = jest.fn();

    customEventConfig = {
      actions: ['onPress'],
      componentName: 'place_order',
      data: { currency: 'BTC' },
    };

    const { container } = render(
      <EventDelegationProvider config={EVENT_DELEGATION_CONFIG}>
        <Button onPress={spy} eventConfig={customEventConfig}>
          Child
        </Button>
      </EventDelegationProvider>,
    );

    fireEvent.click(container.querySelector('button') as Element);

    // callback should be called
    expect(spy).toHaveBeenCalled();
    expect(EVENT_DELEGATION_CONFIG.Button.onPress).not.toHaveBeenCalled();
  });

  it('EventDelegationConfig `Button.onPress` should not be called because eventConfig has enabled set to false', () => {
    const spy = jest.fn();

    customEventConfig = {
      actions: ['onPress'],
      componentName: 'place_order',
      data: { currency: 'BTC' },
      enabled: false,
    };

    const { container } = render(
      <EventDelegationProvider config={EVENT_DELEGATION_CONFIG}>
        <Button onPress={spy} eventConfig={customEventConfig}>
          Child
        </Button>
      </EventDelegationProvider>,
    );

    fireEvent.click(container.querySelector('button') as Element);

    // callback should be called
    expect(spy).toHaveBeenCalled();
    expect(EVENT_DELEGATION_CONFIG.Button.onPress).not.toHaveBeenCalled();
  });

  it('EventDelegationConfig `Button.onPress` should be called', () => {
    customEventConfig = {
      actions: ['onPress'],
      componentName: 'place_order',
      data: { currency: 'BTC' },
      enabled: true,
    };

    const spy = jest.fn();

    const { container } = render(
      <EventDelegationProvider config={EVENT_DELEGATION_CONFIG}>
        <Button onPress={spy} eventConfig={customEventConfig}>
          child
        </Button>
      </EventDelegationProvider>,
    );

    fireEvent.click(container.querySelector('button') as Element);

    expect(spy).toHaveBeenCalled();
    expect(EVENT_DELEGATION_CONFIG.Button.onPress).toHaveBeenCalledWith({
      componentName: 'place_order',
      data: { currency: 'BTC' },
    });
  });
});
