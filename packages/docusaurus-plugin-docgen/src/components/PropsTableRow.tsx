import React, { useCallback, useContext, useMemo } from 'react';
import { IconButton } from '@cbhq/cds-web/buttons/IconButton';
import { VStack } from '@cbhq/cds-web/layout';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { TableCell, TableCellProps, TableRow } from '@cbhq/cds-web/tables';
import { TextBody } from '@cbhq/cds-web/typography/TextBody';
import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';

import type { ProcessedPropItem, PropItemTags, SharedTypeAliases } from '../scripts/types';

import { Badge, BADGE_VARIANTS, BadgeVariant } from './Badge';
import { ModalChildContext, ModalLink } from './ModalLink';

export type PropsTableRowProps = {
  prop: ProcessedPropItem;
  sharedTypeAliases: SharedTypeAliases;
};

type TypeAliasModalContentProps = {
  typeAlias: string;
};

function keys(item: PropItemTags) {
  return Object.keys(item) as unknown as BadgeVariant[];
}

export function NameCell(props: TableCellProps) {
  return <TableCell width="33%" {...props} />;
}

export function BadgesCell(props: TableCellProps) {
  return <TableCell {...props} />;
}

export function TypeCell(props: TableCellProps) {
  return <TableCell width="25%" {...props} />;
}

export function DefaultValueCell(props: TableCellProps) {
  return <TableCell width="17" {...props} />;
}

export function LinkCell(props: TableCellProps) {
  const isInModal = useContext(ModalChildContext);
  return isInModal ? null : <TableCell {...props} />;
}

export function TypeAliasModalContent({ typeAlias }: TypeAliasModalContentProps) {
  const values = useMemo(() => {
    return typeAlias.split('|');
  }, [typeAlias]);

  return (
    <VStack gap={1}>
      {values.map((item) => (
        <span>
          <code key={item}>{item}</code>
        </span>
      ))}
    </VStack>
  );
}

export function PropsTableRow({ prop, sharedTypeAliases }: PropsTableRowProps) {
  const { defaultValue, name, description, type, tags = {}, required } = prop;
  const badgeVariants = useMemo(() => {
    const variants = keys(tags);
    if (required) {
      variants.push('required');
    }
    return variants
      .filter((item) => BADGE_VARIANTS.includes(item))
      .map((item) => <Badge key={item} variant={item} />);
  }, [required, tags]);

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
      const typeAlias = sharedTypeAliases[type];
      return (
        <ModalLink variant="body" mono content={<TypeAliasModalContent typeAlias={typeAlias} />}>
          {type}
        </ModalLink>
      );
    }
    return (
      <TextBody as="p" mono>
        {type}
      </TextBody>
    );
  }, [type, sharedTypeAliases]);

  return (
    <TableRow>
      <NameCell title={name} subtitle={description} />
      <BadgesCell>{badgeVariants}</BadgesCell>
      <TypeCell>{typeContent}</TypeCell>
      <DefaultValueCell>
        <TextBody as="p" mono>
          {defaultValue ?? '--'}
        </TextBody>
      </DefaultValueCell>
      <LinkCell>
        <IconButton
          id={name}
          onPress={copyLinkToClipboard}
          name="chainLink"
          variant="foregroundMuted"
          transparent
        />
      </LinkCell>
    </TableRow>
  );
}
