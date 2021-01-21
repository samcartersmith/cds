.PHONY: codegen story story.build story.serve eslint eslint.fix stylelint test.unit test.unit.watch package

codegen:
	npx ts-node --project ../../../../tsconfig.json --files -r tsconfig-paths/register ../codegen/main.ts

story:
	cd ../../../../; ./node_modules/.bin/start-storybook -p 9009 -s eng/shared/design-system/web/static -c eng/shared/design-system/web/.storybook

story.build:
	bazel build :storybook

story.serve:
	bazel run :storybook_server

lint:
	bazel run :eslint;
	bazel run :stylelint;

eslint:
	bazel run :eslint

eslint.fix:
	bazel run :eslint -- --fix

stylelint:
	bazel run :stylelint

# Run unit tests with Jest
test.unit:
	bazel test //eng/shared/design-system:unit_tests

test.unit.watch:
	cd ../../../../; ./node_modules/jest/bin/jest.js --projects eng/shared/design-system/web --watch;

package:
	bazel build :package

publish:
	assume-role development eng-ops && bazel run :corporate

publish.dev:
	assume-role development eng-ops && bazel run :development