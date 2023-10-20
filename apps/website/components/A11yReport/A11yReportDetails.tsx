/* eslint-disable react/no-danger */
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import startCase from 'lodash/startCase';
import { CellDetailVariant, SetState, useToggler } from '@cbhq/cds-common';
import { CellAccessory } from '@cbhq/cds-web/cells/CellAccessory';
import { Collapsible } from '@cbhq/cds-web/collapsible';
import { Icon } from '@cbhq/cds-web/icons';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { TextBody, TextHeadline, TextLabel1, TextTitle2 } from '@cbhq/cds-web/typography';

import { BetaCell } from ':cds-website/components/BetaCell';
import { a11yReport } from ':cds-website/data/a11yReport';
import { a11yReport as originalA11yReport } from ':cds-website/data/a11yReport_original';

import { SplitScreenStack } from '../SplitScreenStack';

const combinedData = { ...a11yReport, ...originalA11yReport };
export type ReportDoc = typeof combinedData;
type Report = ReportDoc['report'];
type A11yComponent = Report[number] | Report[number];
type SetActiveComponent = SetState<A11yComponent['id']>;
type ProjectCellProps = {
  id: A11yComponent['id'];
  active: boolean;
  setActiveComponent: SetActiveComponent;
  report: Report;
};
type Props = {
  impact: string;
  reportDoc: ReportDoc;
};
const getItem = (id: A11yComponent['id'], report: Report) => {
  const item = report.find((i) => i.id === id) ?? report[0];
  return item;
};
export const ComponentCell = memo(
  ({ id, active, setActiveComponent, report }: ProjectCellProps) => {
    const item: A11yComponent = getItem(id, report);
    const totalTests = Number(item.violations.length) + Number(item.passes);
    const status = item.violations.length ? 'fail' : 'pass';
    const color: CellDetailVariant = status === 'pass' ? 'positive' : 'negative';

    const start = (
      <VStack>
        <TextHeadline as="p" overflow="truncate">
          {item?.title.replace('Core Components/', '')}: {item.name}
        </TextHeadline>
      </VStack>
    );

    const end = (
      <TextBody align="end" as="p" color={color} spacingStart={0}>
        {item.passes} / {totalTests}
      </TextBody>
    );

    const handlePress = useCallback(() => setActiveComponent(id), [id, setActiveComponent]);

    return (
      <BetaCell
        key={`project-cell-${id}`}
        end={end}
        endAccessory={<CellAccessory type={active ? 'selected' : 'arrow'} />}
        offsetHorizontal={1}
        onPress={handlePress}
        priority="end"
        selected={active}
        start={start}
      />
    );
  },
);

const Passes = ({ id, report }: { id: A11yComponent['id']; report: Report }) => {
  const item = getItem(id, report);
  const total = item.passes;

  return (
    <VStack borderColor="line" borderRadius="rounded" spacing={2}>
      <TextLabel1 as="p" color="positive">
        {total} Passes
      </TextLabel1>
    </VStack>
  );
};
const Violations = ({ id, report }: { id: A11yComponent['id']; report: Report }) => {
  const [isCollapsed, { toggle }] = useToggler(true);
  const item = getItem(id, report);
  const total = item.violations.length;
  const getDetailsHtml = useCallback((details: string) => ({ __html: details }), []);

  return (
    <VStack borderColor="line" borderRadius="rounded" spacing={1}>
      <BetaCell
        key={`detail--${id}`}
        endAccessory={
          total ? (
            <HStack alignItems="center" gap={1}>
              <TextLabel1 as="p" color={isCollapsed ? 'foregroundMuted' : 'primary'}>
                View details
              </TextLabel1>
              <Icon
                color={isCollapsed ? 'foregroundMuted' : 'primary'}
                name={isCollapsed ? 'caretDown' : 'caretUp'}
                size="s"
              />
            </HStack>
          ) : undefined
        }
        justifyContent="space-between"
        offsetHorizontal={0}
        onPress={total ? toggle : undefined}
        spacing={2}
        start={
          <TextLabel1 as="p" color="negative">
            {total} Violations
          </TextLabel1>
        }
      />
      <Collapsible collapsed={isCollapsed}>
        <VStack gap={3} spacing={1}>
          {item.violations.map(({ id: reportId, description, help, helpUrl, nodes }) => (
            <VStack key={reportId} gap={1}>
              <TextHeadline as="h2">{reportId}</TextHeadline>
              <TextTitle2 as="h3" color="primary">
                {description}
              </TextTitle2>
              <TextBody as="p">
                {help}. <Link href={helpUrl}>Learn more</Link>
              </TextBody>
              {nodes.map(({ failureSummary, target, impact }) => (
                <TextLabel1 key={`key--${target}-${impact}`} as="p">
                  Target: <code>{target}</code>
                  <br />
                  <span dangerouslySetInnerHTML={getDetailsHtml(failureSummary)} />
                </TextLabel1>
              ))}
            </VStack>
          ))}
        </VStack>
      </Collapsible>
    </VStack>
  );
};

const ImpactDetails = ({ impact = 'all' }) => {
  if (impact === 'critical') {
    return (
      <TextBody as="p" color="negative">
        🔥 {startCase(impact)} issues are considered P1 issues
      </TextBody>
    );
  }

  if (impact === 'serious') {
    return <TextBody as="p">❤️‍🩹 {startCase(impact)} issues are considered P2 issues</TextBody>;
  }

  if (impact === 'moderate') {
    return <TextBody as="p">️‍🩹 {startCase(impact)} issues are considered P3/P4 issues</TextBody>;
  }

  return <TextBody as="p">📃 A full list of all components and their a11y score</TextBody>;
};

export const A11yReportDetails = memo(({ impact = 'critical', reportDoc }: Props) => {
  const filteredReport = useMemo<Report>(
    () =>
      // @ts-expect-error TODO fix types
      reportDoc.report.filter((r) => {
        return impact === 'all' ? true : r.violations.some((v) => v.impact === impact);
      }),
    [impact, reportDoc],
  );
  const [activeComponentId, setActiveComponentId] = useState<A11yComponent['id']>(
    filteredReport[0].id,
  );
  const item = useMemo(
    () => getItem(activeComponentId, filteredReport),
    [activeComponentId, filteredReport],
  );

  useEffect(() => setActiveComponentId(filteredReport[0].id), [filteredReport]);

  const start = useMemo(
    () => (
      <VStack gap={1} spacingBottom={3}>
        <VStack gap={0} spacingBottom={3}>
          <ImpactDetails impact={impact} />
          <Link href="https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md">
            Learn more about the rating sytem
          </Link>
        </VStack>
        {filteredReport.map(({ id }) => (
          <ComponentCell
            key={id}
            active={activeComponentId === id}
            id={id}
            report={filteredReport}
            setActiveComponent={setActiveComponentId}
          />
        ))}
      </VStack>
    ),
    [activeComponentId, impact, filteredReport],
  );

  const end = useMemo(
    () => (
      <VStack gap={2}>
        <span>
          <TextHeadline as="h2" color="primary" spacingBottom={0}>
            {item.title.replace('Core Components/', '')}
          </TextHeadline>
          <TextTitle2 as="h2" spacingTop={0}>
            {item.name}
          </TextTitle2>
        </span>
        <Passes id={activeComponentId} report={filteredReport as unknown as Report} />
        <Violations id={activeComponentId} report={filteredReport} />
      </VStack>
    ),
    [activeComponentId, filteredReport, item.name, item.title],
  );

  return (
    <ThemeProvider>
      <SplitScreenStack end={end} start={start} />
    </ThemeProvider>
  );
});
