.PHONY: react

define HELP_TEXT
Help:
-----
  $$ make sync			-- Synchronize with CDS Icons figma
  $$ make react			-- Generate react components from svg icons in svg/
  $$ make lint			-- Run lint fix
endef
export HELP_TEXT

help:
	@echo "$$HELP_TEXT"

sync:
	npx ts-node ./sync.ts --files --project ../../../../tsconfig.json

react:
	bazel build :gen_react_icons

	rm -rf ./react
	cp -Rf ../../../../bazel-bin/eng/shared/design-system/icons/gen_react_icons/react .
	chmod -R u+w ./react

	bazel run :eslint_fix_tsx

lint:
	bazel run :eslint_fix_tsx
	bazel run :eslint_fix_ts
	bazel run :eslint_fix_mdx
