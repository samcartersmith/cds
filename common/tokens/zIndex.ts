export type OverlayZIndexKeys = keyof typeof zIndex.overlays;

export const zIndex = {
  navigation: 2,
  overlays: {
    portal: 100001,
    modal: 1,
    toast: 2,
    alert: 3,
  },
  max: 2147483647,
} as const;
