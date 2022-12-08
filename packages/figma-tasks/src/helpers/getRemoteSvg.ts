import { downloadImage } from '@cbhq/figma-api';

export async function getRemoteSvg(remoteUrl: string) {
  try {
    const buffer = await downloadImage(remoteUrl);
    const svgContent = buffer.toString();
    return svgContent.replaceAll('\n', '');
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
  return undefined;
}
