load("@npm//@babel/cli:index.bzl", "babel")
load("@build_bazel_rules_nodejs//:index.bzl", "pkg_npm")
load("//tools:def.bzl", "node_package_gen")

def cds_package(name, srcs, dependencies, peer_dependencies, monorepo_dependencies):
    package_source_path = "eng/shared/design-system/%s" % name

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
        args = [
            package_source_path,
            "--config-file ./$(execpath //eng/shared/design-system:babel.config.js)",
            "--out-dir $(@D)",
            "--extensions .ts,.tsx",
        ],
        data = [
            "//eng/shared/design-system/codegen:babel-plugins/linariaCssExtractPlugin.js",
            "//eng/shared/design-system/codegen:babel-plugins/linariaPreset.js",
            "//eng/shared/design-system:babel.config.js",
            "//eng/shared/design-system:linaria.config.js",
            "//:tsconfig.json",
            "@npm//@babel/preset-env",
            "@npm//@babel/preset-react",
            "@npm//@babel/preset-typescript",
            "@npm//babel-plugin-module-resolver",
            "@npm//babel-plugin-transform-async-to-promises",
            "@npm//chalk",
            "@npm//linaria",
            "@npm//source-map",
            "@npm//stylis",
            "@npm//yargs",
        ] + srcs,
        output_dir = True,
    )

    # Prepare a package for release by only copying files to publish
    pkg_npm(
        name = "package",
        srcs = [
            "CHANGELOG.md",
        ],
        deps = [
            ":lib",
            ":package_json",
        ] + srcs,
        visibility = ["//visibility:public"],
    )
