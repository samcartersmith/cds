load("//tools:def.bzl", "node_package_deployable")
load("@npm//ts-node:index.bzl", "ts_node")
load("@build_bazel_rules_nodejs//:index.bzl", "pkg_npm")
load("@npm_bazel_typescript//:index.bzl", "ts_project")
load("//tools/js:eslint_test.bzl", "eslint_test")
load("//tools/js:stylelint_test.bzl", "stylelint_test")
load("@npm//@storybook/react:index.bzl", "build_storybook")

cds_dependencies = [
    "@npm//destyle.css",
    "@npm//linaria",
    "@npm//humps",
]

cds_peer_dependencies = [
    "@npm//react",
    "@npm//react-dom",
]

# Transpile typescript code and create declaration files
ts_project(
    srcs = glob(
        [
            "src/**/*",
        ],
        exclude = [
            "**/*.test.ts?(x)",
            "**/*.stories.mdx",
        ],
    ),
    declaration = True,
    extends = [
        "//:tsconfig.json",
    ],
    source_map = False,
    # We still need this file because @bazel/typescript version is not up to date
    # and there is no way for us to use ts_project without tsconfig file
    # and you can't use cli args to override otherwise bazel throws an error
    tsconfig = "tsconfig.json",
    deps = [
        "@npm//@types/react",
        "@npm//@types/humps",
    ] + cds_dependencies + cds_peer_dependencies,
)

# Generate package.json file
ts_node(
    name = "package_json_gen",
    outs = ["package.json"],
    args = [
        "-T $(execpath scripts/genPackageJson.ts)",
        "--baseFile $(execpath basepackage.json)",
        "--rootFile $(execpath //:package.json)",
        "--outputFile $(@)",
        "--prettierConfig $(execpath //:.prettierrc)",
    ] + [
        "--deps",
        ",".join(cds_dependencies),
    ] + [
        "--peerDeps",
        ",".join(cds_peer_dependencies),
    ],
    data = [
        "scripts/genPackageJson.ts",
        "basepackage.json",
        "//tools/js:writePrettyFile.ts",
        "//:package.json",
        "//:.prettierrc",
        "@npm//yargs",
        "@npm//prettier",
        "@npm//chalk",
    ] + cds_dependencies + cds_peer_dependencies,
)

pkg_npm(
    name = "cds_web_package",
    srcs = [
        "README.md",
    ],
    deps = [
        ":package.json",
        ":tsconfig",
    ],
)

# Publishing to registry-npm-dev.cbhq.net
node_package_deployable(
    name = "cds_web_dev",
    pkg = "//eng/shared/design-system/web:cds_web_package",
    target = "development",
)

# Publishing to registry-npm.cbhq.net
node_package_deployable(
    name = "cds_web",
    pkg = "//eng/shared/design-system/web:cds_web_package",
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
        ],
    ),
    visibility = ["//visibility:public"],
)

filegroup(
    name = "style_source",
    srcs = [
        ".stylelintrc.js",
        ".browserslistrc",
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
        "jest.config.js",
        "jestSetup.ts",
        "jestSetupAfterEnv.ts",
    ],
    visibility = ["//visibility:public"],
)
