load("@build_bazel_rules_nodejs//:index.bzl", "pkg_npm")
load("//tools:def.bzl", "node_package_gen")

def cds_package_static(name, srcs):
    # Generate a package.json
    node_package_gen(
        name = "package_json",
        package_metadata = "basepackage.json",
        dependencies = [],
        peer_dependencies = [],
        monorepo_dependencies = [],
    )

    # Prepare a package for release by only copying files to publish
    pkg_npm(
        name = "package",
        srcs = [
            "CHANGELOG.md",
            "README.md",
        ],
        deps = [
            ":package_json",
        ] + srcs,
        visibility = ["//visibility:public"],
    )
