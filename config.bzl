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

def append_cds_web_deps(consumer_deps):
    return ["@npm//@cbhq/cds-web"] + consumer_deps

def append_cds_mobile_deps(consumer_deps):
    return ["@npm//@cbhq/cds-mobile"] + consumer_deps
