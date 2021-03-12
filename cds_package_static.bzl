load("@build_bazel_rules_nodejs//:index.bzl", "pkg_npm")
load("//tools:def.bzl", "node_package_gen")
load("@bazel_tools//tools/build_defs/pkg:pkg.bzl", "pkg_tar")

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
        name = "package_copy",
        srcs = [
            "CHANGELOG.md",
            "README.md",
        ],
        deps = [
            ":package_json",
        ] + srcs,
        visibility = ["//visibility:public"],
    )

    # Wrap the package in a tarball
    pkg_tar(
        name = "package",
        srcs = ["package_copy"],
        extension = "tar.gz",
        strip_prefix = "package_copy",
        visibility = ["//visibility:public"],
    )
