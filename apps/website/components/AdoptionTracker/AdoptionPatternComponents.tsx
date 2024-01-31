/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable global-require */
import { memo, useCallback, useState } from 'react';
import { ListCell } from '@cbhq/cds-web/cells';
import { Icon } from '@cbhq/cds-web/icons';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import {
  Link,
  TextBody,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextTitle3,
} from '@cbhq/cds-web/typography';

import { BetaCell } from '../BetaCell';
import { SplitScreenStack } from '../SplitScreenStack';

import type { PatternComponentSummary } from './types';

type AdoptionPatternComponentReport = Record<string, PatternComponentSummary>;

type AdoptionPatternComponentsListCell = {
  id: string;
  isActive: boolean;
  componentDetails: PatternComponentSummary;
  onPress: (id: string) => void;
  index: number;
  style?: React.CSSProperties;
};

const OVERALL_COMPONENT_PATTERN_SUMMARY =
  require(`@site/static/data/__generated__/adoption/componentPatternsSummary.json`) as AdoptionPatternComponentReport;

const innerCellSpacing = { spacingHorizontal: 1 } as const;
const outerCellSpacing = { spacingHorizontal: 2, spacingEnd: 4 } as const;

export const PatternComponentStatsBreakdownCell = memo(
  ({
    title,
    detail,
    url,
  }: {
    title: string;
    detail: number | string | undefined;
    url?: string;
  }) => {
    return (
      <HStack gap={4} justifyContent="space-between" spacingTop={1}>
        <TextLabel1 as="p">{title}</TextLabel1>
        {url ? (
          <Link href={url}>
            <TextLabel2 align="end" as="p" dangerouslySetColor="blue">
              {detail}
            </TextLabel2>
          </Link>
        ) : (
          <TextLabel2 align="end" as="p">
            {detail}
          </TextLabel2>
        )}
      </HStack>
    );
  },
);

export const processPackagePath = (packagePath: string): string => {
  const keyPhrase = '@cbhq/adoption/';
  const keyPhraseIndex = packagePath.indexOf(keyPhrase);

  if (keyPhraseIndex !== -1) {
    return packagePath.substring(keyPhraseIndex + keyPhrase.length);
  }
  return packagePath;
};

export const processGithubURL = (path: string): string => {
  const pathParts = path.split('/');

  // Extract the 'org/repo'
  const orgRepo = pathParts.slice(0, 2).join('/');

  const restOfPath = pathParts.slice(2).join('/');
  const githubURL = `https://github.cbhq.net/${orgRepo}/blob/master/${restOfPath}`;
  return githubURL;
};

const truncatePath = (path: string) => {
  const parts: string[] = path.split('/');
  return parts[parts.length - 1];
};

const PatternComponentSummaryInfo = memo(
  ({ component }: { component: PatternComponentSummary }) => {
    return (
      <VStack>
        <PatternComponentStatsBreakdownCell
          detail={component.totalInstances}
          title="Total instances"
        />
        <PatternComponentStatsBreakdownCell
          detail={component.totalCallSites}
          title="Total call sites"
        />
        <PatternComponentStatsBreakdownCell
          detail={component.config.owningTeam}
          title="Owning team"
        />

        <PatternComponentStatsBreakdownCell
          detail={component.cdsVersion?.lowestVersion}
          title="CDS version"
        />
        <PatternComponentStatsBreakdownCell
          detail={processPackagePath(component.config.packagePath)}
          title="Full path"
        />
        <PatternComponentStatsBreakdownCell
          detail="See Repo"
          title="Repo"
          url={processGithubURL(processPackagePath(component.config.packagePath))}
        />
        {component.config.doc !== undefined ? (
          <PatternComponentStatsBreakdownCell
            detail="See Documentation"
            title="Docs"
            url={component.config.doc}
          />
        ) : null}
      </VStack>
    );
  },
);

const DetailedPatternComponentBreakdown = memo(
  ({ component }: { component: PatternComponentSummary }) => {
    const { components } = component;

    const [activeFile, setActiveFile] = useState<string | null>(null);

    const handleOnClick = useCallback((file: string) => {
      setActiveFile((currentActiveFile) => (currentActiveFile === file ? null : file));
    }, []);

    // Check if any component has callSites
    const hasCallSites = components.some(
      (entry) => entry.callSites && Object.keys(entry.callSites).length > 0,
    );

    const aggregateData = components.map((entry) => {
      const fileProps: Record<string, { propKey: string; count: number }[]> = {};
      const entryTotalCallSites = entry.totalCallSites;
      Object.entries(entry.propsWithCallSites).forEach(([propKey, callSites]) => {
        Object.entries(callSites).forEach(([file, count]) => {
          if (!fileProps[file]) {
            fileProps[file] = [];
          }
          fileProps[file].push({ propKey, count });
        });
      });

      return { fileProps, entryTotalCallSites };
    });

    return (
      <VStack spacingVertical={1}>
        {hasCallSites && <TextHeadline as="p">Call sites</TextHeadline>}
        {hasCallSites &&
          components.map((entry) => (
            <VStack key={`component-${entry.name}`}>
              {entry.callSites && Object.keys(entry.callSites).length > 0 && (
                <>
                  {Object.entries(entry.callSites).map(([callSiteFile, count]) => (
                    <>
                      <BetaCell
                        key={`callsite-${callSiteFile}`}
                        end={<TextLabel2 as="p">{count} instance(s)</TextLabel2>}
                        endAccessory={<Icon color="foregroundMuted" name="caretDown" size="s" />}
                        offsetHorizontal={1}
                        onPress={() => handleOnClick(`callsite-${callSiteFile}`)}
                        priority="start"
                        start={<TextLabel2 as="p">{truncatePath(callSiteFile)}</TextLabel2>}
                      />
                      {activeFile === `callsite-${callSiteFile}` && (
                        <VStack key={`props-${callSiteFile}`} spacingVertical={1}>
                          <TextLabel2 as="p">File Path: {callSiteFile}</TextLabel2>
                        </VStack>
                      )}
                    </>
                  ))}
                </>
              )}
            </VStack>
          ))}

        <TextHeadline as="p" spacingTop={1}>
          Props with call sites
        </TextHeadline>
        {aggregateData.flatMap((fileData, fileDataIndex) =>
          Object.entries(fileData.fileProps).map(([file, props]) => [
            <BetaCell
              key={`file-${fileDataIndex}`}
              end={<TextLabel2 as="p">{fileData.entryTotalCallSites} instance(s)</TextLabel2>}
              endAccessory={<Icon color="foregroundMuted" name="caretDown" size="s" />}
              offsetHorizontal={1}
              onPress={() => handleOnClick(file)}
              priority="start"
              start={<TextLabel2 as="p">{truncatePath(file)}</TextLabel2>}
            />,
            activeFile === file && (
              <VStack key={`props-${fileDataIndex}`} spacingVertical={1}>
                <TextLabel2 as="p">File Path: {file}</TextLabel2>
                {props.map(({ propKey, count }) => (
                  <PatternComponentStatsBreakdownCell
                    key={`prop-${fileDataIndex}`}
                    detail={`${count} instance(s)`}
                    title={propKey}
                  />
                ))}
              </VStack>
            ),
          ]),
        )}
      </VStack>
    );
  },
);

const PatternComponentDetails = memo(({ component }: { component: PatternComponentSummary }) => {
  return (
    <VStack width="100%">
      <VStack gap={2}>
        <VStack gap={1}>
          <TextTitle3 as="h3">{component.config.patternComponentName}</TextTitle3>
          <HStack justifyContent="space-between">
            <TextLabel1 as="p">Source file</TextLabel1>
            <TextLabel2 as="p">{component.config.packageImportPath}</TextLabel2>
          </HStack>
        </VStack>
        <PatternComponentSummaryInfo component={component} />
        <DetailedPatternComponentBreakdown component={component} />
      </VStack>
    </VStack>
  );
});

const EmptyPatternComponentDetails = () => {
  return (
    <VStack width="100%">
      <VStack gap={2}>
        <TextTitle3 as="h3">Select a Pattern Component</TextTitle3>
        <TextBody as="p">Select any pattern component on the left.</TextBody>
      </VStack>
    </VStack>
  );
};

const PatternComponentListCell = memo(
  ({
    id,
    isActive,
    componentDetails,
    onPress,
    index,
    style,
  }: AdoptionPatternComponentsListCell) => {
    return (
      <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
        <ListCell
          accessory={isActive ? 'selected' : 'arrow'}
          description={`${componentDetails.totalCallSites} files`}
          detail={`${componentDetails.totalInstances} instances`}
          innerSpacing={innerCellSpacing}
          onPress={() => onPress(id)}
          outerSpacing={outerCellSpacing}
          selected={isActive}
          title={componentDetails?.config.patternComponentName ?? ''}
        />
      </div>
    );
  },
);
PatternComponentListCell.displayName = 'PatternComponentListCell';

const componentsWithIds = Object.entries(OVERALL_COMPONENT_PATTERN_SUMMARY).map(([id, value]) => ({
  id,
  ...value,
}));

export const PatternComponentsList = () => {
  const [activeComponentId, setActiveComponentId] = useState<string>(componentsWithIds[0].id);

  const handlePress = useCallback((id: string) => {
    setActiveComponentId(id);
  }, []);

  const activeComponent = componentsWithIds.find((c) => c.id === activeComponentId);

  const start = (
    <>
      {componentsWithIds.map((component, index) => (
        <PatternComponentListCell
          key={component.id}
          componentDetails={component}
          id={component.id}
          index={index}
          isActive={component.id === activeComponentId}
          onPress={handlePress}
        />
      ))}
    </>
  );

  const end = activeComponent ? (
    <PatternComponentDetails component={activeComponent} />
  ) : (
    <EmptyPatternComponentDetails />
  );

  return <SplitScreenStack end={end} start={start} />;
};

export const AdoptionPatternComponents = () => {
  return (
    <VStack width="100%">
      <TextHeadline as="p">Pattern Component Quick View</TextHeadline>
      <PatternComponentsList />
    </VStack>
  );
};
