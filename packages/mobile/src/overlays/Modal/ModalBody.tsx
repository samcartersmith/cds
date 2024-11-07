import React, { useMemo } from 'react';
import { KeyboardAvoidingView, ScrollView, ScrollViewProps } from 'react-native';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';

import { useContentSize } from '../../hooks/useContentSize';
import { useLayout } from '../../hooks/useLayout';
import { Box } from '../../layout';

type ModalBodyProps = ScrollViewProps;

export const ModalBody: React.FC<React.PropsWithChildren<ModalBodyProps>> = ({
  children,
  ...props
}) => {
  const [{ height: contentHeight }, onContentSizeChange] = useContentSize();
  const [{ height: scrollHeight }, onLayout] = useLayout();
  const { hideDividers } = useModalParent();

  // dynamically set scrollEnabled base on content height
  const shouldEnableScroll = useMemo(
    () => contentHeight > scrollHeight,
    [contentHeight, scrollHeight],
  );

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        scrollEnabled={shouldEnableScroll}
        {...props}
      >
        <Box
          flexGrow={1}
          spacingHorizontal={3}
          // remove vertical padding when dividers hidden
          spacingVertical={hideDividers ? 0 : 3}
        >
          {children}
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
