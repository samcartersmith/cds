DEPENDENCIES = [
    "@npm//@popperjs/core",
    "@npm//framer-motion",
    "@npm//focus-visible",
    "@npm//linaria",
    "@npm//lottie-web",
    "@npm//react-popper",
    "@npm//reakit",
]

PEER_DEPENDENCIES = [
    "@npm//react",
    "@npm//react-dom",
]

TYPE_DEPENDENCIES = [
    "@npm//@types/node",
    "@npm//@types/react",
    "@npm//@types/react-dom",
]

BUILD_DEPENDENCIES = DEPENDENCIES + PEER_DEPENDENCIES + TYPE_DEPENDENCIES + [
    "@npm//jest-canvas-mock",
]

CDS_DEPENDENCIES = [
    "//eng/shared/design-system/common:source",
    "//eng/shared/design-system/utils:source",
]
