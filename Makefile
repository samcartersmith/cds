define HELP_TEXT
Help:
-----
  $$ make build.common              -- Build the `common` package.
  $$ make build.fonts              	-- Build the `fonts` package.
  $$ make build.icons              	-- Build the `icons` package.
  $$ make build.mobile             	-- Build the `mobile` package.
  $$ make build.theme              	-- Build the `theme` package.
  $$ make build.utils              	-- Build the `utils` package.
  $$ make build.web              	-- Build the `web` package.
  $$ make test                     	-- Run web and mobile unit tests.
  $$ make test.mobile              	-- Run mobile unit tests.
  $$ make test.web                 	-- Run web unit tests.
  $$ make codegen			-- Generate code in design system.
  $$ make lint				-- Run eslint on all sources.
  $$ make new.package name=<name>	-- Scaffold a new package with the defined name.
  $$ make sync.icons			-- Synchronize icons with figma.
  $$ make start.story			-- Start storybook local dev server.
  $$ make start.website			-- Start docusaurus website.
  $$ make build.story			-- Build storybook.
  $$ make build.website			-- Build docusaurus website.
  $$ make serve.story			-- Serve storybook build locally.
  $$ make serve.website			-- Serve docusaurus website build locally.
  $$ make deploy.website			-- Deploy docusaurus website to cds.cbhq.net.
endef
export HELP_TEXT

.PHONY: help
help:
	@echo "$$HELP_TEXT"

.PHONY: build.common
build.common:
	bazel build common:package

.PHONY: build.fonts
build.fonts:
	bazel build fonts:package

.PHONY: build.icons
build.icons:
	bazel build icons:package

.PHONY: build.mobile
build.mobile:
	bazel build mobile:package

.PHONY: build.theme
build.theme:
	bazel build theme:package

.PHONY: build.utils
build.utils:
	bazel build utils:package

.PHONY: build.web
build.web:
	bazel build web:package

.PHONY: test
test:
	bazel test :unit_tests_web
	bazel test :unit_tests_mobile

.PHONY: test.mobile
test.mobile:
	bazel test :unit_tests_mobile

.PHONY: test.web
test.web:
	bazel test :unit_tests_web

.PHONY: codegen
codegen:
	bazel run :codegen
	bazel run :eslint_fix_icons

.PHONY: lint
lint:
	bazel run :eslint_codegen
	bazel run :eslint_codemod
	bazel run :eslint_common
	bazel run :eslint_icons
	bazel run :eslint_mobile
	bazel run :eslint_utils
	bazel run :eslint_web
	bazel run :stylelint

.PHONY: new.package
new.package:
	bazel run :new_package -- --root=$(PWD) --name=$(name)

.PHONY: sync.icons
sync.icons:
	bazel run :sync_icons

.PHONY: start.story
start.story:
	cd ../../../; npx start-storybook -p 9009 -c eng/shared/design-system/storybook/.storybook -s eng/shared/design-system/fonts

.PHONY: start.website
start.website:
	npx docusaurus start website

.PHONY: build.story
build.story:
	bazel build :storybook

.PHONY: build.website
build.website:
	bazel build website:build

.PHONY: serve.story
serve.story:
	bazel run :storybook_server

.PHONY: serve.website
serve.website:
	bazel run website:serve

.PHONY: deploy.website
deploy.website:
	bazel run website/cloud:deploy

.PHONY: setup.mobile
setup.mobile:
	cd ../../..; npx jetifier
	cd mobile-playground/ios; RN_PROJECT=cds pod install
	cd mobile-playground; RN_PROJECT=cds npx react-native link

.PHONY: start.mobile
start.mobile:
	cd mobile-playground; RN_PROJECT=cds npx react-native start --config ./metro.config.js --reset-cache

.PHONY: mobile.android
mobile.android:
	cd mobile-playground; RN_PROJECT=cds npx react-native run-android --no-jetifier

.PHONY: mobile.ios
mobile.ios:
	cd mobile-playground; RN_PROJECT=cds npx react-native run-ios

.PHONY: release
release:
	cd ../../..; npx ts-node eng/shared/design-system/codegen/scripts/prepareRelease.ts --project ./tsconfig.json
