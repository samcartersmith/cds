import React, { useCallback, useMemo } from 'react';
import entries from 'lodash/entries';
import { IconButton } from '@cbhq/cds-web/buttons/IconButton';
import { HStack } from '@cbhq/cds-web/layout';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@cbhq/cds-web/tables';
import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';

import type { AliasTypes, ParentTypes, ParsedProp } from '../scripts/docgenParser';

import { Badge, BadgeVariant } from './Badge';
import { PropsTableModal } from './PropsTableModal';

export type PropsTableRowProps = ParsedProp & {
  aliasTypes: AliasTypes;
  parentTypes: ParentTypes;
};

function getBadges({
  dangerous,
  deprecated,
  internal,
}: Pick<ParsedProp, 'dangerous' | 'deprecated' | 'internal'>) {
  const badges: BadgeVariant[] = [];
  if (dangerous) {
    badges.push('dangerous');
  }
  if (deprecated) {
    badges.push('deprecated');
  }
  if (internal) {
    badges.push('internal');
  }
  return badges;
}

export function PropsTableRow({
  name,
  description,
  options: type,
  defaultValue = '--',
  dangerous,
  deprecated,
  internal,
  required,
  aliasTypes,
  parentTypes,
}: PropsTableRowProps) {
  const badgeVariants = useMemo(() => {
    return getBadges({ dangerous, deprecated, internal });
  }, [dangerous, deprecated, internal]);
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
    if (type in aliasTypes) {
      return (
        <TableCell>
          <PropsTableModal title={type} modalContent={aliasTypes[type]} />
        </TableCell>
      );
    }
    if (type in parentTypes) {
      const propsForParentType = parentTypes[type];
      return (
        <TableCell>
          <PropsTableModal
            title={type}
            modalContent={
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell title="Name" />
                    <TableCell title="Type" />
                    <TableCell title="Default" />
                    <TableCell title="" />
                    <TableCell title="" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries(propsForParentType).map(([, item]) => {
                    return (
                      <PropsTableRow
                        key={item.name}
                        {...item}
                        parentTypes={parentTypes}
                        aliasTypes={aliasTypes}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            }
          />
        </TableCell>
      );
    }
    return <TableCell title={type} />;
  }, [type, aliasTypes, parentTypes]);

  return (
    <TableRow>
      <TableCell
        title={name}
        subtitle={description}
        end={required ? <Badge variant="required" /> : undefined}
      />
      {typeContent}
      <TableCell title={defaultValue} />
      <TableCell direction="horizontal" justifyContent="flex-end">
        <HStack gap={1}>
          {badgeVariants.map((item) => (
            <Badge variant={item} />
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
