.PHONY: story

codegen:
	npx ts-node --project ../../../../tsconfig.json -r tsconfig-paths/register ./scripts/codegen/typography.ts

stylelint:
	bazel run //:stylelint -- --report-needless-disables

story.serve:
	cd ../../../../; ./node_modules/.bin/start-storybook -p 9009 -s eng/shared/design-system/web/static -c eng/shared/design-system/web/.storybook

story.build:
	bazel build :storybook_build
