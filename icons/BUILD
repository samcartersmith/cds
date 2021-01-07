filegroup(
    name = "svg_source",
    srcs = glob(
        include = [
            "svg/**/*.svg",
        ],
    ),
)

filegroup(
    name = "story_source",
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
    name = "web_source",
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
