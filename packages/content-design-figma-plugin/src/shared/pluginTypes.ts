export type EvaluationMode = "full" | "cds" | "content" | "a11y";

export interface TextLayerPayload {
  id: string;
  name: string;
  characters: string;
  hasMissingFont: boolean;
}

export interface ScreenPayload {
  id: string;
  name: string;
  layers: TextLayerPayload[];
}

export interface MultiScreenSelection {
  screens: ScreenPayload[];
  activeLayerId: string;
  totalTextLayers: number;
}
