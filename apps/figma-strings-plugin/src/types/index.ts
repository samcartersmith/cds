import '@figma/plugin-typings';

export type Spectrum = 'light' | 'dark';

export type FigmaContext = 'selection' | 'page';

export type FigmaMessage =
  | {
      type: 'populate-strings';
      strings?: Content[];
      locale: string;
      stringsMap?: Map<string, Content>;
    }
  | {
      type: 'toggle-display-mode';
      strings?: Content[];
      locale: string;
      displayMode: 'text' | 'key';
      stringsMap?: Map<string, Content>;
    };

export type LocalizedField = Record<string, string>;
export type Content = {
  key: LocalizedField;
  text: LocalizedField;
};
