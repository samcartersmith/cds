export type EasingArray = [number, number, number, number];

export const curves = {
  global: [0.6, 0, 0.15, 1] as EasingArray,
  enterExpressive: [0.33, 0, 0, 1] as EasingArray,
  enterFunctional: [0, 0, 0.15, 1] as EasingArray,
  exitExpressive: [1, 0, 0.67, 1] as EasingArray,
  exitFunctional: [0.6, 0, 1, 1] as EasingArray,
} as const;

export const durations = {
  /** Buttons, Toggles, Text, Icons, Selection Controls */
  fast1: 100,
  fast2: 133,
  fast3: 150,
  /** Short distance movements, System Messaging, Navigation Drawer, Modals */
  moderate1: 200,
  moderate2: 250,
  moderate3: 300,
  /** Large distance movements, Page Transitions, Full screen dialogue */
  slow1: 350,
  slow2: 400,
  slow3: 500,
} as const;
