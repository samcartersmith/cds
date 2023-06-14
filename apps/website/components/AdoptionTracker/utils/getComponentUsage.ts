/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { camelCase, upperFirst } from 'lodash';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';

import { adopters } from ':cds-website/data/__generated__/adoption/adopters';

import sidebarConfig from '../../../sidebar.config';
import type { Adopter, AdopterComponents } from '../types';

type ProjectProps = { id: Adopter };

// Get components for each project
const getComponents = (project: ProjectProps) => {
  return require(`@site/static/data/__generated__/adoption/${project.id}/components.json`) as AdopterComponents;
};

type SidebarItem = { label: string; items?: SidebarItem[] };
const config = sidebarConfig as unknown as {
  docs: SidebarItem[];
};

// A list of all components listed in the sidebar.config.js
const componentsList = config.docs.reduce((acc: string[], item) => {
  if (['Components', 'Abstract Components'].includes(item.label)) {
    item.items?.forEach((parent) => {
      if (parent.items) {
        parent.items.forEach((child) => {
          acc.push(upperFirst(camelCase(child.label)));
        });
      } else {
        acc.push(upperFirst(camelCase(parent.label)));
      }
    });
  }
  return acc;
}, []);

// A list of all components tracked in the adoption tracker
const components = adopters.reduce((acc, project) => {
  const projectComponents = getComponents(project);
  return acc.concat(projectComponents.cds);
}, [] as AdopterComponents['cds']);

// Get total instances for each component listed in the sidebar.config.js
export const getComponentInstances = () => {
  // Group components by name
  const groupedComponents = groupBy(components, 'name');
  // Get total instances for each component
  const componentInstances = toPairs(groupedComponents).map(([name, details]) => ({
    name,
    totalInstances: details.reduce((acc, { totalInstances }) => acc + totalInstances, 0),
  }));

  // Return a filtered list components not listed in the sidebar.config.js
  return componentInstances.filter((component) => componentsList?.includes(component.name));
};
