define HELP_TEXT
Help:
-----
  $$ make build.common              -- Build the `common` package.
  $$ make build.fonts               -- Build the `fonts` package.
  $$ make build.lottie              -- Build the `lottie-files` package.
  $$ make build.mobile              -- Build the `mobile` package.
  $$ make build.utils               -- Build the `utils` package.
  $$ make build.web                 -- Build the `web` package.
  $$ make build.css                 -- Build the fonts and css.
  $$ make build.packages            -- Build all packages.
  $$ make build.ios                 -- Build the playground ios app.
  $$ make build.android             -- Build the playground android app.
  $$ make test                      -- Run web and mobile unit tests.
  $$ make test.mobile               -- Run mobile unit tests.
  $$ make test.web                  -- Run web unit tests.
  $$ make docgen                    -- Generate docs for CDS website.
  $$ make codegen                   -- Generate code in design system.
  $$ make lint                      -- Run eslint on all sources.
  $$ make lint.fix                  -- Auto fixes lints issues
  $$ make start.story               -- Start storybook local dev server.
  $$ make start.website             -- Start docusaurus website.
  $$ make start.mobile              -- Start react native packager.
  $$ make build.story               -- Build storybook.
  $$ make build.website             -- Build docusaurus website.
  $$ make deploy.website            -- Deploy docusaurus website to cds.cbhq.net.
  $$ make deploy.website-dev        -- Deploy docusaurus website to cds-dev.cbhq.net.
  $$ make prepare.icons             -- Prepare icons
  $$ make prepare.illustrations     -- Prepare illustrations
  $$ make prepare.adoption          -- Prepare adoption numbers
  $$ make release                   -- Automatically update CHANGELOG based on PR titles
  $$ make typecheck                 -- Run global typecheck
  $$ make setup.mobile              -- Setup mobile dependencies
  $$ make clean.ios                 -- Clean ios build
endef
export HELP_TEXT

.PHONY: help
help:
	@echo "$$HELP_TEXT"

.PHONY: build.packages
build.packages:
	 make build.common
	 make build.fonts
	 make build.lottie
	 make build.mobile
	 make build.utils
	 make build.web

.PHONY: clean
clean:
	bazel clean --expunge

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

.PHONY: test.adoption
test.adoption:
	bazel test :unit_tests_adoption  --test_output=streamed

.PHONY: docgen
docgen:
	bazel run :docgen
	bazel run website:lint_fix

.PHONY: codegen
codegen:
	bazel run :codegen
	bazel run :docgen

.PHONY: lint
lint:
	bazel test codegen:lint
	bazel test codemod:lint
	bazel test common:lint
	bazel test lottie-files:lint
	bazel test mobile:lint
	bazel test utils:lint
	bazel test web:lint
	bazel test website:lint
	bazel test :stylelint

.PHONY: lint.fix
lint.fix:
	bazel run codegen:lint_fix
	bazel run codemod:lint_fix
	bazel run common:lint_fix
	bazel run lottie-files:lint_fix
	bazel run mobile:lint_fix
	bazel run utils:lint_fix
	bazel run web:lint_fix
	bazel run website:lint_fix

.PHONY: prepare.icons
prepare.icons:
	bazel run :sync_icons
	npx svgo codegen/icons/svg/*.svg --config=codegen/configs/svgo.config.js
	bazel run :build_icons
	make docgen

.PHONY: prepare.illustrations
prepare.illustrations:
	bazel run :build_illustrations
	make docgen

.PHONY: prepare.adoption
prepare.adoption:
	bazel run :prepare_adoption -- NODE_OPTIONS='--trace-deprecation --abort-on-uncaught-exception --max-old-space-size=4096' --tempDir=${MONOREPO_PATH}/eng/shared/design-system/codegen/adoption/temp

.PHONY: debug.adoption
debug.adoption:
	make prepare.adoption debug=1

.PHONY: start.story
start.story:
	bazel run :storybook_serve

.PHONY: start.website
start.website:
	bazel run website:docusaurus_serve

.PHONY: build.story
build.story:
	bazel build :storybook_build

.PHONY: build.website
build.website:
	bazel build website:docusaurus_build

.PHONY: deploy.website
deploy.website:
	bazel run website/cloud:deploy

.PHONY: deploy.website-dev
deploy.website-dev:
	bazel run website/cloud:deploy_dev

.PHONY: setup.mobile
setup.mobile:
	bazel run //eng/shared/design-system/mobile-playground:build_deps
	cd ../../..; npx jetifier
	cd mobile-playground/ios; RN_PROJECT=cds pod install
	cd mobile-playground; RN_PROJECT=cds npx react-native link

.PHONY: start.mobile
start.mobile:
	cd ../../..; LIVE_PACKAGES="cds-\w+" RN_PROJECT=cds npx react-native start --reset-cache

.PHONY: build.android
build.android:
	cd ../../..; RN_PROJECT=cds npx react-native run-android --no-jetifier

.PHONY: build.ios
build.ios:
	cd ../../..; RN_PROJECT=cds npx react-native run-ios --project-path ./eng/shared/design-system/mobile-playground/ios

.PHONY: clean.ios
clean.ios:
	rm -rf ~/Library/Developer/Xcode/DerivedData && rm -rf mobile-playground/ios/Pods && rm -rf mobile-playground/ios/build && rm -rf mobile-playground/ios/app.xc*

.PHONY: release
release:
	bazel run :release
	bazel run :changelog
	bazel run :docgen
	bazel run website:lint_fix


.PHONY: typecheck
typecheck:
	bazel test common:typecheck
	bazel test mobile:typecheck
	bazel test mobile-playground:typecheck
	bazel test web:typecheck
	bazel test website:typecheck

.PHONY: build.css
build.css:
	bazel build //eng/shared/design-system/cloud:web
