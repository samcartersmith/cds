import fs from 'node:fs';
import path from 'node:path';

import { ProductComponentSummary } from '../../components/AdoptionTracker/types';

import { generatedStaticDataDir } from './config';

type ProductComponentEntry = {
  date: string;
  productComponent: string;
  totalInstances: number;
  relativeUsagePercent: number;
  totalInstanceAllEntries: number;
};

type StructuredData = {
  latest: ProductComponentEntry | null;
  previous: ProductComponentEntry[];
};

const componentPatternsSummaryPath = path.join(
  generatedStaticDataDir.absolutePath,
  'componentPatternsSummary.json',
);

export function generateJSONForProductComponentSummary() {
  const componentPatternsRaw = fs.readFileSync(componentPatternsSummaryPath, 'utf8');
  const componentPatternsSummary = JSON.parse(componentPatternsRaw) as Record<
    string,
    ProductComponentSummary
  >;

  const totalInstancesCount = Object.values(componentPatternsSummary).reduce(
    (acc, { totalInstances }) => acc + totalInstances,
    0,
  );

  const newEntries: ProductComponentEntry[] = Object.entries(componentPatternsSummary).map(
    ([componentName, data]) => ({
      date: new Date().toISOString(),
      productComponent: componentName,
      totalInstances: data.totalInstances,
      relativeUsagePercent: data.totalInstances / totalInstancesCount,
      totalInstanceAllEntries: totalInstancesCount,
    }),
  );

  for (const entry of newEntries) {
    const componentDirPath = path.resolve(
      generatedStaticDataDir.absolutePath,
      '../product-component',
      entry.productComponent,
    );

    fs.mkdirSync(componentDirPath, { recursive: true });

    const componentFilePath = path.join(componentDirPath, 'product_component_summary.json');

    let existingData: StructuredData = { latest: null, previous: [] };
    try {
      const rawData = fs.readFileSync(componentFilePath, 'utf8');
      existingData = JSON.parse(rawData) as StructuredData;
    } catch (error) {
      console.log(`No existing data found for ${entry.productComponent}, initializing.`);
    }

    // Update the previous entries logic accordingly
    const updatedData = {
      latest: entry,
      previous: existingData.latest
        ? [existingData.latest, ...existingData.previous]
        : existingData.previous, // If there's an existing latest, move it to the beginning of previous
    };

    fs.writeFileSync(componentFilePath, JSON.stringify(updatedData, null, 2));
  }
  console.log(
    'Individual product component folders and summary files have been created successfully.',
  );
}
