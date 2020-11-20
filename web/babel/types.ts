// Copied from linaria https://github.com/callstack/linaria/blob/47c8157bb2621fcb9e9a43127a3e1e5151d1e38d/src/types.ts
import type { RawSourceMap, Position } from 'source-map';

export type Replacement = {
  original: { start: Position; end: Position };
  length: number;
};

export type Rules = {
  [className: string]: {
    cssText: string;
    displayName: string;
    start: Position;
  };
};

export type Result = {
  code: string;
  sourceMap?: RawSourceMap | null;
  cssText?: string;
  cssSourceMapText?: string;
  dependencies?: string[];
  rules?: Rules;
  replacements?: Replacement[];
};

export type LinariaMetadata = {
  rules: Rules;
  replacements: Replacement[];
  dependencies: string[];
};
