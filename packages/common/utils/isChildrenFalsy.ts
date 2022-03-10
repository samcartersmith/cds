export const isChildrenFalsy = (children: React.ReactNode) => {
  return (
    children === false ||
    children === null ||
    children === undefined ||
    children === '' ||
    Number.isNaN(children)
  );
};
