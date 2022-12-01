## Adoption Tracker

### Overview

config - `apps/website/scripts/adoption/config.ts`

script - `apps/website/scripts/adoption/main.ts`

parser - `apps/website/scripts/adoption/parsers/Parser.ts`

### Adding a project

Add to `apps/website/scripts/adoption/config.ts` and run `yarn nx run website:adoption` and it will automatically be added to website

### Running the script

1. Run `yarn nx run website:adoption`
2. The result will output JSON files within the website directory
3. Commit the files using the following commit message convention: `[trivial] internal(AdoptionTracker): Update Adoption Tracker <DATE>`
4. After you merge, manually deploy `corporate::cds-docs` via Codeflow
