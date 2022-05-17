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
