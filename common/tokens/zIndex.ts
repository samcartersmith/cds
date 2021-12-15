export type OverlayZIndexKeys = keyof typeof zIndex.overlays;

// For CDS internal use only
export const zIndex = {
  navigation: 2,
  interactable: 1,
  overlays: {
    portal: 100001,
    popoverMenu: 1,
    modal: 2,
    toast: 3,
    alert: 4,
  },
  max: 2147483647,
} as const;
