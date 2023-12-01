import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AutoSizer, { Size } from 'react-virtualized/dist/commonjs/AutoSizer';
import List, { ListRowProps } from 'react-virtualized/dist/commonjs/List';
import WindowScroller, {
  WindowScrollerChildProps,
} from 'react-virtualized/dist/commonjs/WindowScroller';
import { partition } from 'lodash';
import { ListCell } from '@cbhq/cds-web/cells';
import { Divider } from '@cbhq/cds-web/layout';
import { TextLabel1 } from '@cbhq/cds-web/typography';

import {
  AdopterTabContext,
  AdopterTabContextType,
} from ':cds-website/components/AdoptionTracker/context/AdopterTabProvider';
import {
  AdopterSearchContext,
  AdopterSearchContextType,
} from ':cds-website/components/AdoptionTracker/search/AdopterSearchProvider';

import { AdopterComponentDetails } from './AdoptionTracker/AdopterComponentDetails';
import { AdopterComponentsEmptyState } from './AdoptionTracker/AdopterComponentsEmptyState';
import { getResultsByType, isMatch } from './AdoptionTracker/search/SearchUtils';
import type { AdopterSearchResult, AdopterTabKey, ComponentData } from './AdoptionTracker/types';
import { SplitScreenStack } from './SplitScreenStack';

type ComponentListCellProps = {
  id: string;
  activeComponent: ComponentData;
  setActiveComponent: () => void;
  index: number;
  style?: React.CSSProperties;
} & Pick<ComponentData, 'name' | 'totalCallSites' | 'totalInstances'>;

const innerCellSpacing = { spacingHorizontal: 1 } as const;
const outerCellSpacing = { spacingHorizontal: 2, spacingEnd: 4 } as const;

const ComponentListCell = memo(
  ({
    id,
    activeComponent,
    index,
    style,
    setActiveComponent,
    name,
    totalCallSites,
    totalInstances,
  }: ComponentListCellProps) => {
    const activeId = activeComponent
      ? `${activeComponent.name}-${activeComponent.sourceFile}`
      : undefined;
    const isActive = activeId === id;

    return (
      <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
        <ListCell
          accessory={isActive ? 'selected' : 'arrow'}
          description={`${totalCallSites} files`}
          detail={`${totalInstances} instances`}
          innerPadding={innerCellSpacing}
          onPress={setActiveComponent}
          outerPadding={outerCellSpacing}
          selected={isActive}
          title={name}
        />
      </div>
    );
  },
);

ComponentListCell.displayName = 'ComponentListCell';

function getFilteredSearchResults(
  searchResults: AdopterSearchResult[],
  components: ComponentData[],
  fieldAccessor: (component: ComponentData) => string[],
) {
  return searchResults.length === 0
    ? components
    : components.filter((component: ComponentData) => {
        const fields = fieldAccessor(component);
        for (const searchResult of searchResults) {
          if (isMatch(searchResult, fields)) {
            return true;
          }
        }

        return false;
      });
}

export const AdopterComponentsList = memo(
  ({ components, type }: { components: ComponentData[]; type: AdopterTabKey }) => {
    const { results } = useContext(AdopterSearchContext) as AdopterSearchContextType;
    const { setTabKey } = useContext(AdopterTabContext) as AdopterTabContextType;
    const { props: propSearchResults, components: componentSearchResults } =
      getResultsByType(results);

    const filteredComponents = useMemo(() => {
      const filtered = getFilteredSearchResults(componentSearchResults, components, (component) => [
        component.name,
      ]);

      return getFilteredSearchResults(propSearchResults, filtered, (component) => {
        return Object.keys(component.propsWithCallSites ?? {});
      });
    }, [componentSearchResults, components, propSearchResults]);

    const [featuredComponents, otherComponents] = useMemo(
      () => partition(filteredComponents, ({ isFeatured }) => isFeatured),
      [filteredComponents],
    );

    const [activeComponent, setActiveComponent] = useState<ComponentData>(
      featuredComponents.length > 0 ? featuredComponents[0] : otherComponents[0],
    );

    const getSetActiveComponentHandler = useCallback(
      (activeComp: ComponentData) => () => setActiveComponent(activeComp),
      [],
    );

    useEffect(() => {
      setTabKey(type);
    }, [setTabKey, type]);

    if (featuredComponents.length === 0 && otherComponents.length === 0) {
      return <AdopterComponentsEmptyState />;
    }

    // eslint-disable-next-line react/no-unstable-nested-components
    const Row = ({ index, style }: ListRowProps) => {
      const item = otherComponents[index];
      const { name, sourceFile, totalCallSites, totalInstances } = item;
      const id = `${name}-${sourceFile}`;

      return (
        <ComponentListCell
          key={id}
          activeComponent={activeComponent}
          id={id}
          index={index}
          name={name}
          setActiveComponent={getSetActiveComponentHandler(item)}
          style={style}
          totalCallSites={totalCallSites}
          totalInstances={totalInstances}
        />
      );
    };

    const start = (
      <>
        {type === 'cds' && (
          <TextLabel1 as="p" color="foregroundMuted" spacingBottom={3}>
            🎨 This project depends on{' '}
            <TextLabel1 as="span" color="foreground">
              {components.length} components
            </TextLabel1>{' '}
            from CDS
          </TextLabel1>
        )}
        {featuredComponents.map((component, index) => {
          const { name, sourceFile, totalCallSites, totalInstances } = component;
          const id = `${name}-${sourceFile}`;

          return (
            <ComponentListCell
              key={id}
              activeComponent={activeComponent}
              id={id}
              index={index}
              name={name}
              setActiveComponent={getSetActiveComponentHandler(component)}
              totalCallSites={totalCallSites}
              totalInstances={totalInstances}
            />
          );
        })}
        {featuredComponents.length > 0 && <Divider spacingVertical={3} />}
        <WindowScroller>
          {({ height, scrollTop }: WindowScrollerChildProps) => (
            <AutoSizer disableHeight>
              {({ width }: Size) => (
                <List
                  autoHeight
                  className="List"
                  height={height}
                  rowCount={otherComponents.length}
                  rowHeight={80}
                  rowRenderer={Row}
                  scrollTop={scrollTop}
                  width={width}
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </>
    );

    const end = activeComponent ? <AdopterComponentDetails {...activeComponent} /> : null;

    return <SplitScreenStack end={end} start={start} />;
  },
);

AdopterComponentsList.displayName = 'AdopterComponentsList';
