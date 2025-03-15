import chalk from 'chalk';
import { glob } from 'glob';
import fs from 'node:fs';
import path from 'node:path';
import { writePrettyFile } from '@cbhq/script-utils';

import {
  ProductComponentConfig,
  ProductComponentSummary,
} from '../../components/AdoptionTracker/types';

import { ProjectParser } from './parsers/ProjectParser';
import { getListOfComponentsAndImports } from './utils/getListOfComponentsAndImports';
import {
  getCDSCommonPackageJsonFromThreeMonthsAgo,
  getCDSVersionFromComponentPatternPackage,
} from './utils/getOldCDSVersion';
import { getCDSVersion } from './utils/getPackageJson';
import { getCUJPreviousStats, getPreviousStats } from './utils/getPreviousStats';
import { cleanup, getTempRepos } from './utils/getTempRepos';
import { preGenerateCleanup } from './utils/preGenerateCleanup';
import {
  adopters,
  adoptersSidebar,
  adoptersWithPillar,
  adoptionDocsDir,
  coreUserJourneyConfig,
  cujs,
  cujsSidebar,
  cujSummaries,
  cujsWithCategory,
  generatedDataDir,
  generatedStaticDataDir,
  hiddenAdoptersWithPillar,
  productComponentConfig,
} from './config';
import { generateAdoptionAndImpactReports } from './generateAdoptionAndImpactReports';
import { generateJSONForProductComponentSummary } from './generateJsonFileForProductComponentSummary';
import {
  generateCUJAverageReport,
  generateMergedCUJComponentSummary,
  generateMergedCUJStatsSummary,
} from './generateOverallCUJSummary';
import { generateOverallStatsReport } from './generateOverallStatsSummaryReport';
import {
  AdoptersConfig,
  ComponentProductJSONFile,
  ProductComponentData,
  ProductComponentInfo,
} from './types';

async function generateMdxFiles(project: ProjectParser) {
  return writePrettyFile(
    `${adoptionDocsDir}/${project.id}.mdx`,
    `
---
hide_title: true
hide_table_of_contents: true
title: ${project.label}
sidebar_label: ${project.label}
---

import { AdopterDetails } from ':cds-website/components/AdoptionTracker/AdopterDetails';
import { AdopterComponentsProvider } from ':cds-website/components/AdoptionTracker/context/AdopterComponentsProvider';
import { AdopterProjectInfoProvider } from ':cds-website/components/AdoptionTracker/context/AdopterProjectInfoProvider';
import { AdopterStatsProvider } from ':cds-website/components/AdoptionTracker/context/AdopterStatsProvider';

<AdopterStatsProvider {...require(':cds-website/${generatedStaticDataDir.relativePath}/${project.id}/stats.json')} >
<AdopterProjectInfoProvider {...require(':cds-website/${generatedStaticDataDir.relativePath}/${project.id}/info.json')} >
<AdopterComponentsProvider {...require(':cds-website/${generatedStaticDataDir.relativePath}/${project.id}/components.json')}>
<AdopterDetails />
</AdopterComponentsProvider>
</AdopterProjectInfoProvider>
</AdopterStatsProvider>
    `.trimStart(),
  );
}
function cleanMdxContent(content: string) {
  // This will remove the specific unwanted pattern `{' '}`
  return content.replace(/{' '}/g, '');
}

async function generateMdxFilesForSpecificCUJ(project: AdoptersConfig) {
  return writePrettyFile(
    `${adoptionDocsDir}/cuj/${project.id}.mdx`,
    cleanMdxContent(
      `
---
hide_title: true
hide_table_of_contents: true
title: ${project.label}
sidebar_label: ${project.label}
---

import { CUJDetails } from ':cds-website/components/AdoptionTracker/CUJDetails';
import { AdopterStatsProvider } from ':cds-website/components/AdoptionTracker/context/AdopterStatsProvider';
import { AdopterComponentsProvider } from ':cds-website/components/AdoptionTracker/context/AdopterComponentsProvider';

<AdopterStatsProvider {...require(':cds-website/${generatedStaticDataDir.relativePath}/cuj/summary/${project.id}/stats.json')} >
<AdopterComponentsProvider {...require(':cds-website/${generatedStaticDataDir.relativePath}/cuj/summary/${project.id}/components.json')}>
<CUJDetails id={"${project.id}"} title={"${project.label}"} />
</AdopterComponentsProvider>
</AdopterStatsProvider>
    `.trimStart(),
    ),
  );
}

async function generateMdxFilesForCUJ(coreUserJourneyConfig: AdoptersConfig[]) {
  coreUserJourneyConfig.forEach(async (project) => {
    void generateMdxFilesForSpecificCUJ(project);
  });
}

async function generateAdoptersData() {
  return writePrettyFile(
    `${generatedDataDir}/adopters.ts`,
    `
/**
 * DO NOT MODIFY
 * Generated from yarn nx run website:adoption
 */
export const adopters = ${JSON.stringify(adoptersWithPillar)} as const;
`.trimStart(),
  );
}

async function generateCUJsData() {
  return writePrettyFile(
    `${generatedDataDir}/cujs.ts`,
    `
/**
 * DO NOT MODIFY
 * Generated from yarn nx run website:adoption
 */
export const cujs = ${JSON.stringify(cujsWithCategory)} as const;
`.trimStart(),
  );
}

async function generateCUJSummaryData() {
  return writePrettyFile(
    `${generatedDataDir}/cujSummary.ts`,
    `
/**
 * DO NOT MODIFY
 * Generated from yarn nx run website:adoption
 */
export const cujSummary = ${JSON.stringify(cujSummaries)} as const;
`.trimStart(),
  );
}

async function generateHiddenAdoptersData() {
  return writePrettyFile(
    `${generatedDataDir}/adopters-hidden.ts`,
    `
/**
 * DO NOT MODIFY
 * Generated from yarn nx run website:adoption
 */
export const hiddenAdopters = ${JSON.stringify(hiddenAdoptersWithPillar)} as const;
`.trimStart(),
  );
}

async function generateCUJSidebarData() {
  return writePrettyFile(
    `${generatedDataDir}/cuj-sidebar.js`,
    `
/**
 * DO NOT MODIFY
 * Generated from yarn nx run website:adoption
 */
module.exports.cujs = ${JSON.stringify(cujsSidebar)};
`.trimStart(),
  );
}

async function generateAdoptersSidebarData() {
  return writePrettyFile(
    `${generatedDataDir}/adopters-sidebar.js`,
    `
/**
 * DO NOT MODIFY
 * Generated from yarn nx run website:adoption
 */
module.exports.adopters = ${JSON.stringify(adoptersSidebar)};
`.trimStart(),
  );
}

function matchDependencies(
  dependencies: Record<string, string>,
  config: ProductComponentConfig[],
): Record<string, string> {
  if (!dependencies || !Object.keys(dependencies).length) return {};
  return Object.keys(dependencies)
    .filter((key) => config.some((c) => key === c.packageImportPath))
    .reduce((acc: Record<string, string>, key) => {
      acc[key] = dependencies[key];
      return acc;
    }, {} as Record<string, string>);
}

async function generateProductComponentData(
  project: ProjectParser,
  config: ProductComponentConfig[],
): Promise<void> {
  const projectPath = path.join(generatedStaticDataDir.absolutePath, project.id);
  const infoPath = path.join(projectPath, 'info.json');
  const componentsPath = path.join(projectPath, 'components.json');

  try {
    const infoDataRaw = await fs.promises.readFile(infoPath, 'utf8');
    const componentsDataRaw = await fs.promises.readFile(componentsPath, 'utf8');

    const infoData: ProductComponentInfo = JSON.parse(infoDataRaw);
    const componentsData: ProductComponentData = JSON.parse(componentsDataRaw);

    const matchedComponents = productComponentConfig
      .map(
        (config) =>
          Object.values(componentsData)

            .map((components) => {
              const component = components.find(
                (component) =>
                  component.name === config.productComponentName &&
                  component.sourceFile.startsWith(config.packageImportPath),
              );
              if (component) return { component, config };
            })
            .filter(Boolean) || [],
      )
      .flat();

    const matchedDependencies = {
      dependencies: matchDependencies(infoData.dependencies, config),
      devDependencies: matchDependencies(infoData.devDependencies, config),
      peerDependencies: matchDependencies(infoData.peerDependencies, config),
      resolutions: matchDependencies(infoData.resolutions, config),
    };

    const patternsData = {
      components: matchedComponents,
      dependencies: matchedDependencies,
    };

    await fs.promises.writeFile(
      path.join(projectPath, 'componentPatterns.json'),
      JSON.stringify(patternsData, null, 2),
    );
  } catch (error) {
    console.error(`Error generating component patterns data for ${project.id}:`, error);
  }
}

async function generateProductComponentsSummary(): Promise<void> {
  const patternFilePaths = await glob(
    `${generatedStaticDataDir.absolutePath}/*/componentPatterns.json`,
  );

  const componentSummary: Record<string, ProductComponentSummary> = {};

  patternFilePaths.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const json: ComponentProductJSONFile = JSON.parse(content);

    if (!json?.components || json.components.length === 0) return;
    json.components.forEach(({ component, config }) => {
      const { name } = component;

      if (!componentSummary[name]) {
        componentSummary[name] = {
          totalInstances: 0,
          totalCallSites: 0,
          components: [],
          config: {
            owningTeam: config.owningTeam,
            doc: config.doc,
            packageImportPath: config.packageImportPath,
            productComponentName: config.productComponentName,
            packagePath: config.packagePath,
          },
          cdsVersion: {
            cdsWeb: '',
            cdsMobile: '',
            cdsCommon: '',
            lowestVersion: '',
            sanitizedLowestVersion: '',
          },
        };
      }

      componentSummary[name].totalInstances += component.totalInstances;
      componentSummary[name].totalCallSites += component.totalCallSites;
      componentSummary[name].components.push(component);
    });
  });

  await fs.promises.writeFile(
    path.join(generatedStaticDataDir.absolutePath, 'componentPatternsSummary.json'),
    JSON.stringify(componentSummary, null, 2),
  );
}

async function addCDSVersionToProductComponentsData(): Promise<void> {
  const summaryFilePath = path.join(
    generatedStaticDataDir.absolutePath,
    'componentPatternsSummary.json',
  );

  try {
    // Load the component patterns summary data
    const dataRaw = await fs.promises.readFile(summaryFilePath, 'utf8');
    const summaryData: Record<string, ProductComponentSummary> = JSON.parse(dataRaw);

    // Iterate over each component in the summary data
    for (const [, componentData] of Object.entries(summaryData)) {
      const { config } = componentData;
      const { packagePath } = config;

      // Fetch CDS version information for the component's package

      const cdsVersionResult = await getCDSVersionFromComponentPatternPackage(packagePath);

      // Add CDS version info to the component's data
      componentData.cdsVersion = cdsVersionResult;
    }

    // Write the updated data back to the file
    await fs.promises.writeFile(summaryFilePath, JSON.stringify(summaryData, null, 2));
    console.log('Successfully updated product component data with CDS versions.');
  } catch (error) {
    console.error('Error adding CDS version to product component data:', error);
  }
}
async function generateAdoptionDirectory(project: ProjectParser) {
  return fs.promises.mkdir(`${generatedStaticDataDir.absolutePath}/${project.id}`, {
    recursive: true,
  });
}

async function generateAdopterComponentsData(project: ProjectParser) {
  return fs.promises.writeFile(
    `${generatedStaticDataDir.absolutePath}/${project.id}/components.json`,
    JSON.stringify(project.components),
  );
}

async function generateAdopterStatsData(project: ProjectParser) {
  return fs.promises.writeFile(
    `${generatedStaticDataDir.absolutePath}/${project.id}/stats.json`,
    JSON.stringify(project.stats),
  );
}

async function generateAdopterProjectInfoData(project: ProjectParser) {
  return fs.promises.writeFile(
    `${generatedStaticDataDir.absolutePath}/${project.id}/info.json`,
    JSON.stringify(project.projectInfo),
  );
}

async function generateCUJDirectory(project: ProjectParser) {
  return fs.promises.mkdir(`${generatedStaticDataDir.absolutePath}/cuj/${project.id}`, {
    recursive: true,
  });
}

async function generateCUJComponentsData(project: ProjectParser) {
  return fs.promises.writeFile(
    `${generatedStaticDataDir.absolutePath}/cuj/${project.id}/components.json`,
    JSON.stringify(project.components),
  );
}

async function generateCUJStatsData(project: ProjectParser) {
  return fs.promises.writeFile(
    `${generatedStaticDataDir.absolutePath}/cuj/${project.id}/stats.json`,
    JSON.stringify(project.stats),
  );
}

async function generateCUJProjectInfoData(project: ProjectParser) {
  return fs.promises.writeFile(
    `${generatedStaticDataDir.absolutePath}/cuj/${project.id}/info.json`,
    JSON.stringify(project.projectInfo),
  );
}

async function generateAdoptionFiles() {
  const trackedProjectsWithZeroAdoption: string[] = [];

  await Promise.all(
    adopters.map(async (config) => {
      const previousStats = await getPreviousStats(config.id);
      const currentCDSVersion = (await getCDSVersion()) || '';

      // get @cbhq/cds-common version from 3 months ago using git show
      const cdsCommonsPackageFrom3MonthsAgo = await getCDSCommonPackageJsonFromThreeMonthsAgo();
      const cdsCommonsVersionFrom3MonthsAgo = cdsCommonsPackageFrom3MonthsAgo.version;

      const project = await new ProjectParser(
        config,
        currentCDSVersion,
        cdsCommonsVersionFrom3MonthsAgo,
        previousStats,
      ).parse();

      const isTrackedWithZeroAdoption =
        !hiddenAdoptersWithPillar.some((hiddenAdopter) => hiddenAdopter.id === project.id) &&
        Number.isNaN(project.stats.latest.cdsPercent);

      if (isTrackedWithZeroAdoption) {
        trackedProjectsWithZeroAdoption.push(project.id);
      }

      await Promise.all([
        generateMdxFiles(project),
        generateAdoptersData(),
        generateHiddenAdoptersData(),
        generateAdoptersSidebarData(),
        generateAdoptionDirectory(project),
        generateAdopterComponentsData(project),
        generateAdopterStatsData(project),
        generateAdopterProjectInfoData(project),
      ]);
      await generateProductComponentData(project, productComponentConfig);
    }),
  );

  return trackedProjectsWithZeroAdoption;
}

async function generateCUJFiles() {
  await Promise.all(
    cujs.map(async (config) => {
      const previousStats = await getCUJPreviousStats(config.id);
      const currentCDSVersion = (await getCDSVersion()) || '';

      // get @cbhq/cds-common version from 3 months ago using git show
      const cdsCommonsPackageFrom3MonthsAgo = await getCDSCommonPackageJsonFromThreeMonthsAgo();
      const cdsCommonsVersionFrom3MonthsAgo = cdsCommonsPackageFrom3MonthsAgo.version;

      const cujProject = await new ProjectParser(
        config,
        currentCDSVersion,
        cdsCommonsVersionFrom3MonthsAgo,
        previousStats,
      ).parse();

      await Promise.all([
        generateCUJsData(),
        generateCUJSummaryData(),
        generateCUJDirectory(cujProject),
        generateCUJComponentsData(cujProject),
        generateCUJStatsData(cujProject),
        generateCUJProjectInfoData(cujProject),
      ]);
    }),
  );
  await Promise.all([generateMdxFilesForCUJ(coreUserJourneyConfig), generateCUJSidebarData()]);
}

async function main() {
  try {
    await preGenerateCleanup();
    await getTempRepos();
    // Required to associate adopters with their stats.json file for Adoption Overview page.
    const trackedProjectsWithZeroAdoption = await generateAdoptionFiles();
    await generateCUJFiles();
    await getListOfComponentsAndImports();
    await generateAdoptionAndImpactReports();
    await generateProductComponentsSummary();
    await addCDSVersionToProductComponentsData();
    await generateOverallStatsReport();
    generateJSONForProductComponentSummary();
    generateMergedCUJStatsSummary(coreUserJourneyConfig);
    generateCUJAverageReport(coreUserJourneyConfig);
    generateMergedCUJComponentSummary(coreUserJourneyConfig);

    cleanup();

    if (trackedProjectsWithZeroAdoption.length > 0) {
      console.warn(
        `${chalk.bold.yellowBright(
          'Adoption percentage for these projects is zero, please confirm:',
        )} ${chalk.bold.blueBright(trackedProjectsWithZeroAdoption.join(', '))}`,
      );
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      cleanup();
    } else {
      throw err;
    }
  }
}

void main();
