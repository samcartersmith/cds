import fs from 'fs';
import path from 'path';

import { LottieSource } from '../common/types/LottieSource';

const LOTTIE_FILES_DIR = path.resolve(__dirname, '..', 'lottie-files');

export const lottieFiles = (() => {
  const lottiePath = (file: string) => path.join(LOTTIE_FILES_DIR, file, `${file}.json`);

  const files = fs.readdirSync(LOTTIE_FILES_DIR, { withFileTypes: true });
  const lottieFiles = files
    .filter(ent => ent.isDirectory() && fs.existsSync(lottiePath(ent.name)))
    .map(ent => ent.name);

  return lottieFiles.map(src => {
    const contents = fs.readFileSync(lottiePath(src), 'utf-8');
    const json = JSON.parse(contents) as LottieSource;

    const file = path.basename(src, 'json');
    const type = `${file.charAt(0).toUpperCase() + file.substring(1)}Lottie`;
    const markers = json.markers.map(marker => marker.cm);

    return {
      dest: `lottie-files/${file}/index.ts`,
      data: {
        file,
        type,
        markers,
      },
    };
  });
})();
