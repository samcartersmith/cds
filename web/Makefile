.PHONY: story

story:
	../../../../node_modules/.bin/start-storybook -p 9009 -s ./static

codegen:
	npx ts-node --project ../../../../tsconfig.json -r tsconfig-paths/register ./scripts/codegen/typography.ts

stylelint:
	bazel run //:stylelint -- --report-needless-disables