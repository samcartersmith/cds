jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  m: jest.requireActual('framer-motion')?.motion,
  useReducedMotion: () => true,
  // eslint-disable-next-line react/jsx-no-useless-fragment
  LazyMotion: ({ children }) => <>{children}</>,
  // eslint-disable-next-line react/jsx-no-useless-fragment
  AnimatePresence: ({ children }) => <>{children}</>,
}));
