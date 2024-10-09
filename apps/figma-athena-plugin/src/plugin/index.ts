// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="../../node_modules/@figma/plugin-typings" />
import type { FigmaNodeData } from '../shared/FigmaNodeData';

import { broadcastToApp } from './util/broadcastToApp';
import { store } from './util/clientStorage';
import { createAppListener } from './util/createAppListener';
import { createRandom } from './util/createRandomId';
import { FigmaNodesSingleton } from './util/FigmaNodesSingleton';

// boots up the figma plugin's UI (i.e. React) akin to React.createRoot() in a normal DOM
figma.showUI(__html__, {
  title: 'Athena',
  width: 380,
  height: 600,
  themeColors: true,
});

let figmaSelection: readonly SceneNode[] = [];

/** Converts an array of SceneNodes to serializable metadata. */
const getNodeData = async (node: SceneNode): Promise<FigmaNodeData> => {
  const id = FigmaNodesSingleton.getInstance().addNodeReference(node);
  const data: FigmaNodeData = { id, type: node.type, name: node.name };
  // if (!/^(Frame \d*)$/gm.test(node.name)) data.name = node.name;
  if ('characters' in node) data.text = node.characters;
  if ('children' in node) data.children = await Promise.all(node.children.map(getNodeData));
  if ('description' in node) data.description = node.description;
  if (node.type === 'INSTANCE') {
    const component = await node.getMainComponentAsync();
    if (!component) console.log('Could not get main component for instance', node);
    data.componentName = component?.name ?? null;
  }
  return data;
};

/**
 * Figma event handler - Informs the React app when the selected Figma node(s) change.
 */
figma.on('selectionchange', async () => {
  // resets selected node(s) state when selection has changed
  FigmaNodesSingleton.getInstance().resetReferences();
  figmaSelection = figma.currentPage.selection;
  broadcastToApp('selection-change-start', undefined);
  const data = await Promise.all(figmaSelection.map(getNodeData));
  broadcastToApp('selection-change-end', data);
});

const appListener = createAppListener();

/** Responds to the React app's request for the list of the users prompts. */
appListener.listen('get-prompts', async (req, res) => {
  const { prompts } = await store.getState();
  res.send(prompts);
});

/** Responds to the React app's request to update a specific prompt, or create a new one. */
appListener.listen('update-prompt', async (req, res) => {
  const isNewPrompt = req.data.id === null;
  const prompt = { ...req.data, id: req.data.id ?? createRandom() };
  // Creates a new prompt if the prompt.id is null, otherwise updates an existing prompt
  await store.setState((s) => ({
    ...s,
    prompts: isNewPrompt
      ? [...s.prompts, prompt]
      : s.prompts.map((p) => (p.id === prompt.id ? prompt : p)),
  }));
  res.send(prompt);
});

appListener.listen('set-credentials', async (req, res) => {
  const { apiKey, secret } = req.data;
  await store.setState((s) => ({
    ...s,
    cbGptCredentials: {
      apiKey,
      secret,
    },
  }));

  res.send(undefined);
});

appListener.listen('check-credentials', async (req, res) => {
  const state = await store.getState();

  res.send(state.cbGptCredentials);
});

/** Responds to the React app's request to delete a specific prompt. */
appListener.listen('delete-prompt', async (req, res) => {
  const promptId = req.data;
  await store.setState((s) => ({
    ...s,
    prompts: s.prompts.filter((p) => p.id !== promptId),
  }));
  res.send(undefined);
});

/**
 * Responds to the React app's request to generate message descriptors for the current
 * selection. Receives the relevant FigmaNodeData and checked node ids, and passes it
 * on to the NodeJS server with the relevant app context.
 */
appListener.listen('generate-descriptors', async (req, res) => {
  try {
    const response = await fetch('http://localhost:3000/start-session');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await response.json();
    console.log('result ===', json);
  } catch (error) {
    console.log('Fetch error === ', error);
  }
  res.send('yay');
});

/**
 * Responds to the React app's request to highlight a specific Figma node by its reference id.
 * TODO: In dev mode, Figma does not allow modifying the canvas which apparently highlighting does.
 * The only way for this to possibly work is to have the plugin run in normal/design mode.
 * */
appListener.listen('highlight-node', async (req, res) => {
  try {
    const node = FigmaNodesSingleton.getInstance().getNodeReference(req.data);
    if (!node) return;
    const highlight = figma.createRectangle();
    highlight.resize(node.width, node.height);
    highlight.x = node.x;
    highlight.y = node.y;
    // highlight.strokeColor = { r: 1, g: 0, b: 0 }; // Red border
    highlight.effects = [
      {
        type: 'DROP_SHADOW',
        color: { r: 1, g: 0, b: 0, a: 1 },
        offset: { x: 0, y: 0 },
        radius: 10,
        spread: 5,
        visible: true,
        blendMode: 'NORMAL',
        boundVariables: {},
      },
    ];
    highlight.strokeWeight = 4;
    highlight.strokeAlign = 'INSIDE';
    highlight.opacity = 0.5;
    highlight.name = 'Temporary Highlight';
    figma.currentPage.appendChild(highlight);
    setTimeout(() => highlight.remove(), 3000);
  } catch (error) {
    console.log('Highlight error === ', error);
  }
  res.send(undefined);
});
