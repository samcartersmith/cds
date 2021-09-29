import React, { useMemo } from 'react';
import { KeyboardAvoidingView, ScrollView, ScrollViewProps } from 'react-native';

import { Box } from '../../layout';
import { useLayout } from '../../hooks/useLayout';
import { useContentSize } from '../../hooks/useContentSize';

type ModalBodyProps = ScrollViewProps;

export const ModalBody: React.FC<ModalBodyProps> = ({ children, ...props }) => {
  const [{ height: contentHeight }, onContentSizeChange] = useContentSize();
  const [{ height: scrollHeight }, onLayout] = useLayout();

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
        <Box spacing={3} flexGrow={1}>
          {children}
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
