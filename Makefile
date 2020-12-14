.PHONY: codegen

define HELP_TEXT
Help:
-----
  $$ make codegen             -- Generate code in design system.
  $$ make lint             	  -- Run eslint on all sources.
endef
export HELP_TEXT

help:
	@echo "$$HELP_TEXT"

codegen:
	bazel run :codegen

lint:
	bazel run :eslint_web;
	bazel run :eslint_icons;
	bazel run :eslint_other;
