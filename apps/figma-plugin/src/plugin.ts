/* eslint-disable no-param-reassign */

import { colorStyles } from './data/colorStyles';
import { effectStyles } from './data/effectStyles';
import type { FigmaContext, FigmaMessage, Spectrum } from './types';

figma.showUI(__html__);
figma.skipInvisibleInstanceChildren = true;

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

const types = {
  fill: colorStyles,
  stroke: colorStyles,
  effect: effectStyles,
};

type StyleType = keyof typeof types;

async function swapStyles({
  type,
  convertTo,
  node,
}: {
  type: StyleType;
  convertTo: Spectrum;
  node: BaseNode;
}) {
  const styles = types[type];
  type StyleKey = keyof typeof styles;

  let currentKey: StyleKey | undefined;

  const isFill = type === 'fill' && 'fillStyleId' in node;
  const isStroke = type === 'stroke' && 'strokeStyleId' in node;
  const isEffect = type === 'effect' && 'effectStyleId' in node;

  if (isFill) {
    currentKey = idToKey<keyof typeof styles>(node.fillStyleId);
  } else if (isStroke) {
    currentKey = idToKey<keyof typeof styles>(node.strokeStyleId);
  } else if (isEffect) {
    currentKey = idToKey<keyof typeof styles>(node.effectStyleId);
  }

  if (currentKey && currentKey in styles) {
    const convertedKey = styles[currentKey][convertTo];
    if (convertedKey) {
      const { id } = await figma.importStyleByKeyAsync(convertedKey);
      if (isFill) {
        node.fillStyleId = id;
      } else if (isStroke) {
        node.strokeStyleId = id;
      } else if (isEffect) {
        node.effectStyleId = id;
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
