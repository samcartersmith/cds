export function transformKeyAndValue(template: string) {
  // example template is `transformKeyAndValue('[key]: [value]')`

  return (keyOrtuple: string | [string, unknown], maybeValue: unknown) => {
    const [key, value] = Array.isArray(keyOrtuple) ? keyOrtuple : [keyOrtuple, maybeValue];
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    const valueHasRuntimeLogic = stringValue.includes('() =>');
    const interpolatedTemplate = template
      .replace('key', `'${key}'`)
      .replace('value', valueHasRuntimeLogic ? stringValue : `'${stringValue}'`)
      .replaceAll('[', '')
      .replaceAll(']', '');

    return interpolatedTemplate;
  };
}
