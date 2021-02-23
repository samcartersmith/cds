load("@npm//@babel/cli:index.bzl", "babel")
load("@build_bazel_rules_nodejs//:index.bzl", "pkg_npm")
load("//tools:def.bzl", "node_package_gen")
load(":config.bzl", "uniq")

BABEL_ARGS = [
    "--config-file ./$(execpath //eng/shared/design-system:babel.config.js)",
    "--out-dir $(@D)",
    "--extensions .ts,.tsx",
    "--copy-files",
]

BABEL_DEPS = [
    "//eng/shared/design-system/codegen:babel-plugins/linariaCssExtractPlugin.js",
    "//eng/shared/design-system/codegen:babel-plugins/linariaPreset.js",
    "//eng/shared/design-system:.browserslistrc",
    "//eng/shared/design-system:babel.config.js",
    "//eng/shared/design-system:linaria.config.js",
    "//:tsconfig.json",
    "@npm//@babel/preset-env",
    "@npm//@babel/preset-react",
    "@npm//@babel/preset-typescript",
    "@npm//babel-plugin-module-resolver",
    "@npm//chalk",
    "@npm//source-map",
    "@npm//stylis",
    "@npm//yargs",
    "@npm//linaria",
]

def cds_package(name, srcs, dependencies, peer_dependencies, monorepo_dependencies):
    package_source_path = "eng/shared/design-system/%s" % name
    babel_data = uniq(BABEL_DEPS + srcs + dependencies + peer_dependencies)

    # Generate a package.json
    node_package_gen(
        name = "package_json",
        package_metadata = "basepackage.json",
        dependencies = dependencies,
        peer_dependencies = peer_dependencies,
        monorepo_dependencies = monorepo_dependencies,
    )

    # Compile source files with Babel
    babel(
        name = "lib",
        args = [package_source_path] + BABEL_ARGS,
        data = babel_data,
        output_dir = True,
    )

    babel(
        name = "esm",
        args = [package_source_path] + BABEL_ARGS,
        data = babel_data,
        output_dir = True,
    )

    # Prepare a package for release by only copying files to publish
    pkg_npm(
        name = "package",
        srcs = [
            "CHANGELOG.md",
            "README.md",
        ],
        deps = [
            ":lib",
            ":esm",
            ":package_json",
        ] + srcs,
        visibility = ["//visibility:public"],
    )
