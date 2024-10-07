import type { CbGptCredentials } from '../../shared/Messages';
import type { Prompt } from '../../shared/Prompt';

export type State = {
  prompts: Prompt[];
  cbGptCredentials: null | CbGptCredentials;
};

type SetStateCallback = (currentState: State) => State;

const defaultState: State = {
  prompts: [],
  cbGptCredentials: null,
};

export const store = {
  async getState(): Promise<State> {
    const state = (await figma.clientStorage.getAsync('state')) as State;
    return state ?? defaultState;
  },
  async setState(value: State | SetStateCallback) {
    if (typeof value !== 'function') {
      await figma.clientStorage.setAsync('state', value);
    } else {
      const currentState = await store.getState();
      const nextState = value(currentState);
      await figma.clientStorage.setAsync('state', nextState);
    }
  },
};
