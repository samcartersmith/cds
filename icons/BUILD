load("@npm_bazel_typescript//:index.bzl", "ts_project")

filegroup(
    name = "svg_source",
    srcs = glob(
        include = [
            "svg/**/*.svg",
        ],
    ),
    visibility = ["//visibility:public"],
)

ts_project(
    srcs = ["iconReactTemplate.ts"],
    extends = ["//:tsconfig.json"],
    source_map = True,
    tsconfig = "//:tsconfig.json",
    deps = [
        "@npm//@babel/types",
        "@npm//@types/babel__template",
        "@npm//@types/node",
    ],
)

load("@npm//@svgr/cli:index.bzl", "svgr")

svgr(
    name = "gen_react_icons",
    args = [
        "--template $(execpath iconReactTemplate.js)",
        "-d $(@D)/react",
        "--config-file $(rootpath .svgrrc.js)",
        "$(execpaths :svg_source)",
    ],
    data = [
        ".svgrrc.js",
        "iconReactTemplate.js",
        "styles.css",
        ":svg_source",
        "//:.prettierrc",
        "//:tsconfig.json",
        "@npm//:node_modules",
    ],
    output_dir = True,
)

load("//tools/js:eslint_test.bzl", "eslint_test")
load("//tools/js:eslint_fix.bzl", "eslint_fix")

fileTypes = [
    "ts",
    "tsx",
    "mdx",
]

[
    filegroup(
        name = "eslint_source_" + fileType,
        srcs = glob(
            include = [
                "**/*." + fileType,
            ],
        ),
        visibility = ["//visibility:public"],
    )
    for fileType in fileTypes
]

[
    eslint_test(
        name = "eslint_" + fileType,
        sources = ":eslint_source_" + fileType,
    )
    for fileType in fileTypes
]

[
    eslint_fix(
        name = "eslint_fix_" + fileType,
        sources = ":eslint_source_" + fileType,
    )
    for fileType in fileTypes
]

filegroup(
    name = "icons_story_source",
    srcs = glob(
        include = [
            "Icon/**/*",
            "react/**/*.tsx",
            "story/**/*",
            "styles.css",
        ],
    ),
    visibility = ["//visibility:public"],
)

filegroup(
    name = "runtime_source",
    srcs = glob(
        [
            "Icon/*",
            "react/*",
            "styles.css",
        ],
    ),
    visibility = ["//visibility:public"],
)
