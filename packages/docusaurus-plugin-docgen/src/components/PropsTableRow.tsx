import React, { useCallback, useMemo } from 'react';
import { IconButton } from '@cbhq/cds-web/buttons/IconButton';
import { HStack } from '@cbhq/cds-web/layout';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { TableCell, TableRow } from '@cbhq/cds-web/tables';
import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';

import type { ProcessedPropItem, PropItemTags, SharedTypeAliases } from '../scripts/types';

import { Badge, BadgeVariant } from './Badge';
import { ModalLink } from './ModalLink';

export type PropsTableRowProps = {
  prop: ProcessedPropItem;
  sharedTypeAliases: SharedTypeAliases;
};

function getBadges({ danger, deprecated, internal }: PropItemTags) {
  const badges: BadgeVariant[] = [];
  if (danger) {
    badges.push('danger');
  }
  if (deprecated) {
    badges.push('deprecated');
  }
  if (internal) {
    badges.push('internal');
  }
  return badges;
}

const emptyArray: BadgeVariant[] = [];

export function PropsTableRow({ prop, sharedTypeAliases }: PropsTableRowProps) {
  const { defaultValue, name, description, type, tags, required } = prop;
  const badgeVariants = useMemo(() => {
    if (tags) {
      return getBadges(tags);
    }
    return emptyArray;
  }, [tags]);
  const toast = useToast();

  const copyLinkToClipboard = useCallback(() => {
    const browserGlobals = getBrowserGlobals();
    if (navigator && browserGlobals) {
      const [cleanLink] = browserGlobals?.window.location.href.split('#') ?? [];
      void navigator.clipboard.writeText(`${cleanLink}#${name}`).then(() => {
        toast.show('Copied link to clipboard');
      });
    }
  }, [name, toast]);

  const typeContent = useMemo(() => {
    if (type in sharedTypeAliases) {
      return (
        <TableCell>
          <ModalLink title={type} content={sharedTypeAliases[type]} />
        </TableCell>
      );
    }
    return <TableCell title={type} />;
  }, [type, sharedTypeAliases]);

  return (
    <TableRow key={name}>
      <TableCell
        title={name}
        subtitle={description}
        end={required ? <Badge variant="required" /> : undefined}
      />
      {typeContent}
      <TableCell title={defaultValue ?? '--'} />
      <TableCell direction="horizontal" justifyContent="flex-end">
        <HStack gap={1}>
          {badgeVariants.map((item) => (
            <Badge key={item} variant={item} />
          ))}
        </HStack>
      </TableCell>
      <TableCell>
        <IconButton
          id={name}
          onPress={copyLinkToClipboard}
          name="chainLink"
          variant="foregroundMuted"
          transparent
        />
      </TableCell>
    </TableRow>
  );
}
