load("@npm//@babel/cli:index.bzl", "babel")
load("@build_bazel_rules_nodejs//:index.bzl", "pkg_npm")
load("//tools:def.bzl", "node_package_deployable", "node_package_gen")

def cds_package(name, srcs, dependencies, peer_dependencies, monorepo_dependencies):
    package_source_path = "eng/shared/design-system/%s" % name

    package_label_path = "//%s" % package_source_path

    deploy_label = "%s:package" % package_label_path

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
            "--config-file",
            "$(execpath //:babel.config.js)",
            package_source_path,
            "--out-dir",
            "$(@D)",
            "--extensions .ts,.tsx",
        ],
        data = [
            "//:babel.config.js",
            "//:tsconfig.json",
            "@npm//@babel/preset-env",
            "@npm//@babel/preset-react",
            "@npm//@babel/preset-typescript",
            "@npm//babel-plugin-module-resolver",
            "@npm//babel-plugin-transform-async-to-promises",
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
    )

    # Publish to development
    node_package_deployable(
        name = "publish_dev",
        pkg = deploy_label,
        target = "development",
    )

    # Publish to corporate
    node_package_deployable(
        name = "publish",
        pkg = deploy_label,
        target = "corporate",
    )
