import {
  isSubscriptionData,
  type PostSubscriptionData,
  type SubscriptionsToPlugin,
} from '../shared/Subscriptions';

import type { FigmaMessageEvent } from './fetchFigma';

type CleanupFunction = () => void;

/**
 * Subscribes to window messages events from the parent Figma plugin window
 * @param subscriptionType the type of message to subscribe to - these are predefined in Typescript type definitions
 * @param callback
 */
export const subscribeFigma = <T extends SubscriptionsToPlugin['type']>(
  subscriptionType: T,
  callback: (data: (SubscriptionsToPlugin & { type: T })['data']) => void,
): CleanupFunction => {
  const listener = (event: FigmaMessageEvent<PostSubscriptionData<SubscriptionsToPlugin>>) => {
    const data = event.data.pluginMessage;
    if (!isSubscriptionData(data)) return;
    const { subscription } = data;
    if (subscriptionType !== subscription.type) return;
    // @ts-expect-error Union type inference is too strict
    callback(subscription.data);
  };
  window.addEventListener('message', listener);
  return () => window.removeEventListener('message', listener);
};
