import React, { useState, memo, useMemo, useCallback } from 'react';
import { HStack, VStack, Divider } from '@cbhq/cds-web/layout';
import { ListCell } from '@cbhq/cds-web/cells';
import { SetState } from '@cbhq/cds-common';
import { useAdopterComponents } from './hooks/useAdopterComponents';
import type { AdopterComponents, ComponentData } from './types';
import { AdopterComponentDetails } from './AdopterComponentDetails';
import { AdopterComponentsEmptyState } from './AdopterComponentsEmptyState';
import List, {ListRowProps} from 'react-virtualized/dist/commonjs/List';
import WindowScroller, {WindowScrollerChildProps} from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer, {Size} from 'react-virtualized/dist/commonjs/AutoSizer';

type AdopterListCellProps = ComponentData & {
  isActive: boolean;
  setActiveComponent: SetState<ComponentData | undefined>;
};

const AdopterListCell = memo((props: AdopterListCellProps) => {
  const { isActive, setActiveComponent, ...componentInfo } = props;
  const { name, totalCallSites, totalInstances } = componentInfo;

  const handleOnPress = useCallback(
    () => setActiveComponent(componentInfo),
    [componentInfo, setActiveComponent],
  );

  return (
    <>
      <ListCell
        title={name}
        description={`${totalCallSites} files`}
        detail={`${totalInstances} instances`}
        accessory={isActive ? 'selected' : 'arrow'}
        onPress={handleOnPress}
        selected={isActive}
        reduceHorizontalSpacing
      />
    </>
  );
});

export const AdopterComponentsList = memo(({ group }: { group: keyof AdopterComponents }) => {
  const { components } = useAdopterComponents()[group];
  const [activeComponent, setActiveComponent] = useState<ComponentData | undefined>(
    components.length > 0 ? components[0] : undefined,
  );

  if (components.length === 0) {
    return <AdopterComponentsEmptyState />;
  }

  const Row = ({ index, style }: ListRowProps) => {
    const item = components[index];
    const { name, sourceFile } = item;
    const id = `${name}-${sourceFile}`;
    const activeId = activeComponent
      ? `${activeComponent.name}-${activeComponent.sourceFile}`
      : undefined;
    const isActive = activeId === id;

    return (
      <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
        <AdopterListCell
          key={`${name}-${sourceFile}`}
          isActive={isActive}
          setActiveComponent={setActiveComponent}
          {...item}
        />
      </div>
    );
  };

  return (
    <HStack alignItems="flex-start" justifyContent="space-between">
      <VStack flexGrow={1}>
        <div style={{height: `${80*components.length}px`}}>
          <WindowScroller>
            {({ height, scrollTop }: WindowScrollerChildProps) => (
              <AutoSizer>
                {({ width }: Size) => (
                  <List
                    autoHeight
                    className="List"
                    height={height}
                    rowCount={components.length}
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
      </VStack>

      {activeComponent ? (
        <>
          <Divider direction="vertical" spacingHorizontal={4} />
          <AdopterComponentDetails {...activeComponent} />
        </>
      ) : null}
    </HStack>
  );
});
