// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as tsMorph from 'ts-morph';

declare module 'ts-morph' {
  declare namespace ts {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    export interface Node {
      propertyName?: {
        escapedText: string;
      };
    }
  }
}
