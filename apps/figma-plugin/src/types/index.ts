import '@figma/plugin-typings';

export type Spectrum = 'light' | 'dark';

export type FigmaContext = 'selection' | 'page';

export type FigmaMessage =
  | {
      type: 'toggle-light-styles';
      context: FigmaContext;
    }
  | {
      type: 'toggle-dark-styles';
      context: FigmaContext;
    };
