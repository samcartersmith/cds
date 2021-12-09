load("//tools/js:deps.bzl", _storybook_deps = "STORYBOOK_DEPS")
load("//eng/shared/design-system/web:deps.bzl", "DEPS", "DEV_DEPS", "PEER_DEPS")

STORYBOOK_DEPS = DEPS + DEV_DEPS + PEER_DEPS + [
    "@npm//@cbhq/cds-common",
    "@npm//@cbhq/cds-fonts",
    "@npm//@cbhq/cds-web",
    "@npm//@cbhq/cds-utils",
    "@npm//@cbhq/jest-utils",
    "@npm//react-router-dom",
    "@npm//typescript",
] + _storybook_deps
