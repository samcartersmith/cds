# Adoption Tracker Development

> Release Instructions: For details on how to release, refer to the [Adoption Tracker Release Documentation](./release/adoption-tracker.md)

> For details regarding Adoption Tracker Config Modification: See [Adoption Tracker Config Docs](../adoption-tracker-config.md)

## Summary

The Adoption Tracker is a tool designed to:

- Provide insights at the component level for CDS adoption.
- Monitor project and product group adherence to the latest CDS versions.
- Analyze product component usage across projects.
- Track specific project adoption trends over time.
- Measure historical adoption rates.

### Key Components

The adoption tracker has three key components:

- **Script**: Automates the collection of component and product component data, clones projects to a temporary directory, parses repository data, and generates JSON files containing adoption statistics for each project.

- **Parsers**: Extract and compile project data from cloned repositories.

- **Website**: The user interface for the Adoption Tracker, displaying data from static JSON files produced by the script and parsers.

### Common File Paths

- Configurations: `apps/website/scripts/adoption/config.ts`
- Website Components: `apps/website/components/AdoptionTracker/AdoptionTrackerOverview.tsx`
- Script Entry: `apps/website/scripts/adoption/main.ts`
- Parsers Directory: `apps/website/scripts/adoption/parsers`

## Development Guide

### Quick Start Commands

```bash
# Generate project JSON and summary files
yarn nx run website:adoption

# Create the impact report (adoption percentage over time)
yarn nx run website:generateAdoptionAndImpactReports

# Launch the website locally
yarn nx run website:start
```

### Script

- To include a new project, add an entry in [`config.ts`](https://github.cbhq.net/frontend/cds/blob/master/apps/website/scripts/adoption/config.ts).
- Main entry point: [`main.ts`](https://github.cbhq.net/frontend/cds/blob/master/apps/website/scripts/adoption/main.ts).

**Key Functions:**

- `generateAdoptionFiles()`: Generates version data and project details.
- `ProjectParser`: Main parser creating JSON files from project data.

  - Noteworthy methods include `stats()` for populating `stats.json`, and `getPackageVersion()` for CDS package versioning.

  - `stats()` collects component % adoption stats, and versioning by parsing import statements / package.json. It holds the logic for checking if a project is up to date (within latest CDS version from 3 months ago).

  - `getPackageVersion()` extracts CDS package versions using a priority of dependency > peerDependency > resolutions > devDependency.

  - `components()` populates the `components.json` files for each project containing specific data such as sourceFiles, callSites, totalInstances, propsArray, etc. sorted by cds, presentational, and other.

  - `projectInfo()` returns the data such as pg/pillar, github, and other config file properties.

- `generateProductComponentData()`: Compiles product component data for display on the website.

  - Uses the previously generated files to aggregate component data based on config.

  - To aggregate overall summaries of the generated data, we use the `generateAdoptionAndImpactReports()` and `generateProductComponentsSummary()` which are both individual files at the top level of the generated files folder.

    - `generateAdoptionAndImpactReports()` contains a summary of CDS/Historical Adoption Over Time and Impact over Time

    - `generateProductComponentsSummary()` contains an aggregate of totalInstances, totalCallSites, and other product component data / versioning across all project.

- `generateCUJFiles()`: Method for generating all core user journey files
  - `generateMergedCUJStatsSummary`: Generates merged stats.json for CUJs
  - `generateCUJAverageReport`: Generates average adoption stats across all CUJs
  - `generateMergedCUJComponentSummary`: Generates merged components.json for CUJs

### Website

**Key Components:**

- `AdoptionTrackerOverview`: Displays project adoption scoreboard and adoption summary modules, pulling data from static files.

  - `getOverallStatsSummary` which pulls the aggregated CDS adoption stats for each product group (PG) and overall across all projects. We get the first entry of the summary and pass it to `VersionListModal` and `OverallStatsSummaryModal`.

- `HistoricalCharts`: Showcases historical adoption and impact data from `adoption_and_impact_reports` json.

  - Note: We use the `adoptionTrackerCSVDataExcludeOther` entry from our report data as we want to exclude the "Other" pillar from the config in our overall calculation. For data that includes the "Other" pillar, you can see `adoptionTrackerCSVData`.

- `AdoptionProductComponents`: Details on product components usage, utilizing `componentPatternsSummary` data.

- `CUJOverview` and `CUJDetails` for all CUJ specific pages. Pulls data from /cuj/ and /cuj/summary/.
