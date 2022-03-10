import React, { useCallback, useMemo, Suspense } from 'react';

import useUserPreferencesContext from '@theme/hooks/useUserPreferencesContext';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import * as templatesMap from ':cds-website/data/templatesMap';

type ComponentsMap = typeof templatesMap;
type ComponentNames = keyof ComponentsMap;
type TemplateName = 'design' | 'implementation';

const tabs = [
  { label: 'Design', value: 'design' },
  { label: 'Implementation', value: 'implementation' },
];

export const ComponentTabs = <T extends ComponentNames>({ name }: { name: T }) => {
  const { tabGroupChoices } = useUserPreferencesContext();
  const getTemplate = useCallback(
    (templateName: TemplateName) => {
      if (name in templatesMap) {
        if (templateName in templatesMap[name]) {
          const Content = templatesMap[name][
            templateName as keyof ComponentsMap[T]
          ] as unknown as React.FC;
          return (
            <div className="markdown">
              <Content />
            </div>
          );
        }
      }
      return null;
    },
    [name],
  );

  const designTemplate = useMemo(() => getTemplate('design'), [getTemplate]);
  const implementationTemplate = useMemo(() => getTemplate('implementation'), [getTemplate]);

  const content = useMemo(() => {
    if (!designTemplate) return implementationTemplate ?? null;
    return (
      <Tabs groupId="components" defaultValue="implementation" values={tabs}>
        <TabItem value="design">
          <Suspense fallback={null}>
            {tabGroupChoices?.components === 'design' ? designTemplate : ''}
          </Suspense>
        </TabItem>
        <TabItem value="implementation">
          <Suspense fallback={null}>
            {tabGroupChoices?.components === 'implementation' ? implementationTemplate : ''}
          </Suspense>
        </TabItem>
      </Tabs>
    );
  }, [designTemplate, implementationTemplate, tabGroupChoices?.components]);

  return <Suspense fallback={null}>{content}</Suspense>;
};
