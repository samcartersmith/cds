import type { MultiScreenSelection, TextLayerPayload } from "../types";

interface SelectionContextBarProps {
  selection: MultiScreenSelection;
  activeLayerId: string;
  replaced: boolean;
  replacedLayerId: string | null;
}

function flattenLayers(selection: MultiScreenSelection): TextLayerPayload[] {
  const out: TextLayerPayload[] = [];
  for (const screen of selection.screens) {
    out.push(...screen.layers);
  }
  return out;
}

export default function SelectionContextBar({
  selection,
  activeLayerId,
  replaced,
  replacedLayerId,
}: SelectionContextBarProps) {
  const layers = flattenLayers(selection);
  const screenCount = selection.screens.length;
  const selectionNames = selection.screens.map((screen) => screen.name || "Untitled");
  const primaryName =
    selectionNames.length <= 1 ? selectionNames[0] : `${selectionNames[0]} +${selectionNames.length - 1}`;
  const summaryLine = `Selection: ${primaryName} - ${screenCount} screen${
    screenCount === 1 ? "" : "s"
  } · ${selection.totalTextLayers} text layer${selection.totalTextLayers === 1 ? "" : "s"}`;
  const anyMissing = layers.some((l) => l.hasMissingFont);
  const active = layers.find((l) => l.id === activeLayerId) ?? layers[0];
  const replacementLabel =
    replaced && replacedLayerId === active?.id
      ? " (updated)"
      : anyMissing
        ? " (contains missing font)"
        : "";

  return (
    <div className="px-4 py-2 border-b border-figma-border shrink-0 bg-figma-bg">
      <p className="text-[10px] text-[#8A919E] truncate" title={selectionNames.join(", ")}>
        {summaryLine}
        {replacementLabel}
      </p>
    </div>
  );
}
