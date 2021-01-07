.PHONY: codegen

define HELP_TEXT
Help:
-----
  $$ make codegen                  -- Generate code in design system.
  $$ make lint                     -- Run eslint on all sources.
  $$ make new.package name=<name>  -- Scaffold a new package with the defined name.
endef
export HELP_TEXT

help:
	@echo "$$HELP_TEXT"

codegen:
	bazel run :codegen
	bazel run :eslint_fix_icons

lint:
	bazel run :eslint_web;
	bazel run :eslint_icons;
	bazel run :eslint_other;

new.package:
	bazel run :new_package -- --root=$(PWD) --name=$(name)

sync.icons:
	bazel run :sync_icons
