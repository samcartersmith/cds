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
          sourceFile: 'src/SVGParseTest',
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
      sourceGlob: `**/Presentational*.tsx`,
    };

    const projectParser = new ProjectParser(config);
    await projectParser.parse();

    // console.log(projectParser.components);

    const components = JSON.parse(projectParser.components) as Record<string, unknown>;
    expect(components).toEqual({
      cds: [],
      presentational: [
        {
          name: 'svg',
          sourceFile: 'src/PresentationalTestDefaultExport',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'svg',
        },
        {
          name: 'div',
          sourceFile: 'src/PresentationalTestDefaultExport',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalProps: [
            { prop: 'className', callSite: 'src/PresentationalTestDefaultExport.tsx' },
          ],
          propsWithCallSites: { className: { 'src/PresentationalTestDefaultExport.tsx': 1 } },
        },
        {
          name: 'svg',
          sourceFile: 'src/PresentationalTestSvg',
          totalInstances: 2,
          totalCallSites: 1,
          presentationalElement: 'svg',
          callSites: { 'src/PresentationalTestSvg.tsx': 2 },
        },
        {
          name: 'CustomSvg1',
          sourceFile: 'src/PresentationalTestSvg',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'CustomSvg1',
        },
        {
          name: 'CustomSvg2',
          sourceFile: 'src/PresentationalTestSvg',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'CustomSvg2',
        },
        {
          name: 'PresentationalTestDefaultExport',
          sourceFile: 'src/PresentationalTestDefaultExport',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'PresentationalTestDefaultExport',
        },
        {
          name: 'TestPresentationAttribute',
          sourceFile: 'src/PresentationalTestDefaultExport/TestPresentationAttribute',
          totalInstances: 1,
          totalCallSites: 1,
          presentationalElement: 'TestPresentationAttribute',
        },
      ],
      other: [],
    });
  });
});
