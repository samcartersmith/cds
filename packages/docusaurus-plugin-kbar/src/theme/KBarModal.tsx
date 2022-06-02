import React, { memo, useCallback } from 'react';
import KBarAnimator from '@theme/KBarAnimator';
import KBarResults from '@theme/KBarResults';
import useThemeActions from '@theme/useThemeActions';
import { KBarSearch, useKBar, VisualState } from 'kbar';
import { Modal } from '@cbhq/cds-web/overlays/Modal/Modal';
import { palette, spacing } from '@cbhq/cds-web/tokens';
import { bodyStyles } from '@cbhq/cds-web/typography/textStyles';

const searchStyle: React.CSSProperties = {
  ...bodyStyles,
  padding: spacing[3],
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  border: 'none',
  background: palette.background,
  color: palette.foreground,
};

const KBarModal = memo(function KBarModal() {
  useThemeActions();

  const { showing, query } = useKBar((state) => ({
    showing: state.visualState !== 'hidden',
  }));

  const handleRequestClose = useCallback(() => {
    query.setVisualState(VisualState.animatingOut);
  }, [query]);

  if (!showing) {
    return null;
  }

  return (
    <Modal visible onRequestClose={handleRequestClose}>
      {/* Handles the show/hide and height animations */}
      <KBarAnimator>
        {/* Search input */}
        <KBarSearch style={searchStyle} />
        <KBarResults />
      </KBarAnimator>
    </Modal>
  );
});

export default KBarModal;
