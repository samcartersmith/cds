import React, { forwardRef, memo, useCallback } from 'react';
import { View } from 'react-native';
import { CustomTabProps, TabbedChipsBaseProps } from '@cbhq/cds-common2';

import { TabNavigation } from '../tabs';

import { Chip } from './Chip';

export const TabbedChips = memo(
  forwardRef(function TabbedChips(props: TabbedChipsBaseProps, ref: React.ForwardedRef<View>) {
    const renderChipAsTab = useCallback(({ label, active, ...tabProps }: CustomTabProps) => {
      return (
        <Chip inverted={active} {...tabProps}>
          {label}
        </Chip>
      );
    }, []);
    return (
      <TabNavigation
        ref={ref}
        Component={renderChipAsTab}
        gap={1}
        role="radiogroup"
        variant="secondary"
        {...props}
      />
    );
  }),
);
