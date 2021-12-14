import { StyleSheet } from 'react-native';

export const dotStyles = StyleSheet.create({
  dotRootContainerStyles: {
    width: '100%',
  },
});

export const getTransform = (translateValues: { translateX: number; translateY: number }) => {
  return {
    position: 'absolute',
    transform: [
      {
        translateX: translateValues.translateX,
      },
      {
        translateY: translateValues.translateY,
      },
    ],
  };
};
