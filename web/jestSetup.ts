import { TextDecoder } from 'text-encoding';

declare const global: {
  TextDecoder: typeof TextDecoder;
};

global.TextDecoder = TextDecoder;
