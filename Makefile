define HELP_TEXT
Help:
-----
  $$ make build.icons              -- Build the `icons` package.
  $$ make build.theme              -- Build the `theme` package.
  $$ make build.utils              -- Build the `utils` package.
  $$ make codegen                  -- Generate code in design system.
  $$ make lint                     -- Run eslint on all sources.
  $$ make new.package name=<name>  -- Scaffold a new package with the defined name.
  $$ make sync.icons               -- Synchronize icons with figma.
  $$ make start.website						 -- Start docusaurus website.
  $$ make build.website						 -- Build docusaurus website.
  $$ make serve.website						 -- Serve docusaurus website build locally.
  $$ make deploy.website					 -- Deploy docusaurus website to cds.cbhq.net.
endef
export HELP_TEXT

.PHONY: help
help:
	@echo "$$HELP_TEXT"

.PHONY: build.icons
build.icons:
	bazel build icons:package

.PHONY: build.theme
build.theme:
	bazel build theme:package

.PHONY: build.utils
build.utils:
	bazel build utils:package

.PHONY: codegen
codegen:
	bazel run :codegen
	bazel run :eslint_fix_icons

.PHONY: lint
lint:
	bazel run :eslint_codegen
	bazel run :eslint_icons
	bazel run :eslint_theme
	bazel run :eslint_utils
	bazel run web:eslint

.PHONY: new.package
new.package:
	bazel run :new_package -- --root=$(PWD) --name=$(name)

.PHONY: sync.icons
sync.icons:
	bazel run :sync_icons

.PHONY: start.website
start.website:
	npx docusaurus start website

.PHONY: build.website
build.website:
	bazel build website:build

.PHONY: serve.website
serve.website:
	bazel run website:serve

.PHONY: deploy.website
deploy.website:
	bazel run website/cloud:deploy