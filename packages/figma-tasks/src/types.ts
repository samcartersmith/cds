import { Node, NodeStyles } from '@cbhq/figma-api';

export type NodeShape = { document: Node; styles?: NodeStyles };

export type ExecutorName = 'sync-icons' | 'sync-illustrations' | 'sync-styles';
