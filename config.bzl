load("@bazel_skylib//lib:collections.bzl", "collections")
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

STATIC_PACKAGES = [
    "fonts",
]

shared_deps = collections.uniq(package_common_deps + package_util_deps)
cds_web_deps = collections.uniq(shared_deps + package_web_deps)
cds_mobile_deps = collections.uniq(shared_deps + package_mobile_deps)

def append_cds_web_deps(consumer_deps):
    return collections.uniq(cds_web_deps + consumer_deps)

def append_cds_mobile_deps(consumer_deps):
    return collections.uniq(cds_mobile_deps + consumer_deps)
