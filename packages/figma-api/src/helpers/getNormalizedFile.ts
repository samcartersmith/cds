import { getFileComponents } from '../getFileComponents';
import { getFileComponentSets } from '../getFileComponentSets';
import { getFileStyles } from '../getFileStyles';
import { FullStyleMetadata, SharedElement, Style } from '../types';

export type RequestType = 'components' | 'component_sets' | 'styles';

export type NormalizedFile = {
  /** Figma file id that response is for */
  id: string;
  items: Record<string, SharedElement | FullStyleMetadata>;
  styles: Record<string, Style>;
};

function arrayToIdMap<T extends SharedElement | FullStyleMetadata>(arr: readonly T[]) {
  const tuple = arr.map((item) => [item.node_id, item] as const);
  return Object.fromEntries(tuple);
}

export async function getNormalizedFile(
  fileId: string,
  requestType: RequestType,
): Promise<NormalizedFile> {
  if (requestType === 'component_sets') {
    const resp = await getFileComponentSets(fileId);
    return {
      id: fileId,
      styles: {},
      items: arrayToIdMap(resp.meta.component_sets),
    };
  }

  if (requestType === 'components') {
    const resp = await getFileComponents(fileId);
    return {
      id: fileId,
      styles: {},
      items: arrayToIdMap(resp.meta.components),
    };
  }

  if (requestType === 'styles') {
    const styles: Record<string, Style> = {};
    const resp = await getFileStyles(fileId);
    resp.meta.styles.forEach((style) => {
      styles[style.node_id] = { ...style, styleType: style.style_type, remote: true };
    });

    return {
      id: fileId,
      items: arrayToIdMap(resp.meta.styles),
      styles,
    };
  }

  throw new Error(
    `Request type of ${requestType} is not valid. Please add the desired request type to Sync class`,
  );
}
