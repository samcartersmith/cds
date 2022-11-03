/* eslint-disable no-param-reassign */

import {
  darkKeyMap as darkIlloKeyMap,
  lightKeyMap as lightIlloKeyMap,
} from '@cbhq/figma-styles/__generated__/illustration-styles';
import {
  darkKeyMap as darkUiKeyMap,
  lightKeyMap as lightUiKeyMap,
} from '@cbhq/figma-styles/__generated__/ui-styles';

import type { FigmaContext, FigmaMessage, Spectrum } from './types';

figma.showUI(__html__);
figma.skipInvisibleInstanceChildren = true;

type StyleType = 'fill' | 'stroke' | 'effect';
type StyleKey = keyof typeof lightKeyMap | keyof typeof darkKeyMap;

const lightKeyMap: Record<string, string> = {
  ...lightIlloKeyMap,
  ...lightUiKeyMap,
};

const darkKeyMap: Record<string, string> = {
  ...darkIlloKeyMap,
  ...darkUiKeyMap,
};

const cache = new Map<string, string>();

/**
 * Figma adds some weird prefix and suffix to id's depending on where they are accessed from.
 * A node's key is the one thing that is constant, so stripping away any extras here will return that key,
 * which we can then lookup id's using importStyleByKeyAsync.
 * @param id
 * @returns key
 */
function idToKey<T extends string>(id: PropertyKey) {
  return String(id).replace('S:', '').replace(/,.*/, '') as T;
}

async function swapStyles({
  type,
  convertTo,
  node,
}: {
  type: StyleType;
  convertTo: Spectrum;
  node: BaseNode;
}) {
  let currentKey: StyleKey | undefined;
  const lookupKeyMap = convertTo === 'dark' ? lightKeyMap : darkKeyMap;

  const isFill = type === 'fill' && 'fillStyleId' in node;
  const isStroke = type === 'stroke' && 'strokeStyleId' in node;
  const isEffect = type === 'effect' && 'effectStyleId' in node;

  if (isFill) {
    currentKey = idToKey(node.fillStyleId);
  } else if (isStroke) {
    currentKey = idToKey(node.strokeStyleId);
  } else if (isEffect) {
    currentKey = idToKey(node.effectStyleId);
  }

  if (currentKey && currentKey in lookupKeyMap) {
    const targetKey = lookupKeyMap[currentKey];
    let targetId = cache.get(targetKey);

    if (!targetId) {
      try {
        const data = await figma.importStyleByKeyAsync(targetKey);
        if (data) {
          targetId = data.id;
          cache.set(targetKey, targetId);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (targetId) {
      if (isFill) {
        node.fillStyleId = targetId;
      } else if (isStroke) {
        node.strokeStyleId = targetId;
      } else if (isEffect) {
        node.effectStyleId = targetId;
      }
    }
  }
}

async function applyTheme({ node, convertTo }: { node: BaseNode; convertTo: Spectrum }) {
  if ('children' in node) {
    await Promise.all(node.children.map(async (child) => applyTheme({ node: child, convertTo })));
  }
  await Promise.all([
    swapStyles({ type: 'fill', node, convertTo }),
    swapStyles({ type: 'stroke', node, convertTo }),
    swapStyles({ type: 'effect', node, convertTo }),
  ]);
}

export async function toggleColorMode({
  spectrum,
  context,
}: {
  spectrum: Spectrum;
  context: FigmaContext;
}) {
  const nodes = context === 'page' ? figma.currentPage.children : figma.currentPage.selection;
  await Promise.all(nodes.map(async (node) => applyTheme({ node, convertTo: spectrum })));
}

function handleMessage({ type, context }: FigmaMessage) {
  if (type === 'toggle-light-styles') {
    void toggleColorMode({ spectrum: 'light', context });
  }

  if (type === 'toggle-dark-styles') {
    void toggleColorMode({ spectrum: 'dark', context });
  }
}

figma.ui.on('message', handleMessage);
