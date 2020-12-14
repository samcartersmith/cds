.PHONY: codegen

define HELP_TEXT
Help:
-----
  $$ make codegen             -- Generate code in design system.
endef
export HELP_TEXT

help:
	@echo "$$HELP_TEXT"

codegen:
	bazel run :codegen
