export type OverlayZIndexKeys = keyof typeof zIndex.overlays;

// For CDS internal use only
export const zIndex = {
  navigation: 2,
  interactable: 1,
  overlays: {
    portal: 100001,
    popoverMenu: 2,
    modal: 3,
    toast: 4,
    alert: 5,
  },
  max: 2147483647,
} as const;
