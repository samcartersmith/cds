export const illustrationDimensions = {
  heroSquare: ['240x240', '200x200'],
  spotRectangle: ['240x120'],
  spotSquare: ['120x120'],
  pictogram: ['48x48', '64x64', '96x96'],
} as const;

export const illustrationDimensionDefaults = {
  all: '48x48',
  heroSquare: '240x240',
  pictogram: '48x48',
  spotSquare: '120x120',
  spotRectangle: '240x120',
} as const;

/** [width, height] tuples for allowed dimensions */
export const illustrationSizes = {
  '48x48': [48, 48],
  '64x64': [64, 64],
  '96x96': [96, 96],
  '120x120': [120, 120],
  '200x200': [200, 200],
  '240x120': [240, 120],
  '240x240': [240, 240],
} as const;
