define HELP_TEXT
Help:
-----
  $$ make build.common              -- Build the `common` package.
  $$ make build.fonts               -- Build the `fonts` package.
  $$ make build.lottie              -- Build the `lottie-files` package.
  $$ make build.mobile              -- Build the `mobile` package.
  $$ make build.theme               -- Build the `theme` package.
  $$ make build.utils               -- Build the `utils` package.
  $$ make build.web                 -- Build the `web` package.
  $$ make test                      -- Run web and mobile unit tests.
  $$ make test.mobile               -- Run mobile unit tests.
  $$ make test.web                  -- Run web unit tests.
  $$ make docgen                    -- Generate docs for CDS website.
  $$ make codegen                   -- Generate code in design system.
  $$ make lint                      -- Run eslint on all sources.
  $$ make new.package name=<name>   -- Scaffold a new package with the defined name.
  $$ make start.story               -- Start storybook local dev server.
  $$ make start.website             -- Start docusaurus website.
  $$ make build.story               -- Build storybook.
  $$ make build.website             -- Build docusaurus website.
  $$ make serve.story               -- Serve storybook build locally.
  $$ make serve.website             -- Serve docusaurus website build locally.
  $$ make deploy.website            -- Deploy docusaurus website to cds.cbhq.net.
  $$ make deploy.website-dev        -- Deploy docusaurus website to cds-dev.cbhq.net.
  $$ make prepare.icons             -- Prepare icons
  $$ make prepare.illustrations     -- Prepare illustrations
  $$ make lint.fix                  -- Auto fixes lints issues
  $$ make release                   -- Automatically update CHANGELOG based on PR titles
  $$ make typecheck                 -- Run global typecheck
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

.PHONY: build.lottie
build.lottie:
	bazel build lottie-files:package

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
	bazel test :unit_tests_mobile --test_output=streamed

.PHONY: test.web
test.web:
	bazel test :unit_tests_web --test_output=streamed

.PHONY: docgen
docgen:
	bazel run :docgen

.PHONY: codegen
codegen:
	bazel run :codegen
	bazel run :docgen

.PHONY: lint
lint:
	bazel run :eslint_codegen
	bazel run :eslint_codemod
	bazel run :eslint_common
	bazel run :eslint_mobile
	bazel run :eslint_utils
	bazel run :eslint_web
	bazel run :stylelint

.PHONY: lint.fix
lint.fix:
	bazel run :eslint_fix_codegen
	bazel run :eslint_fix_codemod
	bazel run :eslint_fix_common
	bazel run :eslint_fix_mobile
	bazel run :eslint_fix_utils
	bazel run :eslint_fix_web

.PHONY: new.package
new.package:
	bazel run :new_package -- --root=$(PWD) --name=$(name) --description=${description}

.PHONY: prepare.icons
prepare.icons:
	bazel run :sync_icons
	npx svgo codegen/icons/svg/*.svg --config=codegen/icons/svgo.config.js
	bazel run :build_icons

.PHONY: prepare.illustrations
prepare.illustrations:
	bazel run :build_illustrations

.PHONY: start.story
start.story:
	cd ../../../; npx start-storybook -p 9009 -c eng/shared/design-system/storybook/.storybook -s eng/shared/design-system/fonts

.PHONY: start.website
start.website:
	yarn docusaurus start eng/shared/design-system/website

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

.PHONY: deploy.website-dev
deploy.website-dev:
	bazel run website/cloud:deploy_dev

.PHONY: setup.mobile
setup.mobile:
	cd ../../..; npx jetifier
	cd mobile-playground/ios; RN_PROJECT=cds pod install
	cd mobile-playground; RN_PROJECT=cds npx react-native link

.PHONY: start.mobile
start.mobile:
	cd mobile-playground; RN_PROJECT=cds npx react-native start --config ./metro.config.js --reset-cache

.PHONY: build.android
build.android:
	cd mobile-playground; RN_PROJECT=cds npx react-native run-android --no-jetifier

.PHONY: build.ios
build.ios:
	cd mobile-playground; RN_PROJECT=cds npx react-native run-ios

.PHONY: clean.ios
clean.ios:
	rm -rf ~/Library/Developer/Xcode/DerivedData && rm -rf mobile-playground/ios/Pods && rm -rf mobile-playground/ios/build && rm -rf mobile-playground/ios/app.xc*

.PHONY: release
release:
	bazel run :release

.PHONY: typecheck
typecheck:
	bazel run //:typecheck
