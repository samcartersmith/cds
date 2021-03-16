DEPENDENCIES = [
    "@npm//@popperjs/core",
    "@npm//destyle.css",
    "@npm//framer-motion",
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

TYPE_DEPENDENCIES = [
    "@npm//@types/node",
    "@npm//@types/react",
    "@npm//@types/react-dom",
]

BUILD_DEPENDENCIES = DEPENDENCIES + PEER_DEPENDENCIES + TYPE_DEPENDENCIES + [
    "@npm//jest-canvas-mock",
]
