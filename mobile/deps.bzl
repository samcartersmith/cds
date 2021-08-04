DEPENDENCIES = [
    "@npm//lodash",
    "@npm//url-parse",
]

PEER_DEPENDENCIES = [
    "@npm//lottie-ios",
    "@npm//lottie-react-native",
    "@npm//react-native-linear-gradient",
    "@npm//react-native-navigation-bar-color",
    "@npm//react-native-svg",
    "@npm//react-native",
    "@npm//react",
    "@npm//react-native-inappbrowser-reborn",
]

TYPE_DEPENDENCIES = [
    "@npm//@types/lodash",
    "@npm//@types/react",
    "@npm//@types/react-native",
    "@npm//@types/url-parse",
]

BUILD_DEPENDENCIES = DEPENDENCIES + PEER_DEPENDENCIES + TYPE_DEPENDENCIES

CDS_DEPENDENCIES = [
    "//eng/shared/design-system/common:source",
    "//eng/shared/design-system/lottie-files:source",
    "//eng/shared/design-system/utils:source",
]
