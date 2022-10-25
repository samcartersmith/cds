import '@figma/plugin-typings';

export type Density = 'normal' | 'dense';

export type FigmaMessage =
  | {
      type: 'create-dense-icons';
    }
  | {
      type: 'create-normal-icons';
    };
