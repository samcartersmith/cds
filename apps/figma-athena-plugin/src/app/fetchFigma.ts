import {
  isMessageData,
  type MessagesToPlugin,
  type PostMessageData,
  type ResponsesToApp,
} from '../shared/Messages';

const messages: Record<
  number,
  { resolve: (value: any) => void; reject: (reason?: unknown) => void }
> = {};

let messageId = 0;

/**
 * Sends a message from the React app to the Figma plugin backend
 * @param messageType the type of message that is being sent. These types are predefined in type definitions
 * @param data the data associated with the messageType
 */
export const fetchFigma = async <T extends MessagesToPlugin['type']>(
  messageType: T,
  data: (MessagesToPlugin & { type: T })['data'],
): Promise<(ResponsesToApp & { type: T })['data']> => {
  return new Promise((resolve, reject) => {
    messageId++;
    messages[messageId] = { resolve, reject };
    parent.postMessage(
      {
        pluginMessage: {
          messageId,
          // @ts-expect-error Union type inference is too strict
          message: { type: messageType, data },
        } satisfies PostMessageData<MessagesToPlugin>,
      },
      '*',
    );
  });
};

export type FigmaMessageEvent<T> = MessageEvent<{ pluginMessage: T }>;

/**
 * An event handle that listens to responses to the postMessage calls initiated by the fetchFigma function
 * @param event
 */
window.onmessage = (event: FigmaMessageEvent<PostMessageData<ResponsesToApp>>) => {
  const data = event.data.pluginMessage;
  if (!isMessageData(data)) return;
  const { messageId, message } = data;
  if (!(messageId in messages)) throw Error(`Invalid message id ${messageId}`);
  const { resolve, reject } = messages[messageId];
  if (message.data instanceof Error) reject(message);
  else resolve(message.data);
  delete messages[messageId];
};
