# Adoption Tracker

The Adoption Tracker allows us to view component level insight into CDS adoption.

## Overview

config - `apps/website/scripts/adoption/config.ts`

script - `apps/website/scripts/adoption/main.ts`

parsers - `apps/website/scripts/adoption/parsers/`

## Updating the Adoption Tracker

1. Run `yarn nx run website:adoption`. The result will output JSON files within the website directory
2. Commit the files using the following commit message convention: `[trivial] internal(AdoptionTracker): Update Adoption Tracker mm/dd/yyyy`
3. After you merge, manually deploy to `production::cds-docs` in [Codeflow](https://codeflow.cbhq.net/#/frontend/cds/commits) when the build finishes
4. Verify that the "Last Updated" date at the top of the [Adoption Tracker](https://cds.cbhq.net/adoption-tracker/retail-mobile/) pages is current

## Adding a Project

Add the project config to `apps/website/scripts/adoption/config.ts` and follow the above [update steps](#updating-the-adoption-tracker)
