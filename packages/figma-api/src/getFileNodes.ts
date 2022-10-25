import { createClient } from './createClient';
import type { Component } from './getComponent';
import type { ComponentSet } from './getComponentSet';
import type { Style } from './getStyle';

export type GetFileNodesParams = {
  /** Comma separated list of nodes that you care about in the document.
   * If specified, only a subset of the document will be returned corresponding
   * to the nodes listed, their children, and everything between the root node
   * and the listed nodes
   */
  ids: string;
  /** A specific version ID to get. Omitting this will get the current version of the file */
  version?: string;
  /**
   * Positive integer representing how deep into the document tree to traverse.
   * For example, setting this to 1 returns only Pages, setting it to 2 returns Pages
   * and all top level objects on each page. Not setting this parameter returns all nodes
   */
  depth?: number;
  /** Set to "paths" to export vector data */
  geometry?: 'paths';
  /**
   * A comma separated list of plugin IDs and/or the string "shared".
   * Any data present in the document written by those plugins will be
   * included in the result in the `pluginData` and `sharedPluginData` properties.
   */
  plugin_data?: string;
  /**
   * Returns branch metadata for the requested file. If the file is a branch, the main
   * file's key will be included in the returned response. If the file has branches,
   * their metadata will be included in the returned response. Default: false.
   */
  branch_data?: boolean;
};

type Config = {
  componentName: string;
  componentSetName: string;
};

type SvgData = {
  path: string;
  /**
   * https://www.figma.com/plugin-docs/api/properties/VectorPath-windingrule/
   * https://oreillymedia.github.io/Using_SVG/extras/ch06-fill-rule.html
   *
   * Certain export formats (e.g. TrueType fonts, Android VectorDrawable) only support the 'NONZERO' fill rule.
   * Design can use, https://www.figma.com/community/plugin/771155994770327940/Fill-Rule-Editor,
   * to manually convert even-odd to non-zero to make the exporters for these formats work.
   */
  windingRule: 'NONZERO' | 'EVENODD' | 'NONE';
};

export type FileNode<T extends Config = Config> = {
  document: {
    id: string;
    name: T['componentSetName'];
    children: { id: T['componentName']; children: [{ fillGeometry: SvgData[] }] }[];
  };
  components: Record<string, Component<T['componentName']>>;
  componentSets: Record<string, ComponentSet<T['componentSetName']>>;
  styles: Record<string, Style>;
};

export type GetFileNodesResponse<T extends Config = Config> = {
  name: string;
  role: string;
  lastModified: string;
  editorType: string;
  thumbnailUrl: string;
  nodes: Record<string, FileNode<T>>;
};

/** https://www.figma.com/developers/api#get-file-nodes-endpoint */
export async function getFileNodes<T extends Config = Config>(
  fileKey: string,
  params: GetFileNodesParams,
) {
  const client = createClient<GetFileNodesParams, GetFileNodesResponse<T>>();
  return client(`files/${fileKey}/nodes`, params);
}
