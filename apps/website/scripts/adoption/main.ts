import fs from 'node:fs';
import { writePrettyFile } from '@cbhq/script-utils';

import { ProjectParser } from './parsers/ProjectParser';
import { getListOfComponentsAndImports } from './utils/getListOfComponentsAndImports';
import { getPreviousStats } from './utils/getPreviousStats';
import { cleanup, getTempRepos } from './utils/getTempRepos';
import { preGenerateCleanup } from './utils/preGenerateCleanup';
import {
  adopters,
  adoptersSidebar,
  adoptersWithPillar,
  adoptionDocsDir,
  generatedDataDir,
  generatedStaticDataDir,
  hiddenAdoptersWithPillar,
} from './config';

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

async function generateAdoptionFiles() {
  return Promise.all(
    adopters.map(async (config) => {
      const previousStats = await getPreviousStats(config.id);
      const project = await new ProjectParser(config, previousStats).parse();
      await Promise.all([
        generateMdxFiles(project),
        generateAdoptersData(),
        generateHiddenAdoptersData(),
        generateAdoptersSidebarData(),
        generateAdopterComponentsData(project),
        generateAdopterStatsData(project),
        generateAdopterProjectInfoData(project),
      ]);
    }),
  );
}

async function main() {
  try {
    await preGenerateCleanup();
    await getTempRepos();
    // Required to associate adopters with their stats.json file for Adoption Overview page.
    await generateAdoptionFiles();
    await getListOfComponentsAndImports();
    cleanup();
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
