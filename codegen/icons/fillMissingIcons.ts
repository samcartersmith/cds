import { iconPixelSizes } from '../configs/iconConfig';
import { SizeMap } from './createIconSet';

export const fillMissingIcons = (nameSet: Set<string>, sizeMap: SizeMap) => {
  // Check for any missing sizes. If any name is missing for a given size,
  // than reference the glyph of the closest size, start with the largest
  // sibling and cycling upwards
  iconPixelSizes.forEach((size, sizeIndex) => {
    nameSet.forEach(name => {
      if (sizeMap[size][name]) {
        return;
      }

      let nextIndex = sizeIndex + 1;
      let nextSize = iconPixelSizes[nextIndex];

      while (!nextSize || !sizeMap[nextSize] || !sizeMap[nextSize][name]) {
        nextIndex += 1;

        if (nextIndex >= iconPixelSizes.length) {
          nextIndex = 0;
        }

        nextSize = iconPixelSizes[nextIndex];
      }

      sizeMap[size][name] = sizeMap[nextSize][name];
    });

    const mapSize = Object.keys(sizeMap[size]).length;

    if (mapSize !== nameSet.size) {
      console.error(
        `Glyph map "${size}" missing icons. Expected ${nameSet.size}, found ${mapSize}.`
      );
    }
  });
};
