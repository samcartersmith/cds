import {
  isMessageData,
  type MessagesToPlugin,
  type PostMessageData,
  type ResponsesToApp,
} from '../../shared/Messages';

type Req<T> = {
  data: T;
  messageId: number;
};

type Res<T> = {
  send: (responseData: T) => void;
};

type ListenerCallback = (req: Req<any>, res: Res<any>) => void | Promise<void>;

/**
 * Creates a listener for `fetchFigma` calls coming from the React app front end,
 * allowing you to respond to specific message types.
 *
 * For convenience, the API is a very similar to ExpressJS. For example:
 * ```
 * const appListener = createAppListener()
 *
 * appListener.listen('start-session', async (req, res) => {
 *   console.log(req.data)
 *   res.send('Success!')
 * })
 * ```
 *
 * @returns an object containing a function, `listener`, that registers Express-style callbacks for handling incoming, typed messages from the child React app
 */
export const createAppListener = () => {
  const listeners: Record<string, ListenerCallback[]> = {};

  figma.ui.onmessage = async (messageData: PostMessageData<MessagesToPlugin>) => {
    if (!isMessageData(messageData))
      throw Error(`Invalid message data ${JSON.stringify(messageData)}`);
    const { messageId, message } = messageData;
    for (const callback of listeners[messageData.message.type]) {
      console.log(`[Figma]: Message received - ${messageData.message.type}`);
      await callback(
        { data: message.data, messageId },
        {
          send: (responseData: ResponsesToApp['data']) =>
            figma.ui.postMessage({
              messageId,
              message: {
                type: messageData.message.type,
                data: responseData,
              },
            } as PostMessageData<ResponsesToApp>),
        },
      );
    }
  };

  const listen = <T extends MessagesToPlugin['type']>(
    messageType: T,
    callback: (
      req: Req<(MessagesToPlugin & { type: T })['data']>,
      res: Res<(ResponsesToApp & { type: T })['data']>,
    ) => void,
  ) => {
    if (!listeners[messageType]) listeners[messageType] = [];
    // @ts-expect-error Union type inference is too strict
    listeners[messageType].push(callback);
  };

  return { listen };
};
