import semver from 'semver';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { Tag } from '@cbhq/cds-web/tag/Tag';
import { TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';

import { type VersionInfoProps, type VersionMap, type VersionStatsProps } from './types';

function sanitizeVersion(version: string | undefined): string {
  let sanitizedVersion = version;
  if (version && version?.split(' ').length > 1) sanitizedVersion = version?.split(' ')[0];
  if (sanitizedVersion) return sanitizedVersion.replaceAll(/^[><=~^]/gm, '');
  return '';
}

export function getLowestVersion(
  cdsCommonVersion: string,
  cdsWebVersion: string,
  cdsMobileVersion: string,
): { lowestVersion: string | null; lowestOriginalVersion: string | null; type: string } {
  // Map of original versions
  const originalVersions: VersionMap = {
    common: cdsCommonVersion,
    web: cdsWebVersion,
    mobile: cdsMobileVersion,
  };

  // sanitized versions
  const sanitizedVersions: VersionMap = {
    common: sanitizeVersion(cdsCommonVersion),
    web: sanitizeVersion(cdsWebVersion),
    mobile: sanitizeVersion(cdsMobileVersion),
  };

  let lowestVersion: string | null = null;
  let lowestOriginalVersion: string | null = null;
  let lowestType: keyof VersionMap = 'common';

  Object.entries(sanitizedVersions).forEach(([type, version]) => {
    if (
      version &&
      semver.valid(version) &&
      (lowestVersion === null || semver.lt(version, lowestVersion))
    ) {
      lowestVersion = version;
      lowestOriginalVersion = originalVersions[type as keyof VersionMap];
      lowestType = type as keyof VersionMap;
    }
  });

  return { lowestVersion, lowestOriginalVersion, type: lowestType };
}

const renderPackages = (
  cdsCommonVersion: string,
  cdsWebVersion: string,
  cdsMobileVersion: string,
) => {
  const packageInfo = [
    { name: 'Common', version: cdsCommonVersion },
    { name: 'Web', version: cdsWebVersion },
    { name: 'Mobile', version: cdsMobileVersion },
  ];

  return (
    <VStack spacingTop={1}>
      {packageInfo.map(({ name, version }) => (
        <HStack key={name} gap={1} justifyContent="space-between">
          <TextLabel1 as="p">{name} Version:</TextLabel1>
          <TextLabel2 align="end" as="p">
            {version || 'Not Found'}
          </TextLabel2>
        </HStack>
      ))}
    </VStack>
  );
};

function VersionInfo({ name, version, tagLabel }: VersionInfoProps) {
  return (
    <HStack gap={1} justifyContent="space-between">
      <TextLabel1 as="p" overflow="truncate">
        {name}
      </TextLabel1>
      <TextLabel2 align="end" as="p">
        {version || 'Not Found'}{' '}
        {tagLabel &&
          (tagLabel === 'Up to Date' ? (
            <Tag colorScheme="blue" intent="informational">
              {tagLabel}
            </Tag>
          ) : (
            <Tag colorScheme="red" intent="informational">
              {tagLabel}
            </Tag>
          ))}
      </TextLabel2>
    </HStack>
  );
}

export function AdopterVersionCell({
  cdsCommonVersion,
  cdsWebVersion,
  cdsMobileVersion,
  cdsLatestVersion,
  latestCdsVersionPublished3MonthsAgo,
  upToDate,
}: VersionStatsProps) {
  const { lowestVersion } = getLowestVersion(cdsCommonVersion, cdsWebVersion, cdsMobileVersion);

  return (
    <VStack>
      <VersionInfo
        name="Project Version"
        tagLabel={upToDate ? 'Up to Date' : 'Outdated'}
        version={lowestVersion}
      />
      <VersionInfo name="CDS Latest" version={cdsLatestVersion} />
      <VersionInfo name="CDS 3 Months Ago" version={latestCdsVersionPublished3MonthsAgo} />
      {renderPackages(cdsCommonVersion, cdsWebVersion, cdsMobileVersion)}
    </VStack>
  );
}

AdopterVersionCell.displayName = 'AdopterVersionCell';
