import { useCallback, useContext } from 'react';

import {
  EventCustomConfig,
  EventDelegationAction,
  EventDelegationComponent,
  EventDelegationConfig,
  EventDelegationContext,
} from './EventDelegationProvider';

const noOp = () => {};

const EVENT_ENABLED_BY_DEFAULT = false;

export const useEventDelegation = (
  component: EventDelegationComponent,
  action: EventDelegationAction,
  eventConfig?: EventCustomConfig,
): (() => void) => {
  const config = useContext<EventDelegationConfig>(EventDelegationContext);

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
