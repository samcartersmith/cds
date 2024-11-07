import type { FigmaNodeData } from './FigmaNodeData';
import type { MessageData, MessagesToPlugin } from './Messages';

export type Subscription<
  SubscriptionType extends string,
  SubscriptionPayload extends MessageData,
> = SubscriptionType extends MessagesToPlugin['type']
  ? never
  : {
      type: SubscriptionType;
      data: SubscriptionPayload;
    };

export type PostSubscriptionData<S extends Subscription<any, any>> = {
  subscription: S;
};

export const isSubscriptionData = (data: unknown): data is PostSubscriptionData<any> =>
  typeof data === 'object' && data !== null && 'subscription' in data;

export type SubscriptionsToPlugin =
  | Subscription<'selection-change-start', undefined>
  | Subscription<'selection-change-end', FigmaNodeData[]>;
