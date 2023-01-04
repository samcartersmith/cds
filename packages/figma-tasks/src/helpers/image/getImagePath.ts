export type ImageCategory = 'light' | 'dark' | 'themeable';

export type GetImagePathParams = {
  directory: string;
  format: string;
  category?: ImageCategory;
  imageName: string;
  version: {
    previous: number;
    next: number;
  };
};

export function getImagePath({
  category,
  directory,
  imageName,
  format,
  version,
}: GetImagePathParams) {
  let oldFilePath = category
    ? `${directory}/${category}/${imageName}`
    : `${directory}/${imageName}`;

  let newFilePath = oldFilePath;

  if (version) {
    oldFilePath = `${oldFilePath}-${version.previous}`;
    newFilePath = `${newFilePath}-${version.next}`;
  }

  return {
    oldFilePath: `${oldFilePath}.${format}`,
    newFilePath: `${newFilePath}.${format}`,
  };
}
