export const isRtl = (element: HTMLElement = document.documentElement) => {
  return element.dir === 'rtl';
};
