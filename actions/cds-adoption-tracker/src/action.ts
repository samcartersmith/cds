import { logAllComponentStats, logIllustrationStats, setupAnalytics } from './utils/analytics';
import {
  getExternalComponentImportStats,
  getIllustrationNames,
  isPresentationalComponent,
} from './utils/componentHelpers';
import { getInputs } from './utils/inputs';
import { createProject, getPackageJsonDependencies, loadPackageJson } from './utils/projectHelpers';
import { type ComponentStats, type IllustrationStats } from './types';

export async function run(): Promise<void> {
  try {
    setupAnalytics();

    const inputs = getInputs();
    console.log('--------------------------------');
    console.log('--------------------------------');
    console.log('Running CDS Component Tracker with the following inputs:', inputs);

    const cdsComponentStats: ComponentStats[] = [];
    const nonCdsComponentStats: ComponentStats[] = [];
    const illustrationStatsArr: IllustrationStats[] = [];
    let cdsComponentTotalCount = 0;
    let nonCdsComponentTotalCount = 0;

    console.log('--------------------------------');
    console.log(`Evaluating Project for [${inputs.projectName}]...`);
    console.log('--------------------------------');

    const [project, projectRoot] = createProject(inputs.tsconfigPath);
    const packageJson = loadPackageJson(projectRoot);
    const [packageJsonDependencies, cdsVersions] = getPackageJsonDependencies(packageJson);

    console.log('--------------------------------');
    console.log('Parsing Project Files...');
    console.log('--------------------------------');

    for (const sourceFile of project.getSourceFiles()) {
      if (sourceFile.getFilePath().includes('index.tsx')) {
        continue;
      }

      const externalImports = getExternalComponentImportStats(
        sourceFile,
        packageJsonDependencies,
        cdsVersions,
      );

      for (const externalImport of externalImports) {
        if (externalImport.importPath.includes('cds')) {
          cdsComponentTotalCount++;
          const existingStat = cdsComponentStats.find((stat) => stat.name === externalImport.name);
          if (existingStat) {
            existingStat.timesUsed++;
          } else {
            cdsComponentStats.push({
              name: externalImport.name,
              timesUsed: 1,
              filePath: sourceFile.getFilePath(),
              importPath: externalImport.importPath,
              version: externalImport.version,
            });
          }

          const illustrationNames = getIllustrationNames(externalImport, sourceFile);
          for (const illustrationName of illustrationNames) {
            const existingIllustration = illustrationStatsArr.find(
              (stat) =>
                stat.componentType === externalImport.name &&
                stat.illustrationName === illustrationName,
            );
            if (existingIllustration) {
              existingIllustration.timesUsed++;
            } else {
              illustrationStatsArr.push({
                componentType: externalImport.name,
                illustrationName,
                timesUsed: 1,
                importPath: externalImport.importPath,
                version: externalImport.version,
              });
            }
          }
        } else {
          if (isPresentationalComponent(externalImport, sourceFile)) {
            nonCdsComponentTotalCount++;
            const existingStat = nonCdsComponentStats.find(
              (stat) => stat.name === externalImport.name,
            );
            if (existingStat) {
              existingStat.timesUsed++;
            } else {
              nonCdsComponentStats.push({
                name: externalImport.name,
                timesUsed: 1,
                filePath: sourceFile.getFilePath(),
                importPath: externalImport.importPath,
                version: externalImport.version,
              });
            }
          }
        }
      }
    }

    // log all component stats to Datadog
    logAllComponentStats(cdsComponentStats, nonCdsComponentStats, inputs.projectName);
    logIllustrationStats(illustrationStatsArr, inputs.projectName);

    console.log(`Total CDS Components: ${cdsComponentTotalCount}`);
    console.log(`Total Non-CDS Components: ${nonCdsComponentTotalCount}`);
    console.log(`Unique Illustration Usages: ${illustrationStatsArr.length}`);
    console.log(
      `Percent CDS: ${(
        (cdsComponentTotalCount / (cdsComponentTotalCount + nonCdsComponentTotalCount)) *
        100
      ).toFixed(2)}%`,
    );
    console.log('--------------------------------');
    console.log('--------------------------------');

    // allow time for batched metrics to send
    await new Promise((resolve) => {
      setTimeout(resolve, 4000);
    });
  } catch (error) {
    // don't fail the PR on errors
    if (error instanceof Error) {
      console.log(error.message);
      console.log(error.stack);
    } else {
      console.log(error);
    }
  }
}

// Run the action
void run();
