export type OverlayZIndexKeys = keyof typeof zIndex.overlays;

// For CDS internal use only
export const zIndex = {
  interactable: 1,
  navigation: 2,
  overlays: {
    portal: 100001,
    popoverMenu: 2,
    modal: 3,
    dropdown: 4,
    tooltip: 5,
    toast: 6,
    alert: 7,
  },
  max: 2147483647,
} as const;
