import { useCallback, useContext } from 'react';

import {
  EventHandlerAction,
  EventHandlerComponent,
  EventHandlerConfig,
  EventHandlerContext,
  EventHandlerCustomConfig,
} from './EventHandlerProvider';

const noOp = () => {};

const EVENT_ENABLED_BY_DEFAULT = false;

export const useEventHandler = (
  component: EventHandlerComponent,
  action: EventHandlerAction,
  eventConfig?: EventHandlerCustomConfig,
): (() => void) => {
  const config = useContext<EventHandlerConfig>(EventHandlerContext);

  return useCallback(() => {
    // by default events are disabled
    const isEnabled = eventConfig?.enabled ?? EVENT_ENABLED_BY_DEFAULT;

    if (!isEnabled || !eventConfig) {
      return noOp();
    }

    // pass event and custom data
    const callback = config?.[component]?.[action] ?? noOp;
    return callback({
      componentName: eventConfig.componentName,
      data: eventConfig.data,
    });
  }, [action, component, config, eventConfig]);
};
