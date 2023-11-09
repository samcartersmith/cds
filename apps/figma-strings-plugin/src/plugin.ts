/* eslint-disable no-param-reassign */
import type { Content, FigmaMessage } from './types';

figma.showUI(__html__, { width: 300, height: 300 });
// Skip over invisible nodes and their descendants inside instances
// for faster performance.
figma.skipInvisibleInstanceChildren = true;
figma.ui.postMessage({ type: 'current-user', user: figma.currentUser });

// get all text nodes in selection
function findByType(arr: readonly SceneNode[], type: NodeType) {
  let result: SceneNode[] = [];

  for (const item of arr) {
    if (item.type === type) {
      result.push(item);
    }

    if ('children' in item && Array.isArray(item.children)) {
      const filteredChildren = findByType(item.children as SceneNode[], type);
      result = result.concat(filteredChildren);
    }
  }

  return result;
}

// Create a Map for faster lookups
function createStringsMap(strings: FigmaMessage['strings']) {
  const map = new Map<string, Content>();
  strings?.forEach((string) => {
    map.set(string.key.en, string);
  });
  return map;
}

// Helper function to handle matched nodes
async function handleMatchedNodes(params: FigmaMessage, matchedNodes: TextNode[]) {
  const actionMap: Record<string, (node: TextNode, matchedData: Content) => void> = {
    'populate-strings': (node, matchedData) => {
      node.autoRename = false;
      const characters = matchedData.text[params.locale];
      if (characters) {
        node.characters = characters;
      }
    },
    'toggle-display-mode': (node, matchedData) => {
      node.autoRename = false;
      const characters =
        params.type === 'toggle-display-mode' && params.displayMode === 'text'
          ? matchedData.text[params.locale]
          : matchedData.key.en;
      if (characters) {
        node.characters = characters;
      }
    },
  };

  matchedNodes.forEach((node) => {
    const matchedData = params.stringsMap?.get(node.name);
    if (matchedData) {
      actionMap[params.type](node, matchedData);
    }
  });
}

export async function handleMessage(params: FigmaMessage) {
  const textNodes = (
    figma.currentPage.selection.length
      ? findByType(figma.currentPage.selection, 'TEXT')
      : figma.currentPage.findAllWithCriteria({
          types: ['TEXT'],
        })
  ) as TextNode[];

  const fonts = new Set(
    textNodes.flatMap((node) => {
      // use default font for node with less than 1 character
      if (node.characters.length <= 1) return { family: 'Coinbase Sans', style: 'Regular' };

      return node.getRangeAllFontNames(0, node.characters.length);
    }),
  );

  // required to load fonts before changing text
  // https://www.figma.com/plugin-docs/working-with-text/#loading-fonts
  await Promise.all([...fonts].map(figma.loadFontAsync));

  // Create a lookup map for params.strings
  params.stringsMap = createStringsMap(params.strings || []);

  // Filter out the nodes that match the strings
  const matchedNodes = textNodes.filter((node) => params.stringsMap?.has(node.name));

  // Handle the matched nodes based on the type
  await handleMatchedNodes(params, matchedNodes);
}

figma.ui.on('message', handleMessage);
