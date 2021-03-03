DEPENDENCIES = [
    "@npm//@popperjs/core",
    "@npm//destyle.css",
    "@npm//linaria",
    "@npm//lottie-web",
    "@npm//react-aria",
    "@npm//react-popper",
    "@npm//react-stately",
]

PEER_DEPENDENCIES = [
    "@npm//react",
    "@npm//react-dom",
]

BUILD_DEPENDENCIES = DEPENDENCIES + PEER_DEPENDENCIES + [
    "@npm//jest-canvas-mock",
]
