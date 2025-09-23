import type { JsxElementType } from './types';

/** Add a new attribute/value to a JSX component. Only works if value/initializer is a string */
export const addNewProp = ({
  jsx,
  attribute,
  value,
}: {
  jsx: JsxElementType;
  attribute: string;
  value: string;
}) => {
  jsx.addAttribute({
    name: attribute,
    initializer: `"${value}"`,
  });
};
