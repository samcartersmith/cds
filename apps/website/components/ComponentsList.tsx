import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import AutoSizer, { Size } from 'react-virtualized/dist/commonjs/AutoSizer';
import List, { ListRowProps } from 'react-virtualized/dist/commonjs/List';
import WindowScroller, {
  WindowScrollerChildProps,
} from 'react-virtualized/dist/commonjs/WindowScroller';
import { ListCell } from '@cbhq/cds-web/cells';

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

type ListCellProps = ComponentData & {
  isActive: boolean;
  setActiveComponent: () => void;
};

const ComponentListCell = memo((props: ListCellProps) => {
  const { isActive, setActiveComponent, ...componentInfo } = props;
  const { name, totalCallSites, totalInstances } = componentInfo;

  const handleOnPress = useCallback(() => setActiveComponent(), [setActiveComponent]);

  return (
    <ListCell
      title={name}
      description={`${totalCallSites} files`}
      detail={`${totalInstances} instances`}
      accessory={isActive ? 'selected' : 'arrow'}
      onPress={handleOnPress}
      selected={isActive}
      reduceHorizontalSpacing
    />
  );
});

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
    const [activeComponentIndex, setActiveComponentIndex] = useState<number>(0);

    const { results } = useContext(AdopterSearchContext) as AdopterSearchContextType;
    const { props: propSearchResults, components: componentSearchResults } =
      getResultsByType(results);

    const { setTabKey } = useContext(AdopterTabContext) as AdopterTabContextType;
    useEffect(() => {
      setTabKey(type);
    }, [setTabKey, type]);

    let filteredComponents = getFilteredSearchResults(
      componentSearchResults,
      components,
      (component) => [component.name],
    );
    filteredComponents = getFilteredSearchResults(
      propSearchResults,
      filteredComponents,
      (component) => {
        return Object.keys(component.propsWithCallSites ?? {});
      },
    );

    if (filteredComponents.length === 0) {
      return <AdopterComponentsEmptyState />;
    }

    const activeComponent =
      activeComponentIndex < filteredComponents.length
        ? filteredComponents[activeComponentIndex]
        : filteredComponents[0];

    // eslint-disable-next-line react/no-unstable-nested-components
    const Row = ({ index, style }: ListRowProps) => {
      const item = filteredComponents[index];
      const { name, sourceFile } = item;
      const id = `${name}-${sourceFile}`;
      const activeId = activeComponent
        ? `${activeComponent.name}-${activeComponent.sourceFile}`
        : undefined;
      const isActive = activeId === id;

      return (
        <div
          key={`${name}-${sourceFile}`}
          className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}
          style={style}
        >
          <ComponentListCell
            isActive={isActive}
            // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
            setActiveComponent={() => setActiveComponentIndex(index)}
            {...item}
          />
        </div>
      );
    };

    const start = (
      <div style={{ height: `${80 * filteredComponents.length}px` }}>
        <WindowScroller>
          {({ height, scrollTop }: WindowScrollerChildProps) => (
            <AutoSizer>
              {({ width }: Size) => (
                <List
                  autoHeight
                  className="List"
                  height={height}
                  rowCount={filteredComponents.length}
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
      </div>
    );

    const end = activeComponent ? <AdopterComponentDetails {...activeComponent} /> : null;

    return <SplitScreenStack start={start} end={end} />;
  },
);
