define HELP_TEXT
Help:
-----

  $$ make format.common             -- Format the `common` package.
  $$ make format.utils              -- Format the `utils` package.
  $$ make format.mobile             -- Format the `mobile` package.
  $$ make format.web                -- Format the `web` package.
  $$ make format.playground         -- Format the `mobile-playground` 
  $$ make format.website            -- Format the `website` 
  $$ make format.all                -- Format all of the affected packages

  $$ make lint.common               -- lint the `common` package.
  $$ make lint.utils                -- lint the `utils` package.
  $$ make lint.mobile               -- lint the `mobile` package.
  $$ make lint.web                  -- lint the `web` package.
  $$ make lint.website              -- lint the `website`. 
  $$ make lint                      -- lint all of the affected packages
  $$ make lint.fix                  -- lint all of the affected packages and fix errors

  $$ make stylelint.web             -- Stylelint web package
  $$ make stylelint.common          -- Stylelint common package
  $$ make stylelint.website         -- Stylelint website
  $$ make stylelint                 -- Stylelint all affected packages
  $$ make stylelint.fix             -- Stylelint and fix all affected packages

  $$ make test.common               -- test the `common` package.
  $$ make test.utils                -- test the `utils` package.
  $$ make test.mobile               -- test the `mobile` package.
  $$ make test.web                  -- test the `web` package.
  $$ make test.all                  -- test all of the affected packages

  $$ make typecheck.common          -- typecheck the `common` package.
  $$ make typecheck.utils           -- typecheck the `utils` package.
  $$ make typecheck.mobile          -- typecheck the `mobile` package.
  $$ make typecheck.web             -- typecheck the `web` package.
  $$ make typecheck.all             -- typecheck all of the affected packages

  $$ make start.story               -- Start storybook local dev server.
  $$ make build.story               -- Build storybook.

  $$ make start.website             -- Start website local dev server.
  $$ make build.website             -- Build website.

  $$ make clean.ios                 -- Clean ios build
  $$ make clean.android             -- Clean android build
  $$ make build.ios                 -- Build the playground ios app.
  $$ make build.android             -- Build the playground android app.

  $$ make build.fonts               -- Build the `fonts` package.
  $$ make build.common              -- Build the `common` package.
  $$ make build.mobile              -- Build the `mobile` package.
  $$ make build.web                 -- Build the `web` package.
  $$ make build.lottie              -- Build the `lottie` package.
  $$ make build.utils               -- Build the `utils` package.
  $$ make build.css                 -- Build the static css.
  $$ make build.all                 -- Build all packages.

  $$ make docgen                    -- Generate docs for CDS website.
  $$ make codegen                   -- Generate code in design system.
  $$ make prepare.icons             -- Prepare icons
  $$ make prepare.illustrations     -- Prepare illustrations
  $$ make mobile.routes             -- Create routes for mobile-playgrounds from screens directory.
  $$ make prepare.adoption          -- Prepare adoption numbers
  $$ make debug.adoption            -- Debug adoption tracker script
  $$ make release                   -- Automatically update CHANGELOG based on PR titles 

endef
export HELP_TEXT

.PHONY: help
help:
	@echo "$$HELP_TEXT"

.PHONY: format.common
format.common:
	nx format common

.PHONY: format.utils
format.utils:
	nx format utils

.PHONY: format.mobile
format.mobile:
	nx format mobile

.PHONY: format.web
format.web:
	nx format web

.PHONY: format.playground
format.playground:
	nx format mobile-playground

.PHONY: format.website
format.website:
	nx format website

.PHONY: format.all
format.all:
	nx affected --target=format --all

.PHONY: lint.common
lint.common:
	nx lint common

.PHONY: lint.utils
lint.utils:
	nx lint utils

.PHONY: lint.mobile
lint.mobile:
	nx lint mobile

.PHONY: lint.web
lint.web:
	nx lint web

.PHONY: lint.website
lint.website:
	nx lint website

.PHONY: lint
lint:
	nx affected --target=lint --all

.PHONY: lint.fix
lint.fix:
	nx affected --target=lint --all --fix


.PHONY: stylelint.common
stylelint.common:
	nx lint-styles common

.PHONY: stylelint.web
stylelint.web:
	nx lint-styles web

.PHONY: stylelint.website
stylelint.website:
	nx lint-styles website

.PHONY: stylelint
stylelint:
	nx affected --target=lint-styles --all

.PHONY: stylelint.fix
stylelint.fix:
	nx affected --target=lint-styles --all --fix



.PHONY: test.common
test.common:
	nx test common

.PHONY: test.utils
test.utils:
	nx test utils

.PHONY: test.mobile
test.mobile:
	nx test mobile

.PHONY: test.web
test.web:
	nx test web

.PHONY: test.all
test.all:
	nx affected --target=test --all

.PHONY: typecheck.common
typecheck.common:
	nx typecheck common

.PHONY: typecheck.utils
typecheck.utils:
	nx typecheck utils

.PHONY: typecheck.mobile
typecheck.mobile:
	nx typecheck mobile

.PHONY: typecheck.web
typecheck.web:
	nx typecheck web

.PHONY: typecheck.all
typecheck.all:
	nx affected --target=typecheck --all


.PHONY: build.story
build.story:
	nx run storybook:build

.PHONY: start.story
start.story:
	cd apps/storybook; yarn start-storybook; cd -;

.PHONY: build.website
build.website:
	nx run website:build

.PHONY: start.website
start.website:
	cd apps/website; yarn docusaurus start --port 3000; cd -;

.PHONY: clean.ios
clean.ios:
	nx run mobile-playground:ios --clean

.PHONY: clean.android
clean.android:
	nx run mobile-playground:android --clean

.PHONY: build.ios
build.ios:
	nx run mobile-playground:ios

.PHONY: build.android
build.android:
	nx run mobile-playground:android


.PHONY: build.common
build.common:
	nx run common:build

.PHONY: build.fonts
build.fonts:
	nx run fonts:build

.PHONY: build.mobile
build.mobile:
	nx run mobile:build

.PHONY: build.web
build.web:
	nx run web:build

.PHONY: build.lottie
build.lottie:
	nx run lottie-files:build

.PHONY: build.utils
build.utils:
	nx run utils:build

.PHONY: build.css
build.css: build.web build.fonts
	nx run web:build-css

.PHONY: build.all
build.all:
	nx affected --target=build --all


.PHONY: docgen
docgen:
	nx run codegen:docgen
	nx run website:lint --fix
	nx run website:format

.PHONY: codegen
codegen:
	nx run codegen:codegen
	nx run codegen:docgen
	nx affected --target=lint --all --skip-nx-cache --fix
	nx affected --target=format --all --skip-nx-cache
	nx affected --target=lint-styles --all --skip-nx-cache --fix

.PHONY: prepare.illustrations
prepare.illustrations:
	nx run codegen:build_illustrations
	make docgen

.PHONY: prepare.icons
prepare.icons:
	nx run codegen:sync_icons
	yarn svgo packages/codegen/icons/svg/*.svg --config=packages/codegen/configs/svgo.config.js
	nx run codegen:build_icons
	make docgen

.PHONY: mobile.routes
mobile.routes:
	nx run codegen:prepare_mobile_routes

.PHONY: prepare.adoption
prepare.adoption:
	nx run codegen:prepare_adoption 

.PHONY: debug.adoption
debug.adoption:
	nx run codegen:debug_adoption

.PHONY: release 
release:
	nx run codegen:release
	nx run codegen:changelog
	nx run codegen:contributing
	nx run codegen:docgen

	