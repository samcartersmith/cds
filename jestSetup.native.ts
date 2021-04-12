// Add RN specific jest setup here

// Silence `useNativeDriver` warnings while testing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
