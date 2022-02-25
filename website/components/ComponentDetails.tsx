import * as templatesMap from ':cds-website/data/templatesMap';

/*
  See CDS contributing.md for details on adding content to API documentation
*/

type ExamplesMap = typeof templatesMap;
type ComponentName = keyof ExamplesMap;
type ExampleProps<T extends ComponentName> = {
  componentName: T;
  templateName: keyof ExamplesMap[T];
};

export const ComponentDetails = <T extends ComponentName>({
  componentName,
  templateName,
}: ExampleProps<T>) => {
  if (componentName in templatesMap && templateName in templatesMap[componentName]) {
    const Example = templatesMap[componentName][templateName] as unknown as React.FC;
    return <Example />;
  }
  return null;
};
