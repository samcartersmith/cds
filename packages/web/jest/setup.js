jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  m: jest.requireActual('framer-motion')?.motion,
  // this will skip all animations in test which boosts test speed
  useReducedMotion: () => true,
}));
