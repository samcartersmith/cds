.PHONY: codegen story story.build stylelint

codegen:
	npx ts-node --project ../../../../tsconfig.json --files -r tsconfig-paths/register ./scripts/codegen/main.ts

story:
	cd ../../../../; ./node_modules/.bin/start-storybook -p 9009 -s eng/shared/design-system/web/static -c eng/shared/design-system/web/.storybook

story.build:
	bazel build :storybook

stylelint:
	bazel run //:stylelint -- --report-needless-disables

# Run unit tests with Jest
test.unit:
	cd ../../../../; ./node_modules/jest/bin/jest.js --projects eng/shared/design-system/web;

test.unit.watch:
	cd ../../../../; ./node_modules/jest/bin/jest.js --projects eng/shared/design-system/web --watch;
