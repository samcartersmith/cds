import fs from 'node:fs';
import { getNxGraph } from './getNxGraph';

export async function getWorkspaceData() {
  const graph = await getNxGraph();
  return graph.nodes;
}

export async function getPublishableProjects() {
  const workspace = await getWorkspaceData();

  const filtered = Object.entries(workspace).filter(([, projectConfig]) => {
    const packageJsonPath = `${projectConfig.data.root}/package.json`;
    return !JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')).private;
  });

  return Object.fromEntries(filtered);
}
