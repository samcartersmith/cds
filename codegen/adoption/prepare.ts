import fs from 'fs';
import { writeFile } from '../utils/writeFile';
import { ProjectParser } from './parsers/ProjectParser';
import { adopters } from './config';
import { getTempRepos, cleanup } from './utils/getTempRepos';
import { getPreviousStats } from './utils/getPreviousStats';
import { getSourcePath } from '../utils/getSourcePath';

async function preCleanup() {
  const [TEMP_DIR, DOCS_DIR, DOCS_DATA_DIR] = await Promise.all([
    getSourcePath('codegen/adoption/temp'),
    getSourcePath('website/docs/adoption-tracker'),
    getSourcePath('website/static/data/adoption'),
  ]);
  // Clear directories so we don't keep around any data we want to remove
  return Promise.all([
    fs.promises.rmdir(TEMP_DIR, { recursive: true }),
    fs.promises.rmdir(DOCS_DIR, { recursive: true }),
    fs.promises.rmdir(DOCS_DATA_DIR, { recursive: true }),
  ]);
}

async function writeFiles(project: ProjectParser) {
  const components = JSON.stringify(project.components);
  const stats = JSON.stringify(project.stats);

  return Promise.all([
    writeFile({
      template: 'website/adoptionTracker.ejs',
      data: project,
      dest: `website/docs/adoption-tracker/${project.id}.mdx`,
    }),
    writeFile({
      dest: `codegen/adoption/results/${project.id}.json`,
      data: components,
    }),
    writeFile({
      dest: `codegen/adoption/results/${project.id}-stats.json`,
      data: stats,
    }),
    writeFile({
      dest: `website/static/data/adoption/${project.id}/components.json`,
      data: components,
      config: {
        disablePrettier: true,
      },
    }),
    writeFile({
      dest: `website/static/data/adoption/${project.id}/stats.json`,
      data: stats,
      config: {
        disablePrettier: true,
      },
    }),
    writeFile({
      dest: `website/static/data/adoption/${project.id}/project.json`,
      data: project.projectInfo,
      config: {
        disablePrettier: true,
      },
    }),
  ]);
}

async function prepare() {
  try {
    await preCleanup();
    await getTempRepos();
    // Required to associate adopters with their stats.json file for Adoption Overview page.
    await writeFile({
      template: 'objectMap.ejs',
      data: { adopters: adopters.map((item) => item.id) },
      dest: `website/data/adopters.ts`,
    });
    await Promise.all(
      adopters.map(async (config) => {
        const previousStats = await getPreviousStats(config.id);
        const project = await new ProjectParser(config, previousStats).parse();
        await writeFiles(project);
      }),
    );
    cleanup();
  } catch (err) {
    if (err instanceof Error) {
      console.log(err?.message);
      cleanup();
    } else {
      throw err;
    }
  }
}

void prepare();
