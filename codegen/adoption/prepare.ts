import fs from 'fs';
import { writeFile } from '../utils/writeFile';
import { ProjectParser } from './parsers/ProjectParser';
import { adopters } from './config';
import { getTempRepos, cleanup } from './utils/getTempRepos';
import { getSourcePath } from '../utils/getSourcePath';

async function preCleanup() {
  const [TEMP_DIR, RESULTS_DIR, DOCS_DIR, DOCS_DATA_DIR] = await Promise.all([
    getSourcePath('codegen/adoption/temp'),
    getSourcePath('codegen/adoption/results'),
    getSourcePath('website/docs/adoption-tracker'),
    getSourcePath('website/static/data/adoption'),
  ]);
  // Clear directories so we don't keep around any data we want to remove
  return Promise.all([
    fs.promises.rmdir(TEMP_DIR, { recursive: true }),
    fs.promises.rmdir(RESULTS_DIR, { recursive: true }),
    fs.promises.rmdir(DOCS_DIR, { recursive: true }),
    fs.promises.rmdir(DOCS_DATA_DIR, { recursive: true }),
  ]);
}

async function writeFiles(project: ProjectParser) {
  return Promise.all([
    writeFile({
      template: 'website/adoptionTracker.ejs',
      data: project,
      dest: `website/docs/adoption-tracker/${project.id}.mdx`,
    }),
    writeFile({
      dest: `codegen/adoption/results/${project.id}.json`,
      data: project.components,
    }),
    writeFile({
      dest: `website/static/data/adoption/${project.id}/components.json`,
      data: project.components,
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
    await Promise.all(
      adopters.map(async (config) => {
        const project = await new ProjectParser(config).parse();
        await writeFiles(project);
      }),
    );
    cleanup();
  } catch (err) {
    console.log(err?.message);
    cleanup();
  }
}

void prepare();
