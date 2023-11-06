import '@figma/plugin-typings';

export type Spectrum = 'light' | 'dark';

export type FigmaContext = 'selection' | 'page';

export type FigmaMessage =
  | {
      type: 'populate-strings';
      strings?: Content[];
      locale: Locale;
      stringsMap?: Map<string, Content>;
    }
  | {
      type: 'toggle-display-mode';
      strings?: Content[];
      locale: Locale;
      displayMode: 'text' | 'key';
      stringsMap?: Map<string, Content>;
    };

export type Locale = 'en' | 'zh-CN';
export type LocalizedField = Record<Locale, string>;
export type Content = {
  key: LocalizedField;
  text: LocalizedField;
};
