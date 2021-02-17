// TODO: Handle for SSR
export const isRtl = (element?: HTMLElement | undefined) => {
  if (element) {
    return element.dir === 'rtl';
  }
  return false;
};
