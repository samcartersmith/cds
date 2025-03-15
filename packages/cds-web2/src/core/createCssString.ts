export const createCssString = (cssProperties: React.CSSProperties) => {
  let string = '';
  for (const key in cssProperties) {
    const value = cssProperties[key as keyof typeof cssProperties];
    if (typeof value !== 'object') string += key + ':' + value + ';';
    else string += key + '{' + createCssString(value) + '}';
  }
  return string;
};
