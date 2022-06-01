/* eslint-disable no-undef */
// grab the min width value
const queryMinWidth = (query) => {
  const q = query.split(' ');
  if (q.length < 2) return false;

  return parseInt(q[1].split('px')[0]);
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => {
    return {
      matches: query ? window.innerWidth >= queryMinWidth(query) : false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  }),
});
