// test svg's here

import path from 'path';
import { ProjectParser, ProjectParserConfig } from '../ProjectParser';

type ComponentData = { name: string; sourceFile: string };

describe('FileParser Tests', () => {
  test('svg does not dig into the tree', async () => {
    const config: ProjectParserConfig = {
      root: path.join(__dirname, 'project'),
      github: 'frontend/coinbase-www',
      id: 'retail-web-shared',
      label: 'Retail Web Shared',
      sourceGlob: `**/SVGParseTest.tsx`,
    };

    const projectParser = new ProjectParser(config);
    await projectParser.parse();

    expect(projectParser.components).toEqual({
      cds: [],
      presentational: [
        {
          name: 'svg',
          sourceFile: 'src/SVGParseTest.tsx',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'svg',
          presentationalProps: [{ prop: 'style', callSite: 'src/SVGParseTest.tsx' }],
          propsWithCallSites: {
            width: { 'src/SVGParseTest.tsx': 1 },
            height: { 'src/SVGParseTest.tsx': 1 },
            viewBox: { 'src/SVGParseTest.tsx': 1 },
            fill: { 'src/SVGParseTest.tsx': 1 },
            xmlns: { 'src/SVGParseTest.tsx': 1 },
            name: { 'src/SVGParseTest.tsx': 1 },
            style: { 'src/SVGParseTest.tsx': 1 },
          },
        },
      ],
      other: [],
    });
  });

  test('nested presentational component', async () => {
    const config: ProjectParserConfig = {
      root: path.join(__dirname, 'project'),
      github: 'frontend/coinbase-www',
      id: 'retail-web-shared',
      label: 'Retail Web Shared',
      projectTsAliases: ['@test/frontend'],
      sourceGlob: `**/presentational/**/*.(ts|tsx|js|jsx)`,
    };

    const projectParser = new ProjectParser(config);
    await projectParser.parse();

    // console.log(JSON.stringify(JSON.parse(projectParser.components), null, 2));
    // console.log(projectParser.extendedStyledComponents.entries());
    // console.log(projectParser.styledComponents.entries());
    // console.log(projectParser.aliasedCdsComponents.entries());
    // console.log(projectParser.cdsToAliasMapping.entries());

    const sortFn = (a: ComponentData, b: ComponentData) =>
      `${a.name}-${a.sourceFile}`.localeCompare(`${b.name}-${b.sourceFile}`);

    // sort the components so it is deterministic
    const components = projectParser.components as Record<
      'cds' | 'presentational' | 'other',
      ComponentData[]
    >;
    components.presentational.sort(sortFn);
    components.other.sort(sortFn);
    components.cds.sort(sortFn);
    expect(components).toEqual({
      cds: [
        {
          name: 'Box',
          sourceFile: '@cbhq/cds-web/layout/Box',
          totalInstances: 1,
          totalCallSites: 1,
          cds: '@cbhq/cds-web/layout/Box',
          propsWithCallSites: {
            width: {
              '@test/frontend/presentational/components/BoxWrapper.tsx': 1,
            },
            minWidth: {
              '@test/frontend/presentational/components/BoxWrapper.tsx': 1,
            },
            height: {
              '@test/frontend/presentational/components/BoxWrapper.tsx': 1,
            },
            borderRadius: {
              '@test/frontend/presentational/components/BoxWrapper.tsx': 1,
            },
            bordered: {
              '@test/frontend/presentational/components/BoxWrapper.tsx': 1,
            },
          },
        },
        {
          name: 'VStack',
          sourceFile: '@cbhq/cds-web/layout/VStack',
          totalInstances: 1,
          totalCallSites: 1,
          cds: '@cbhq/cds-web/layout/VStack',
        },
        {
          name: 'NavigationBarControls',
          sourceFile: '@cbhq/cds-web/navigation/NavigationBarControls',
          totalInstances: 2,
          totalCallSites: 1,
          cds: '@cbhq/cds-web/navigation/NavigationBarControls',
          aliasedCdsComponents: [
            {
              aliasPath: '@test/frontend/presentational/components/NavigationControl.tsx',
              callSites: ['@test/frontend/presentational/view/PresentationalTest.tsx'],
            },
          ],
          callSites: {
            '@test/frontend/presentational/components/NavigationControl.tsx': 2,
          },
        },
        {
          name: 'IconButton',
          sourceFile: '@cbhq/cds-web/buttons/IconButton',
          totalInstances: 1,
          totalCallSites: 1,
          cds: '@cbhq/cds-web/buttons/IconButton',
          propsWithCallSites: {
            as: {
              '@test/frontend/presentational/components/NavigationControl.tsx': 1,
            },
            name: {
              '@test/frontend/presentational/components/NavigationControl.tsx': 1,
            },
          },
        },
      ].sort(sortFn),
      presentational: [
        {
          name: 'CustomSvg1',
          sourceFile: '@test/frontend/presentational/view/PresentationalTest.tsx',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'svg',
        },
        {
          name: 'CustomSvg2',
          sourceFile: '@test/frontend/presentational/view/PresentationalTest.tsx',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'svg',
        },
        {
          name: 'CustomSvg3',
          sourceFile: '@test/frontend/presentational/view/PresentationalTest.tsx',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'svg',
        },
        {
          name: 'CustomSvg4',
          sourceFile: '@test/frontend/presentational/view/PresentationalTest.tsx',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'svg',
        },
        {
          name: 'CustomSvg5',
          sourceFile: '@test/frontend/presentational/view/PresentationalTest.tsx',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'svg',
        },
        {
          name: 'PresentationalTestDefaultExport',
          sourceFile: '@test/frontend/presentational/view/PresentationalTestDefaultExport',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'svg',
        },
        {
          name: 'TestPresentationAttribute',
          sourceFile:
            '@test/frontend/presentational/view/PresentationalTestDefaultExport/TestPresentationAttribute',
          totalInstances: 3,
          totalCallSites: 1,
          presentationalElement: 'div',
          callSites: {
            '@test/frontend/presentational/view/PresentationalTest.tsx': 3,
          },
        },
        {
          name: 'Modal',
          sourceFile: '@test/frontend/presentational/components/Modal',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: '@material-ui/core/Modal',
          propsWithCallSites: {
            open: {
              '@test/frontend/presentational/view/PresentationalTest.tsx': 1,
            },
          },
        },
        {
          name: 'TableCell',
          sourceFile: '@material-ui/core/TableCell',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalLibrary: '@material-ui/core/TableCell',
        },
        {
          name: 'StyledCell',
          sourceFile: '@test/frontend/presentational/view/PresentationalTest.tsx',
          totalInstances: 1,
          totalCallSites: 1,
          styledComponent: 'TableCell',
        },
        {
          name: 'StyledTable',
          sourceFile: '@test/frontend/presentational/view/PresentationalTest.tsx',
          totalInstances: 1,
          totalCallSites: 1,
          styledComponent: 'Table',
        },
        {
          name: 'Accordion',
          sourceFile: '@test/frontend/presentational/components/Accordion',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'StyledAccordion',
        },
        {
          name: 'StyledDiv',
          sourceFile: '@test/frontend/presentational/view/PresentationalTest.tsx',
          totalInstances: 1,
          totalCallSites: 1,
          styledComponent: 'div',
        },
        {
          name: 'div',
          sourceFile: '@test/frontend/presentational/components/BoxWrapper.tsx',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalProps: [
            {
              prop: 'className',
              callSite: '@test/frontend/presentational/components/BoxWrapper.tsx',
            },
          ],
          propsWithCallSites: {
            className: {
              '@test/frontend/presentational/components/BoxWrapper.tsx': 1,
            },
          },
        },
      ].sort(sortFn),
      other: [
        {
          name: 'div',
          sourceFile: '@test/frontend/presentational/view/PresentationalTest.tsx',
          totalInstances: 4,
          totalCallSites: 1,
          callSites: {
            '@test/frontend/presentational/view/PresentationalTest.tsx': 4,
          },
        },
        {
          name: 'CustomDiv',
          sourceFile: '@test/frontend/presentational/view/PresentationalTest.tsx',
          totalInstances: 1,
          totalCallSites: 1,
        },
        {
          name: 'span',
          sourceFile: '@test/frontend/presentational/view/PresentationalTest.tsx',
          totalInstances: 1,
          totalCallSites: 1,
        },
        {
          name: 'NavigationControl',
          sourceFile: '@test/frontend/presentational/components/NavigationControl',
          totalInstances: 1,
          totalCallSites: 1,
        },
        {
          name: 'BoxWrapper',
          sourceFile: '@test/frontend/presentational/components/BoxWrapper',
          totalInstances: 1,
          totalCallSites: 1,
        },
        {
          name: 'span',
          sourceFile: '@test/frontend/presentational/components/BoxWrapper.tsx',
          totalInstances: 2,
          totalCallSites: 1,
          callSites: {
            '@test/frontend/presentational/components/BoxWrapper.tsx': 2,
          },
        },
        {
          name: 'Link',
          sourceFile: 'react-router-dom/Link',
          totalInstances: 2,
          totalCallSites: 1,
          callSites: {
            '@test/frontend/presentational/components/NavigationControl.tsx': 2,
          },
          propsWithCallSites: {
            to: {
              '@test/frontend/presentational/components/NavigationControl.tsx': 2,
            },
          },
        },
        {
          name: 'div',
          sourceFile: '@test/frontend/presentational/components/NavigationControl.tsx',
          totalInstances: 1,
          totalCallSites: 1,
        },
      ].sort(sortFn),
    });
  });
});
