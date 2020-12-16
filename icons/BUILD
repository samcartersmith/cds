load("@npm_bazel_typescript//:index.bzl", "ts_project")

filegroup(
    name = "svg_source",
    srcs = glob(
        include = [
            "svg/**/*.svg",
        ],
    ),
)

ts_project(
    srcs = ["scripts/iconReactTemplate.ts"],
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
        "--template $(execpath scripts/iconReactTemplate.js)",
        "-d $(@D)/src/components",
        "--config-file $(rootpath .svgrrc.js)",
        "$(execpaths :svg_source)",
    ],
    data = [
        ".svgrrc.js",
        "scripts/iconReactTemplate.js",
        "styles.css",
        ":svg_source",
        "//:.prettierrc",
        "//:tsconfig.json",
        "@npm//:node_modules",
    ],
    output_dir = True,
)

filegroup(
    name = "icons_story_source",
    srcs = glob(
        include = [
            "src/*",
            "src/components/**/*.tsx",
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
            "src/**/*",
            "styles.css",
        ],
    ),
    visibility = ["//visibility:public"],
)

filegroup(
    name = "eslint_source",
    srcs = glob(
        include = [
            "**/*.ts",
            "**/*.tsx",
            "**/*.js",
            "**/*.mdx",
        ],
    ),
    visibility = ["//visibility:public"],
)

filegroup(
    name = "style_source",
    srcs = glob(
        include = [
            "**/*.ts",
            "**/*.tsx",
            "**/*.css",
        ],
    ),
    visibility = ["//visibility:public"],
)
