load("//eng/shared/design-system/common:deps.bzl", package_common_deps = "BUILD_DEPENDENCIES")
load("//eng/shared/design-system/mobile:deps.bzl", package_mobile_deps = "BUILD_DEPENDENCIES")
load("//eng/shared/design-system/utils:deps.bzl", package_util_deps = "BUILD_DEPENDENCIES")
load("//eng/shared/design-system/web:deps.bzl", package_web_deps = "BUILD_DEPENDENCIES")

PACKAGES = [
    "common",
    "lottie-files",
    "mobile",
    "utils",
    "web",
]

ESLINT_DIRS = [
    "codegen",
    "codemod",
    "common",
    "mobile",
    "utils",
    "web",
]

STATIC_PACKAGES = [
    "fonts",
]

def uniq(data):
    uniq_values = []
    for val in data:
        if val not in uniq_values:
            uniq_values.append(val)
    return uniq_values

shared_deps = uniq(package_common_deps + package_util_deps)
cds_web_deps = uniq(shared_deps + package_web_deps)
cds_mobile_deps = uniq(shared_deps + package_mobile_deps)

def append_cds_web_deps(consumer_deps):
    return uniq(cds_web_deps + consumer_deps)

def append_cds_mobile_deps(consumer_deps):
    return uniq(cds_mobile_deps + consumer_deps)
