import React, { createContext, useMemo } from 'react';

type RecursiveMapType<T> = T | Record<string, T>;

export type EventDataEntryTypes = string | number | boolean | null;
export type EventDataEntry = EventDataEntryTypes | EventDataEntryTypes[];

export type EventDelegationAction = 'onPress' | 'onChange' | 'onHover' | 'onBlur';
export type EventCustomData = Record<string, RecursiveMapType<EventDataEntry>>;

export type EventDelegationComponent = 'Button';

export type EventCallbackProps = {
  componentName: string;
  data?: EventCustomData;
};

export type EventDelegationCallback = (eventData?: EventCallbackProps) => void;
export type EventDelegationEntry = Partial<Record<EventDelegationAction, EventDelegationCallback>>;

export type EventDelegationConfig = Partial<Record<EventDelegationComponent, EventDelegationEntry>>;

// Event Custom Config
// {
//   actions: [],
//   component_name: 'trade',
//   custom_data: {
//     side: 'buy'
//   }
// }
export type EventCustomConfig = {
  actions: EventDelegationAction[];
  enabled?: boolean;
  componentName: string;
  data?: EventCustomData;
};

export const DEFAULT_EVENT_DELEGATION_CONTEXT: EventDelegationConfig = {};

export const EventDelegationContext = createContext<EventDelegationConfig>(
  DEFAULT_EVENT_DELEGATION_CONTEXT,
);

export type EventDelegationProviderProps = {
  config?: EventDelegationConfig;
};

export const EventDelegationProvider: React.FC<EventDelegationProviderProps> = ({
  config,
  children,
}) => {
  const configuration = useMemo(() => config ?? DEFAULT_EVENT_DELEGATION_CONTEXT, [config]);
  return (
    <EventDelegationContext.Provider value={configuration}>
      {children}
    </EventDelegationContext.Provider>
  );
};
