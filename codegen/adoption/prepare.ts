import { writeFile } from '../utils/writeFile';
import { ProjectParser } from './parsers/ProjectParser';
import { adopters } from './config';
import { getTempRepos, cleanup } from './utils/getTempRepos';

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
