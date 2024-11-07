import { useCallback, useContext } from 'react';

import {
  EventHandlerAction,
  EventHandlerComponent,
  EventHandlerConfig,
  EventHandlerContext,
  EventHandlerCustomConfig,
} from './EventHandlerProvider';

const noOp = () => {};

export const useEventHandler = (
  component: EventHandlerComponent,
  action: EventHandlerAction,
  eventConfig?: EventHandlerCustomConfig,
): (() => void) => {
  const config = useContext<EventHandlerConfig>(EventHandlerContext);

  return useCallback(() => {
    if (!config.handlers || !eventConfig?.actions.length) {
      return noOp();
    }

    const handler = config?.handlers[component];

    if (!handler) {
      return noOp();
    }

    const { actionMapping } = config;

    /**
     * Handler can provide an actionMapping object that maps
     * CDS events (onPress, onHover) to its event names.
     * If actionMapping is provided we convert CDS action into the handler one
     * if the mapping between the two values exists
     */
    const convertedAction = actionMapping?.[action] ?? action;

    /**
     * the component event config provides a list of actions to track.
     * If the current action is not listed we return a noOp
     */
    if (!eventConfig.actions.includes(convertedAction)) {
      return noOp();
    }

    // pass event and custom data
    const callback = handler[convertedAction] ?? noOp;
    return callback({
      componentName: eventConfig.componentName,
      data: eventConfig.data,
    });
  }, [action, component, config, eventConfig]);
};
