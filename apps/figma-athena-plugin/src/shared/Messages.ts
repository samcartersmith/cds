import type { NewPrompt, Prompt } from './Prompt';

export type MessageData =
  | string
  | number
  | boolean
  | null
  | undefined
  | Set<any>
  | Map<any, any>
  | Uint8Array
  | Date
  | RegExp
  | Error
  | MessageData[]
  | { [key: string]: MessageData };

export type Message<MessageType extends string, MessagePayload extends MessageData> = {
  type: MessageType;
  data: MessagePayload;
};

export type PostMessageData<M extends Message<any, any>> = {
  messageId: number;
  message: M;
};

export type CbGptCredentials = {
  apiKey: string;
  secret: string;
};

export const isMessageData = (data: unknown): data is PostMessageData<any> =>
  typeof data === 'object' && data !== null && 'messageId' in data && 'message' in data;

export type MessagesToPlugin =
  | Message<'get-prompts', undefined>
  | Message<'update-prompt', Prompt | NewPrompt>
  | Message<'delete-prompt', string>
  | Message<'highlight-node', string>
  | Message<'set-credentials', CbGptCredentials>
  | Message<'check-credentials', undefined>;

export type ResponsesToApp =
  | Message<'get-prompts', Prompt[]>
  | Message<'update-prompt', Prompt>
  | Message<'delete-prompt', undefined>
  | Message<'highlight-node', undefined>
  | Message<'set-credentials', undefined>
  | Message<'check-credentials', CbGptCredentials | null>;
