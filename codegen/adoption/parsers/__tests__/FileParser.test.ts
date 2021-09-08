// test svg's here

import path from 'path';
import { ProjectParser } from '../ProjectParser';

describe('FileParser Tests', () => {
  test('svg does not dig into the tree', async () => {
    const config = {
      root: path.join(__dirname, 'project'),
      github: 'frontend/coinbase-www',
      id: 'retail-web-shared',
      label: 'Retail Web Shared',
      sourceGlob: `**/SVGParseTest.tsx`,
    };

    const projectParser = new ProjectParser(config);
    await projectParser.parse();

    expect(JSON.parse(projectParser.components)).toEqual({
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
    const config = {
      root: path.join(__dirname, 'project'),
      github: 'frontend/coinbase-www',
      id: 'retail-web-shared',
      label: 'Retail Web Shared',
      tsAlias: '@test/frontend',
      sourceGlob: `**/presentational/**/*.(ts|tsx|js|jsx)`,
    };

    const projectParser = new ProjectParser(config);
    await projectParser.parse();

    // console.log(JSON.stringify(JSON.parse(projectParser.components), null, 2));
    // console.log(projectParser.aliasedCdsComponents.entries());
    // console.log(projectParser.cdsToAliasMapping.entries());

    const sortFn = (
      a: { name: string; sourceFile: string },
      b: { name: string; sourceFile: string },
    ) => `${a.name}-${a.sourceFile}`.localeCompare(`${b.name}-${b.sourceFile}`);

    // sort the components so it is deterministic
    const components = JSON.parse(projectParser.components) as Record<
      'cds' | 'presentational' | 'other',
      { name: string; sourceFile: string }[]
    >;
    components.presentational.sort(sortFn);
    components.other.sort(sortFn);
    components.cds.sort(sortFn);
    expect(components).toEqual({
      cds: [
        {
          name: 'NavigationBarControls',
          sourceFile: '@cbhq/cds-web/navigation/NavigationBarControls',
          totalInstances: 2,
          totalCallSites: 1,
          cds: '@cbhq/cds-web/navigation/NavigationBarControls',
          aliasedCdsComponents: [
            {
              aliasPath: '@test/frontend/presentational/components/NavigationControl.tsx',
              callSites: ['@test/frontend/presentational/view/PresentationalTestSvg.tsx'],
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
          sourceFile: '@test/frontend/presentational/view/PresentationalTestSvg.tsx',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'svg',
        },
        {
          name: 'CustomSvg2',
          sourceFile: '@test/frontend/presentational/view/PresentationalTestSvg.tsx',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'svg',
        },
        {
          name: 'CustomSvg3',
          sourceFile: '@test/frontend/presentational/view/PresentationalTestSvg.tsx',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'svg',
        },
        {
          name: 'CustomSvg4',
          sourceFile: '@test/frontend/presentational/view/PresentationalTestSvg.tsx',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'svg',
        },
        {
          name: 'CustomSvg5',
          sourceFile: '@test/frontend/presentational/view/PresentationalTestSvg.tsx',
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
            '@test/frontend/presentational/view/PresentationalTestSvg.tsx': 3,
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
              '@test/frontend/presentational/view/PresentationalTestSvg.tsx': 1,
            },
          },
        },
        {
          name: 'TableCell',
          sourceFile: '@material-ui/core/TableCell',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalLibrary: '@material-ui/core/TableCell',
          extendedStyledComponents: [
            {
              alias: 'StyledCell',
              callSite: '@test/frontend/presentational/view/PresentationalTestSvg.tsx',
            },
          ],
        },
      ].sort(sortFn),
      other: [
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
        {
          name: 'div',
          sourceFile: '@test/frontend/presentational/view/PresentationalTestSvg.tsx',
          totalInstances: 2,
          totalCallSites: 1,
          callSites: {
            '@test/frontend/presentational/view/PresentationalTestSvg.tsx': 2,
          },
        },
        {
          name: 'CustomDiv',
          sourceFile: '@test/frontend/presentational/view/PresentationalTestSvg.tsx',
          totalInstances: 1,
          totalCallSites: 1,
        },
        {
          name: 'span',
          sourceFile: '@test/frontend/presentational/view/PresentationalTestSvg.tsx',
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
          name: 'StyledCell',
          sourceFile: '@test/frontend/presentational/view/PresentationalTestSvg.tsx',
          totalInstances: 1,
          totalCallSites: 1,
        },
      ].sort(sortFn),
    });
  });
});
