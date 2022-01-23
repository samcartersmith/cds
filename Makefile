define HELP_TEXT
Help:
-----
  $$ make build.common              -- Build the `common` package.
  $$ make build.utils               -- Build the `utils` package.
  $$ make build.all                 -- Build all of the affected packages

  $$ make format.common             -- Format the `common` package.
  $$ make format.utils              -- Format the `utils` package.
  $$ make format.all                -- Format all of the affected packages

  $$ make lint.common               -- lint the `common` package.
  $$ make lint.utils                -- lint the `utils` package.
  $$ make lint                      -- lint all of the affected packages
  $$ make lint.fix                  -- lint all of the affected packages and fix errors

  $$ make test.common               -- test the `common` package.
  $$ make test.utils                -- test the `utils` package.
  $$ make test.all                  -- test all of the affected packages

  $$ make typecheck.common          -- typecheck the `common` package.
  $$ make typecheck.utils           -- typecheck the `utils` package.
  $$ make typecheck.all             -- typecheck all of the affected packages

endef
export HELP_TEXT

.PHONY: help
help:
	@echo "$$HELP_TEXT"

.PHONY: build.common
build.common:
	nx build common

.PHONY: build.utils
build.utils:
	nx build utils

.PHONY: build.all
build.all:
	nx affected --target=build --all

.PHONY: format.common
format.common:
	nx format common

.PHONY: format.utils
format.utils:
	nx format utils

.PHONY: format.all
format.all:
	nx affected --target=format --all

.PHONY: lint.common
lint.common:
	nx lint common

.PHONY: lint.utils
lint.utils:
	nx lint utils

.PHONY: lint
lint:
	nx affected --target=lint --all

.PHONY: lint.fix
lint.fix:
	nx affected --target=lint --all --fix

.PHONY: test.common
test.common:
	nx test common

.PHONY: test.utils
test.utils:
	nx test utils

.PHONY: test.all
test.all:
	nx affected --target=test --all

.PHONY: typecheck.common
typecheck.common:
	nx typecheck common

.PHONY: typecheck.utils
typecheck.utils:
	nx typecheck utils

.PHONY: typecheck.all
typecheck.all:
	nx affected --target=typecheck --all
