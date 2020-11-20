load("//tools:def.bzl", "node_package_deployable")
load("@npm//ts-node:index.bzl", "ts_node")
load("@build_bazel_rules_nodejs//:index.bzl", "pkg_npm")
load("@npm_bazel_typescript//:index.bzl", "ts_project")
load("@npm//ttypescript:index.bzl", "ttsc")
load("//tools/js:eslint_test.bzl", "eslint_test")
load("//tools/js:stylelint_test.bzl", "stylelint_test")
load("//tools/js:node_package_gen.bzl", "node_package_gen")
load("@npm//@storybook/react:index.bzl", "build_storybook")
load("@npm//@babel/cli:index.bzl", "babel")
load("@npm//rollup:index.bzl", "rollup")

ts_project(
    name = "transpile_babel_plugin",
    srcs = glob(
        ["babel/**/*.ts"],
    ),
    source_map = True,
    tsconfig = "//:tsconfig.json",
    deps = [
        "@npm//@types/babel__core",
        "@npm//@types/node",
        "@npm//chalk",
        "@npm//linaria",
        "@npm//source-map",
        "@npm//stylis",
    ],
)

sourceFileTypes = [
    ".ts",
    ".tsx",
    ".js",
]

filegroup(
    name = "source",
    srcs = glob(
        ["src/**/*" + fileType for fileType in sourceFileTypes],
    ),
)

# Emit type declarations with path aliases transformed
ttsc(
    name = "typings",
    args = [
        "--project $(execpath tsconfig.build.json)",
        "--outDir $(@D)",
    ],
    data = [
        "tsconfig.build.json",
        ":source",
        "//:tsconfig.json",
        "@npm//@types/humps",
        "@npm//@types/react",
        "@npm//@zerollup/ts-transform-paths",
        "@npm//humps",
        "@npm//linaria",
    ],
    output_dir = True,
)

rollup(
    name = "dist",
    args = [
        "-c $(execpath rollup.config.js)",
        "-i eng/shared/design-system/web/src/index.ts",
        "-o $(@D)/index.js",
    ],
    data = [
        "basepackage.json",
        "linaria.config.js",
        "rollup.config.js",
        ":source",
        "//:tsconfig.json",
        ".babelrc.js",
        "//:babel.config.js",
        "@npm//@rollup/plugin-commonjs",
        "@npm//@rollup/plugin-node-resolve",
        "@npm//@types/react",
        "@npm//destyle.css",
        "@npm//linaria",
        "@npm//postcss-url",
        "@npm//react",
        "@npm//rollup-plugin-babel",
        "@npm//rollup-plugin-node-externals",
        "@npm//rollup-plugin-postcss",
        "@npm//rollup-plugin-terser",
        # babel config dependencies
        "@npm//yargs",
        "@npm//@babel/plugin-proposal-class-properties",
        "@npm//babel-plugin-module-resolver",
        "@npm//@babel/preset-env",
        "@npm//@babel/preset-react",
        "@npm//@babel/preset-typescript",
    ],
    output_dir = True,
)

load(":scripts/build/gen_babel_preset.bzl", "gen_babel_preset")

gen_babel_preset(
    name = "babel_preset",
    out = "preset",
)

babel(
    name = "lib",
    args = [
        "--config-file",
        "$(execpath //:babel.config.js)",
        "eng/shared/design-system/web/src",
        "--out-dir",
        "$(@D)",
        "--extensions .ts,.tsx",
        "--presets ./$(execpath :babel_preset)",
    ],
    data = [
        "linaria.config.js",
        ":babel_preset",
        ":source",
        ":transpile_babel_plugin",
        # only uses the root babel config and doesn't use the project babelrc
        # it passes the custom preset for linaria in the args
        "//:babel.config.js",
        "//:tsconfig.json",
        "@npm//@babel/plugin-proposal-class-properties",
        "@npm//@babel/plugin-transform-runtime",
        "@npm//@babel/preset-env",
        "@npm//@babel/preset-react",
        "@npm//@babel/preset-typescript",
        "@npm//babel-plugin-module-resolver",
        "@npm//linaria",
        "@npm//yargs",
    ],
    output_dir = True,
)

cds_dependencies = [
    "@npm//destyle.css",
    "@npm//linaria",
    "@npm//humps",
]

cds_peer_dependencies = [
    "@npm//react",
    "@npm//react-dom",
]

# Generate package.json file
node_package_gen(
    name = "package_json_gen",
    dependencies = cds_dependencies,
    package_metadata = "basepackage.json",
    peer_dependencies = cds_peer_dependencies,
)

pkg_npm(
    name = "package",
    srcs = [
        "README.md",
        "CHANGELOG.md",
    ] + glob(["static/**/*"]),
    deps = [
        ":dist",
        ":lib",
        ":package_json_gen",
        ":typings",
    ],
)

# Publishing to registry-npm-dev.cbhq.net
node_package_deployable(
    name = "cds_web_dev",
    pkg = "//eng/shared/design-system/web:package",
    target = "development",
)

# Publishing to registry-npm.cbhq.net
node_package_deployable(
    name = "cds_web",
    pkg = "//eng/shared/design-system/web:package",
    target = "corporate",
)

filegroup(
    name = "runtime_source",
    srcs = glob(
        [
            "src/**/*",
            "static/**/*",
            # for test only
            "internal/**/*",
        ],
        exclude = [
            "**/*.test.*",
        ],
    ),
    visibility = ["//visibility:public"],
)

filegroup(
    name = "lintable_source",
    srcs = glob(
        include = [
            "**/*.ts",
            "**/*.tsx",
            "**/*.js",
            "**/*.mdx",
        ],
        exclude = [
            ".storybook/**/*",
            # This root index.ts is only for npm package.
            # It should be ignore by mono/repo tsconfig. Otherwise, vscode auto import won't work correctly.
            "src/index.ts",
        ],
    ),
    visibility = ["//visibility:public"],
)

filegroup(
    name = "style_source",
    srcs = [
        ".stylelintrc.js",
        ".browserslistrc",
        ".babelrc.js",
        "//:babel.config.js",
    ] + glob(
        include = [
            "**/*.ts",
            "**/*.tsx",
            "**/*.css",
        ],
    ),
    visibility = ["//visibility:public"],
)

eslint_test(
    name = "eslint",
    sources = ":lintable_source",
)

stylelint_test(
    name = "stylelint",
    sources = ":style_source",
)

filegroup(
    name = "storybook_source",
    srcs = glob(
        include = [
            "src/**/*",
            "static/**/*",
            "internal/**/*",
            ".storybook/**/*",
        ],
    ),
    visibility = ["//visibility:public"],
)

build_storybook(
    name = "storybook",
    args = [
        "-c eng/shared/design-system/web/.storybook",
        "-s eng/shared/design-system/web/static",
        "-o $(@D)",
        "--no-dll",
    ],
    data = [
        ".babelrc.js",
        ":storybook_source",
        "//:babel.config.js",
        "//:package.json",
        "//:tsconfig.json",
        "//eng/shared/design-system/icons:icons_story_source",
        "@npm//@babel/core",
        "@npm//@babel/parser",
        "@npm//@babel/plugin-transform-runtime",
        "@npm//@babel/preset-env",
        "@npm//@babel/preset-react",
        "@npm//@babel/preset-typescript",
        "@npm//@storybook/addon-a11y",
        "@npm//@storybook/addon-actions",
        "@npm//@storybook/addon-backgrounds",
        "@npm//@storybook/addon-controls",
        "@npm//@storybook/addon-docs",
        "@npm//@storybook/addon-links",
        "@npm//@storybook/addon-toolbars",
        "@npm//@storybook/addon-viewport",
        "@npm//@storybook/addons",
        "@npm//@storybook/react",
        "@npm//@storybook/theming",
        "@npm//@svgr/core",
        "@npm//@types/babel__template",
        "@npm//@types/humps",
        "@npm//@types/react",
        "@npm//@types/react-dom",
        "@npm//@types/webpack-env",
        "@npm//babel-loader",
        "@npm//babel-plugin-module-resolver",
        "@npm//destyle.css",
        "@npm//dotenv-webpack",
        "@npm//html-webpack-plugin",
        "@npm//humps",
        "@npm//linaria",
        "@npm//react",
        "@npm//react-dom",
        "@npm//storybook-addon-designs",
        "@npm//tsconfig-paths-webpack-plugin",
        "@npm//typescript",
        "@npm//yargs",
    ],
    output_dir = True,
    visibility = ["//visibility:public"],
)

load("@npm//serve:index.bzl", "serve")

serve(
    name = "storybook_server",
    args = [
        "eng/shared/design-system/web/storybook",
        "-l 9000",
    ],
    data = [":storybook"],
)

filegroup(
    name = "tests_source",
    srcs = glob(
        [
            "**/*.test.ts",
            "**/*.test.tsx",
        ],
    ),
    visibility = ["//visibility:public"],
)

filegroup(
    name = "tests_configuration",
    srcs = [
        ".babelrc.js",
        "jest.config.js",
        "jestSetup.ts",
        "jestSetupAfterEnv.ts",
    ],
    visibility = ["//visibility:public"],
)
