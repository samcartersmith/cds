export type ElevationLevels = 0 | 1 | 2;

export type ElevationProps = {
  /** Determines a component's shadow styles. Parent should have overflow set to visible to ensure styles are not clipped. */
  elevation?: ElevationLevels;
};
