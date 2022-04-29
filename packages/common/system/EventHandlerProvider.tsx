import React, { createContext, useMemo } from 'react';

type RecursiveMapType<T> = T | Record<string, T>;

export type EventDataEntryTypes = string | number | boolean | null;
export type EventDataEntry = EventDataEntryTypes | EventDataEntryTypes[];

export type EventHandlerAction = 'onPress' | 'onChange' | 'onHover' | 'onBlur';
export type EventCustomData = Record<string, RecursiveMapType<EventDataEntry>>;

export type EventHandlerComponent = 'Button';

export type EventCallbackProps = {
  componentName: string;
  data?: EventCustomData;
};

export type EventHandlerCallback = (eventData?: EventCallbackProps) => void;
export type EventHandlerEntry = Partial<Record<EventHandlerAction, EventHandlerCallback>>;

export type EventHandlerConfig = Partial<Record<EventHandlerComponent, EventHandlerEntry>>;

// Event Custom Config
// {
//   actions: [],
//   component_name: 'trade',
//   custom_data: {
//     side: 'buy'
//   }
// }
export type EventHandlerCustomConfig = {
  actions: EventHandlerAction[];
  enabled?: boolean;
  componentName: string;
  data?: EventCustomData;
};

export const DEFAULT_EVENT_HANDLER_CONTEXT: EventHandlerConfig = {};

export const EventHandlerContext = createContext<EventHandlerConfig>(DEFAULT_EVENT_HANDLER_CONTEXT);

export type EventHandlerProviderProps = {
  config?: EventHandlerConfig;
};

export const EventHandlerProvider: React.FC<EventHandlerProviderProps> = ({ config, children }) => {
  const configuration = useMemo(() => config ?? DEFAULT_EVENT_HANDLER_CONTEXT, [config]);
  return (
    <EventHandlerContext.Provider value={configuration}>{children}</EventHandlerContext.Provider>
  );
};
