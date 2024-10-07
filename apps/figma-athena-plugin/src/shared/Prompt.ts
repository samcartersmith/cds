export type Prompt = {
  id: string;
  name: string;
  chatSessionIds: string[];
  projectContext: string;
};

export type NewPrompt = {
  id: null;
  name: string;
  chatSessionIds: string[];
  projectContext: string;
};

export const isPrompt = (data: unknown): data is Prompt =>
  typeof data === 'object' &&
  data !== null &&
  'name' in data &&
  typeof data.name === 'string' &&
  'chatSessionIds' in data &&
  Array.isArray(data.chatSessionIds) &&
  'projectContext' in data &&
  typeof data.projectContext === 'string';
