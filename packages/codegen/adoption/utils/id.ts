export const idSeparator = '~~~~~~';

export function toId(componentName: string, callSite: string) {
  return `${componentName}${idSeparator}${callSite}`;
}

export function fromId(id: string) {
  return id.split(idSeparator);
}
