import path from 'node:path';
import { $, argv } from 'zx'; // https://github.com/google/zx

const outputDirectory = 'prebuilds';
const { platform, profile, jsEngine, newArchEnabled = false } = argv;

export function getBuildInfo() {
  const kebabCaseId = `${platform}-${profile}-${jsEngine}${newArchEnabled ? '-newArch' : ''}`;
  const snakeCaseId = kebabCaseId.replaceAll('-', '_');
  const outputName = `${outputDirectory}/${kebabCaseId}`;
  const tarball = `${outputName}.tar.gz`;

  const ios = {
    tarball,
    bundleIdentifier: `com.ui-systems.${kebabCaseId}`,
    unzip: async function unzip() {
      await $`tar -zxvf ${tarball}`;
      await $`mv CDS.app ${outputName}.app`;
    },
  };

  const android = {
    zipFile: `${outputName}.zip`,
    packageIdentifier: `com.ui_systems.${snakeCaseId}`,
    apk: `${outputName}/binary.apk`,
    testApk: `${outputName}/testBinary.apk`,
    unzip: async function unzip() {
      await $`mkdir -p ${outputName}`;

      const testFolder = `${outputName}/androidTest/${profile}`;
      const buildFolder = `${outputName}/${profile}`;

      await $`tar -xf ${this.zipFile} -C ${outputName}`;
      await $`mv ${testFolder}/app-${profile}-androidTest.apk ${this.testApk}`;
      await $`mv ${buildFolder}/app-${profile}.apk ${this.apk}`;
      await $`rm -rf ${path.dirname(testFolder)} && rm -rf ${buildFolder}`;
    },
  };

  return {
    ios,
    android,
    outputDirectory,
  };
}
