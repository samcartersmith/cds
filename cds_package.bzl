load("//tools:def.bzl", "node_package_gen")
load("//tools/js:ts_package.bzl", "ts_package")
load(":config.bzl", "uniq")

BABEL_SRCS = [
    "//eng/shared/design-system/codegen:babel-plugins/linariaCssExtractPlugin.js",
    "//eng/shared/design-system/codegen:babel-plugins/linariaPreset.js",
    "//eng/shared/design-system:.babelrc.js",
    "//eng/shared/design-system:linaria.config.js",
    "@npm//chalk",
    "@npm//source-map",
    "@npm//yargs",
]

def cds_package(name, srcs, dependencies, peer_dependencies, type_dependencies = None, cds_dependencies = None):
    if not type_dependencies:
        type_dependencies = []

    if not cds_dependencies:
        cds_dependencies = []

    # External CDS package `package.json` labels that will be included as dependencies
    cds_package_json_labels = []

    # External CDS package TypeScript labels for type-checking against
    cds_external_types_labels = []

    for cds_name in cds_dependencies:
        cds_package_json_labels.append("//eng/shared/design-system/%s:package_json" % cds_name)

        if cds_name != "fonts":
            cds_external_types_labels.append("//eng/shared/design-system/%s:package_types" % cds_name)

    # Generate a package.json
    node_package_gen(
        name = "package_json",
        package_metadata = "basepackage.json",
        dependencies = dependencies,
        peer_dependencies = peer_dependencies,
        monorepo_dependencies = cds_package_json_labels,
    )

    # Transpile files with Babel and generate d.ts files with TypeScript
    ts_package(
        name = "package",

        # BUG: Needs to be fixed upstream in bazel typescript!
        srcs = native.glob(
            [
                "**/*.ts",
                "**/*.tsx",
                "**/*.json",
                "**/*.ttf",
            ],
            exclude = [
                "**/*.test.*",
                "**/*.stories.*",
                "**/__fixtures__/*",
                "**/__mocks__/*",
                "**/__tests__/*",
                "basepackage.json",
                "tsconfig.build.json",
            ],
        ),

        # Sources files to build or files to use for building
        data = srcs + BABEL_SRCS,

        # External project types and NPM types that must exist for typechecking
        deps = uniq(
            cds_external_types_labels +
            dependencies +
            peer_dependencies +
            type_dependencies,
        ),

        # Other files/targets required for package building
        package_json = ":package_json",
        tsconfig_path = ":tsconfig.build.json",
        relative_source_directory = ".",
        static_files = {
            ":CHANGELOG.md": "./CHANGELOG.md",
            ":README.md": "./README.md",
        },
    )
