DEPENDENCIES = [
    "@npm//d3-array",
    "@npm//d3-scale",
    "@npm//d3-shape",
    "@npm//@types/react-is",
    "@npm//type-fest",
]

PEER_DEPENDENCIES = [
    "@npm//react",
]

TYPE_DEPENDENCIES = [
    "@npm//@types/d3-array",
    "@npm//@types/d3-scale",
    "@npm//@types/d3-shape",
    "@npm//@types/react",
]

BUILD_DEPENDENCIES = DEPENDENCIES + PEER_DEPENDENCIES + TYPE_DEPENDENCIES
