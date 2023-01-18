/* eslint-disable no-param-reassign */

import illustrationDarkMap from '@cbhq/figma-styles/__generated__/illustration/dark/colorStyleMap';
import illustrationLightMap from '@cbhq/figma-styles/__generated__/illustration/light/colorStyleMap';
import uiDarkMap from '@cbhq/figma-styles/__generated__/ui/dark/colorStyleMap';
import uiLightMap from '@cbhq/figma-styles/__generated__/ui/light/colorStyleMap';

import type { FigmaContext, FigmaMessage, Spectrum } from './types';

figma.showUI(__html__);
figma.skipInvisibleInstanceChildren = true;

type StyleType = 'fill' | 'stroke' | 'effect';

type ColorStyleMap = {
  key: string;
  name: string;
  prefix: string;
};

function getUniqueName(item: ColorStyleMap) {
  return `${item.prefix}-${item.name}`;
}

function getKeyToNameMap(colorStyleMap: Record<string, ColorStyleMap>) {
  return Object.fromEntries(
    Object.values(colorStyleMap).map((item) => [item.key, getUniqueName(item)]),
  );
}

function getNameToKeyMap(colorStyleMap: Record<string, ColorStyleMap>) {
  return Object.fromEntries(
    Object.values(colorStyleMap).map((item) => [getUniqueName(item), item.key]),
  );
}

const lightKeyToNameMap: Record<string, string> = {
  ...getKeyToNameMap(illustrationLightMap),
  ...getKeyToNameMap(uiLightMap),
};

const lightNameToKeyMap = {
  ...getNameToKeyMap(illustrationLightMap),
  ...getNameToKeyMap(uiLightMap),
};

const darkKeyToNameMap: Record<string, string> = {
  ...getKeyToNameMap(illustrationDarkMap),
  ...getKeyToNameMap(uiDarkMap),
};

const darkNameToKeyMap = {
  ...getNameToKeyMap(illustrationDarkMap),
  ...getNameToKeyMap(uiDarkMap),
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
  let currentKey: string | undefined;
  const sourceKeyMap = convertTo === 'dark' ? lightKeyToNameMap : darkKeyToNameMap;
  const targetNameMap = convertTo === 'dark' ? darkNameToKeyMap : lightNameToKeyMap;

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

  if (currentKey && currentKey in sourceKeyMap) {
    const sourceName = sourceKeyMap[currentKey];
    const targetKey = targetNameMap[sourceName];
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
