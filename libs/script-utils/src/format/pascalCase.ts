import startCase from 'lodash/startCase';

export function pascalCase(str: string) {
  return startCase(str).replace(/ /g, '');
}
