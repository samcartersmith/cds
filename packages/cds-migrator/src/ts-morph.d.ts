// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as tsMorph from 'ts-morph';

declare module 'ts-morph' {
  declare namespace ts {
    export interface Node {
      propertyName?: {
        escapedText: string;
      };
    }
  }
}
