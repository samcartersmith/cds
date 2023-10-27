import fs from 'node:fs';
import path from 'node:path';

const LOTTIE_FILES_PATH = 'packages/lottie-files';
const IGNORE_FILES = ['basepackage', 'package', 'index'];

const rootPath = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT ?? '';
const fullLottieFilesPath = path.resolve(rootPath, LOTTIE_FILES_PATH);

export const lottieFiles = (() => {
  const lottiePath = (file: string) => path.join(fullLottieFilesPath, file, `${file}.json`);

  const files = fs.readdirSync(fullLottieFilesPath, { withFileTypes: true });
  const lottieFileNames = files
    .filter(
      (ent) =>
        ent.isDirectory() &&
        fs.existsSync(lottiePath(ent.name)) &&
        !IGNORE_FILES.includes(ent.name),
    )
    .map((ent) => ent.name);

  return lottieFileNames.map((src) => {
    const contents = fs.readFileSync(lottiePath(src), 'utf-8');
    const json = JSON.parse(contents) as {
      markers: {
        cm: string;
      }[];
    };

    const file = path.basename(src, 'json');
    const type = `${file.charAt(0).toUpperCase() + file.substring(1)}Lottie`;
    const markers = json.markers.map((marker) => marker.cm);

    return {
      dest: `${LOTTIE_FILES_PATH}/${file}/index.ts`,
      data: {
        file,
        type,
        markers,
      },
    };
  });
})();
