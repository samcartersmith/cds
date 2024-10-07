export type FigmaSceneNodeType =
  | 'SLICE'
  | 'FRAME'
  | 'GROUP'
  | 'COMPONENT_SET'
  | 'COMPONENT'
  | 'INSTANCE'
  | 'BOOLEAN_OPERATION'
  | 'VECTOR'
  | 'STAR'
  | 'LINE'
  | 'ELLIPSE'
  | 'POLYGON'
  | 'RECTANGLE'
  | 'TEXT'
  | 'STICKY'
  | 'CONNECTOR'
  | 'SHAPE_WITH_TEXT'
  | 'CODE_BLOCK'
  | 'STAMP'
  | 'WIDGET'
  | 'EMBED'
  | 'LINK_UNFURL'
  | 'MEDIA'
  | 'SECTION'
  | 'HIGHLIGHT'
  | 'WASHI_TAPE'
  | 'TABLE';

export type FigmaNodeData = {
  id: string;
  type: FigmaSceneNodeType;
  name: string;
  text?: string;
  description?: string;
  componentName?: string | null;
  children?: FigmaNodeData[];
};
