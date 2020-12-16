.PHONY: react

define HELP_TEXT
Help:
-----
  $$ make sync			-- Synchronize with CDS Icons figma
  $$ make generate	-- Generate an icon font and TypeScript types
  $$ make react			-- Generate React components from svg icons
endef
export HELP_TEXT

help:
	@echo "$$HELP_TEXT"

sync:
	npx ts-node ./scripts/syncSvgs.ts --files --project ../../../../tsconfig.json

generate:
	npx ts-node --project ../../../../tsconfig.json -r tsconfig-paths/register ./scripts/genIcons.ts

react:
	bazel build :gen_react_icons

	rm -rf ./src/components
	cp -Rf ../../../../bazel-bin/eng/shared/design-system/icons/gen_react_icons/src/components ./src
	chmod -R u+w ./src/components

	bazel run //eng/shared/design-system:eslint_fix_icons
