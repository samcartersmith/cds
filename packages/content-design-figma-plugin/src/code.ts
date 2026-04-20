/// <reference types="@figma/plugin-typings" />
import type { EvaluationMode, MultiScreenSelection, ScreenPayload, TextLayerPayload } from "./shared/pluginTypes";

// ─── Plugin window ───────────────────────────────────────────────────────────

figma.showUI(__html__, {
  width: 360,
  height: 540,
  title: "CDS Design Quality Evaluator",
  themeColors: true,
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SCREEN_ROOT_TYPES: SceneNode["type"][] = [
  "FRAME",
  "SECTION",
  "COMPONENT",
  "COMPONENT_SET",
  "INSTANCE",
  "GROUP",
];

function isScreenRoot(node: SceneNode): boolean {
  return SCREEN_ROOT_TYPES.includes(node.type);
}

/** True if this node and every SceneNode ancestor up to the page are visible in the canvas. */
function isSceneNodeVisible(node: SceneNode): boolean {
  let current: BaseNode | null = node;
  while (current) {
    if (current.type === "PAGE" || current.type === "DOCUMENT") break;
    if ("visible" in current && !(current as SceneNode).visible) {
      return false;
    }
    current = current.parent;
  }
  return true;
}

function collectTextNodes(node: SceneNode): TextNode[] {
  const out: TextNode[] = [];
  if (node.type === "TEXT") {
    const t = node as TextNode;
    if (isSceneNodeVisible(t)) {
      out.push(t);
    }
  }
  if ("children" in node && node.children) {
    for (const child of node.children) {
      out.push(...collectTextNodes(child));
    }
  }
  return out;
}

function textLayerPayload(node: TextNode): TextLayerPayload {
  return {
    id: node.id,
    name: node.name,
    characters: node.characters,
    hasMissingFont: node.hasMissingFont,
  };
}

function buildScreenFromNode(node: SceneNode, textNodes: TextNode[]): ScreenPayload | null {
  if (textNodes.length === 0) return null;
  return {
    id: node.id,
    name: node.name || "Screen",
    layers: textNodes.map(textLayerPayload),
  };
}

function buildMultiScreenSelection(): MultiScreenSelection | null {
  const sel = figma.currentPage.selection;
  if (sel.length === 0) return null;

  const screens: ScreenPayload[] = [];

  for (const node of sel) {
    const scene = node as SceneNode;

    if (scene.type === "TEXT") {
      const t = scene as TextNode;
      if (isSceneNodeVisible(t)) {
        screens.push({
          id: t.id,
          name: t.name || "Text",
          layers: [textLayerPayload(t)],
        });
      }
      continue;
    }

    if (isScreenRoot(scene)) {
      const texts = collectTextNodes(scene);
      const screen = buildScreenFromNode(scene, texts);
      if (screen) screens.push(screen);
    }
  }

  if (screens.length === 0) return null;

  let total = 0;
  for (const s of screens) total += s.layers.length;

  const firstLayerId = screens[0]?.layers[0]?.id ?? "";

  return {
    screens,
    activeLayerId: firstLayerId,
    totalTextLayers: total,
  };
}

const STORAGE_KEY = "llm_gateway_key";
const EVALUATION_MODE_KEY = "figma_plugin_evaluation_mode";
const CHAT_HISTORY_KEY = "figma_plugin_chat_history_v1";
const MAX_SAVED_CHATS = 5;

async function loadApiKey(): Promise<string | null> {
  try {
    const key = await figma.clientStorage.getAsync(STORAGE_KEY);
    return typeof key === "string" && key.length > 0 ? key : null;
  } catch {
    return null;
  }
}

async function loadEvaluationMode(): Promise<EvaluationMode | null> {
  try {
    const v = await figma.clientStorage.getAsync(EVALUATION_MODE_KEY);
    if (v === "full" || v === "cds" || v === "content" || v === "a11y") return v;
    return null;
  } catch {
    return null;
  }
}

async function loadChatHistory(): Promise<unknown[]> {
  try {
    const raw = await figma.clientStorage.getAsync(CHAT_HISTORY_KEY);
    if (typeof raw !== "string") return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, MAX_SAVED_CHATS);
  } catch {
    return [];
  }
}

// ─── Selection change listener ───────────────────────────────────────────────

figma.on("selectionchange", () => {
  const selection = buildMultiScreenSelection();
  figma.ui.postMessage({
    type: "SELECTION_CHANGED",
    selection,
  });
});

// ─── Message handler (UI → plugin) ───────────────────────────────────────────

figma.ui.onmessage = async (msg: Record<string, unknown>) => {
  switch (msg.type) {
    case "UI_READY": {
      const apiKey = await loadApiKey();
      const evaluationMode = await loadEvaluationMode();
      const selection = buildMultiScreenSelection();
      const chatHistory = await loadChatHistory();
      const fileName = figma.root?.name || "Current file";
      figma.ui.postMessage({
        type: "INIT",
        apiKey,
        evaluationMode,
        selection,
        chatHistory,
        fileName,
      });
      break;
    }

    case "FOCUS_NODE": {
      const { nodeId } = msg as { nodeId: string };
      const node = figma.getNodeById(nodeId);
      if (!node || node.type === "PAGE" || node.type === "DOCUMENT") {
        figma.ui.postMessage({ type: "FOCUS_NODE_ABORTED" });
        break;
      }
      const scene = node as SceneNode;
      figma.currentPage.selection = [scene];
      figma.viewport.scrollAndZoomIntoView([scene]);
      break;
    }

    case "REPLACE": {
      const { nodeId, newText } = msg as { nodeId: string; newText: string };

      const node = figma.getNodeById(nodeId);
      if (!node || node.type !== "TEXT") {
        figma.ui.postMessage({
          type: "REPLACE_ERROR",
          error: "Could not find the text layer. Was it deleted?",
        });
        return;
      }

      const textNode = node as TextNode;

      if (textNode.hasMissingFont) {
        figma.ui.postMessage({
          type: "REPLACE_ERROR",
          error: "This layer uses a missing font and cannot be edited.",
        });
        return;
      }

      try {
        await Promise.all(
          textNode
            .getRangeAllFontNames(0, textNode.characters.length)
            .map(figma.loadFontAsync)
        );
        textNode.characters = newText as string;
        figma.ui.postMessage({ type: "REPLACE_SUCCESS", nodeId, newText });
      } catch (err) {
        figma.ui.postMessage({
          type: "REPLACE_ERROR",
          error: `Font error: ${String(err)}`,
        });
      }
      break;
    }

    case "SAVE_API_KEY": {
      const { key } = msg as { key: string };
      await figma.clientStorage.setAsync(STORAGE_KEY, key);
      figma.ui.postMessage({ type: "API_KEY_SAVED" });
      break;
    }

    case "CLEAR_API_KEY": {
      await figma.clientStorage.deleteAsync(STORAGE_KEY);
      await figma.clientStorage.deleteAsync(CHAT_HISTORY_KEY);
      figma.ui.postMessage({ type: "API_KEY_CLEARED" });
      break;
    }

    case "SAVE_EVALUATION_MODE": {
      const { mode } = msg as { mode: EvaluationMode };
      await figma.clientStorage.setAsync(EVALUATION_MODE_KEY, mode);
      figma.ui.postMessage({ type: "EVALUATION_MODE_SAVED", mode });
      break;
    }

    case "CLEAR_EVALUATION_MODE": {
      await figma.clientStorage.deleteAsync(EVALUATION_MODE_KEY);
      figma.ui.postMessage({ type: "EVALUATION_MODE_CLEARED" });
      break;
    }

    case "SAVE_CHAT_HISTORY": {
      const { entries } = msg as { entries: unknown[] };
      if (!Array.isArray(entries)) break;
      await figma.clientStorage.setAsync(
        CHAT_HISTORY_KEY,
        JSON.stringify(entries.slice(0, MAX_SAVED_CHATS))
      );
      break;
    }

    case "RESIZE": {
      const { width, height } = msg as { width: number; height: number };
      figma.ui.resize(width, height);
      break;
    }

    case "CLOSE": {
      figma.closePlugin();
      break;
    }
  }
};
