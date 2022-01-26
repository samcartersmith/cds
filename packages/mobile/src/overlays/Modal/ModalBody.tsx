import React, { useMemo } from 'react';
import { KeyboardAvoidingView, ScrollView, ScrollViewProps } from 'react-native';
import { useModalParent } from '@cbhq/cds-common/src/overlays/ModalParentContext';

import { useContentSize } from '../../hooks/useContentSize';
import { useLayout } from '../../hooks/useLayout';
import { Box } from '../../layout';

type ModalBodyProps = ScrollViewProps;

export const ModalBody: React.FC<ModalBodyProps> = ({ children, ...props }) => {
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
        scrollEnabled={shouldEnableScroll}
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        {...props}
      >
        <Box
          spacingHorizontal={3}
          // remove vertical padding when dividers hidden
          spacingVertical={hideDividers ? 0 : 3}
          flexGrow={1}
        >
          {children}
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
