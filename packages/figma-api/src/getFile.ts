import { createClient } from './createClient';
import type { Component } from './getComponent';
import type { ComponentSet } from './getComponentSet';
import type { Style } from './getStyle';

export type GetFileParams = {
  /** Comma separated list of nodes that you care about in the document.
   * If specified, only a subset of the document will be returned corresponding
   * to the nodes listed, their children, and everything between the root node
   * and the listed nodes
   */
  ids?: string;
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

type GetFileResponse = {
  name: string;
  role: string;
  lastModified: string;
  editorType: string;
  thumbnailUrl: string;
  version: string;
  document: {
    children: Node[];
  };
  components: Record<string, Component>;
  componentSets: Record<string, ComponentSet>;
  schemaVersion: 0;
  styles: Record<string, Style>;
  mainFileKey: string;
  branches: [
    {
      key: string;
      name: string;
      thumbnail_url: string;
      last_modified: string;
      link_access: string;
    },
  ];
};

const client = createClient<GetFileParams, GetFileResponse>();

/** https://www.figma.com/developers/api#get-files-endpoint */
export async function getFile(fileKey: string, params: GetFileParams) {
  return client(`file/${fileKey}`, params);
}
