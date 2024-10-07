import { PostSubscriptionData, SubscriptionsToPlugin } from '../../shared/Subscriptions';

/**
 * Sends a message (via the postMessage API) to the child React application
 * The plugin does not expect nor wait for any reply to its message
 * @param subscriptionType - predefined message type
 * @param data
 */
export const broadcastToApp = <T extends SubscriptionsToPlugin['type']>(
  subscriptionType: T,
  data: (SubscriptionsToPlugin & { type: T })['data'],
) => {
  figma.ui.postMessage({
    // @ts-expect-error Union type inference is too strict
    subscription: {
      type: subscriptionType,
      data,
    },
  } satisfies PostSubscriptionData<SubscriptionsToPlugin>);
};
