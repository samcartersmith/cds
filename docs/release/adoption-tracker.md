## Adoption Tracker

### Overview

config - `packages/codegen/adoption/config.ts`

script - `packages/codegen/adoption/prepare.ts`

parser - `packages/codegen/adoption/parsers/Parser.ts`

### Adding a project

Add to `packages/codegen/adoption/config.ts` and run `yarn nx run codegen:adoption` and it will automatically be added to website

### Running the script

1. Run `yarn nx run codegen:adoption`

2. The result will be output to json files to codegen and website

3. Commit changes
