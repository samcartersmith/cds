import React, { memo, useCallback } from 'react';
import { cx } from '@linaria/core';
import { KBarSearch, useKBar, VisualState } from 'kbar';
import { IconButton } from '@cbhq/cds-web2/buttons';
import { Icon } from '@cbhq/cds-web2/icons/Icon';
import { Divider, HStack } from '@cbhq/cds-web2/layout';
import { Modal } from '@cbhq/cds-web2/overlays/Modal/Modal';
import {
  background,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from '@cbhq/cds-web2/styles/styles';

import KBarAnimator from '../KBarAnimator';
import KBarResults from '../KBarResults';

import styles from './styles.module.css';

const searchClassName = cx(
  fontFamily.title4,
  fontSize.title4,
  fontWeight.title4,
  lineHeight.title4,
  background.transparent,
  styles.searchInput,
);

const KBarModal = memo(function KBarModal() {
  const { showing, query } = useKBar((state) => ({
    showing: state.visualState !== VisualState.hidden,
  }));

  const handleRequestClose = useCallback(() => {
    query.toggle();
  }, [query]);

  return (
    <Modal onRequestClose={handleRequestClose} shouldCloseOnEscPress={false} visible={showing}>
      <KBarAnimator>
        <HStack alignItems="center" gap={2} paddingX={3} paddingY={2}>
          <HStack alignItems="center" flexGrow={1} gap={1.5}>
            <Icon color="textForeground" name="magnifyingGlass" size="s" />
            <KBarSearch className={searchClassName} />
          </HStack>
          <IconButton transparent aria-label="close" name="close" onClick={handleRequestClose} />
        </HStack>
        <Divider />
        <KBarResults />
      </KBarAnimator>
    </Modal>
  );
});

export default KBarModal;
