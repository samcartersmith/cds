/* eslint-disable react/no-danger */
import { memo, useCallback, useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import { CellDetailVariant, SetState, useToggler } from '@cbhq/cds-common';
import { CellAccessory } from '@cbhq/cds-web/cells/CellAccessory';
import { Collapsible } from '@cbhq/cds-web/collapsible';
import { Icon } from '@cbhq/cds-web/icons';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { TextBody, TextHeadline, TextLabel1, TextTitle2 } from '@cbhq/cds-web/typography';

import { BetaCell } from ':cds-website/components/BetaCell';
import { a11yReport } from ':cds-website/data/a11yReport';

import { SplitScreenStack } from '../SplitScreenStack';

type A11yComponent = typeof a11yReport.report[number];
type SetActiveComponent = SetState<A11yComponent['id']>;
type ProjectCellProps = {
  id: A11yComponent['id'];
  active: boolean;
  setActiveComponent: SetActiveComponent;
};

const getItem = (id: A11yComponent['id']) => {
  const item = a11yReport.report.find((i) => i.id === id) ?? a11yReport.report[0];
  return item;
};
export const ComponentCell = memo(({ id, active, setActiveComponent }: ProjectCellProps) => {
  const item: A11yComponent = getItem(id);
  const totalTests = Number(item.violations.length) + Number(item.passes);
  const status = item.violations.length ? 'fail' : 'pass';
  const color: CellDetailVariant = status === 'pass' ? 'positive' : 'negative';

  const start = (
    <VStack>
      <TextHeadline as="p" overflow="truncate">
        {item?.title}: {item.name}
      </TextHeadline>
    </VStack>
  );

  const end = (
    <TextBody as="p" align="end" color={color} spacingStart={0}>
      {item.passes} / {totalTests}
    </TextBody>
  );

  const handlePress = useCallback(() => setActiveComponent(id), [id, setActiveComponent]);

  return (
    <BetaCell
      key={`project-cell-${id}`}
      priority="end"
      offsetHorizontal={1}
      start={start}
      end={end}
      selected={active}
      endAccessory={<CellAccessory type={active ? 'selected' : 'arrow'} />}
      onPress={handlePress}
    />
  );
});

const Passes = ({ id }: { id: A11yComponent['id'] }) => {
  const item = getItem(id);
  const total = item.passes;

  return (
    <VStack borderRadius="standard" borderColor="line" spacing={2}>
      <TextLabel1 as="p" color="positive">
        {total} Passes
      </TextLabel1>
    </VStack>
  );
};
const Violations = ({ id }: { id: A11yComponent['id'] }) => {
  const [isCollapsed, { toggle }] = useToggler(true);
  const item = getItem(id);
  const total = item.violations.length;
  const getDetailsHtml = useCallback((details: string) => ({ __html: details }), []);

  return (
    <VStack borderRadius="standard" borderColor="line" spacing={1}>
      <BetaCell
        onPress={total ? toggle : undefined}
        offsetHorizontal={0}
        spacing={2}
        key={`detail--${id}`}
        justifyContent="space-between"
        endAccessory={
          total ? (
            <HStack gap={1} alignItems="center">
              <TextLabel1 as="p" color={isCollapsed ? 'foregroundMuted' : 'primary'}>
                View details
              </TextLabel1>
              <Icon
                size="s"
                name={isCollapsed ? 'caretDown' : 'caretUp'}
                color={isCollapsed ? 'foregroundMuted' : 'primary'}
              />
            </HStack>
          ) : undefined
        }
        start={
          <TextLabel1 as="p" color="negative">
            {total} Violations{' '}
          </TextLabel1>
        }
      />
      <Collapsible collapsed={isCollapsed}>
        <VStack gap={3} spacing={1}>
          {item.violations.map(({ id: reportId, description, help, helpUrl, nodes }) => (
            <VStack gap={1} key={reportId}>
              <TextHeadline as="h2">{reportId}</TextHeadline>
              <TextTitle2 as="h3" color="primary">
                {description}
              </TextTitle2>
              <TextBody as="p">
                {help}. <Link href={helpUrl}>Learn more</Link>
              </TextBody>
              {nodes.map(({ failureSummary, target }) => (
                <TextLabel1 as="p">
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

export const A11yReportOverview = memo(() => {
  const [activeComponentId, setActiveComponentId] = useState<A11yComponent['id']>(
    a11yReport.report[0].id,
  );
  const item = getItem(activeComponentId);

  const start = useMemo(
    () => (
      <VStack gap={1} spacingBottom={5}>
        <TextTitle2 as="h2" spacingBottom={2}>
          Components
        </TextTitle2>
        {a11yReport.report.map(({ id }) => (
          <ComponentCell
            id={id}
            active={activeComponentId === id}
            setActiveComponent={setActiveComponentId}
          />
        ))}
      </VStack>
    ),
    [activeComponentId],
  );

  const end = (
    <VStack gap={2}>
      <span>
        <TextHeadline as="h2" spacingBottom={0} color="primary">
          {item.title}
        </TextHeadline>
        <TextTitle2 as="h2" spacingTop={0}>
          {item.name}
        </TextTitle2>
      </span>
      <Passes id={activeComponentId} />
      <Violations id={activeComponentId} />
    </VStack>
  );

  return (
    <ThemeProvider>
      <SplitScreenStack start={start} end={end} />
    </ThemeProvider>
  );
});
