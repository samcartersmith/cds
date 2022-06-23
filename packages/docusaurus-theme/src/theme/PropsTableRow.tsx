import React, { memo, useMemo } from 'react';
import JSDocTag, { JSDOC_TAG_VARIANTS, JSDocTagVariant } from '@theme/JSDocTag';
import ModalLink from '@theme/ModalLink';
import type { PropsTableRowProps, TypeAliasModalContentProps } from '@theme/PropsTableRow';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { TableCell, TableRow } from '@cbhq/cds-web/tables';
import { TextBody, TextLabel2 } from '@cbhq/cds-web/typography';
import type { PropItemTags } from '@cbhq/docusaurus-plugin-docgen';

function keys(item: PropItemTags) {
  return Object.keys(item) as unknown as JSDocTagVariant[];
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

const PropsTableRow = memo(function PropsTableRow({ prop, sharedTypeAliases }: PropsTableRowProps) {
  const { defaultValue, name, description, type, tags = {}, required } = prop;
  const tagComponents = useMemo(() => {
    const variants = keys(tags);
    if (required) {
      variants.push('required');
    }
    return variants
      .filter((item) => JSDOC_TAG_VARIANTS.includes(item))
      .map((item) => <JSDocTag key={item} variant={item} />);
  }, [required, tags]);

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
      <HStack overflow="scroll" width="inherit">
        <TextBody as="p" mono overflow="break">
          {type}
        </TextBody>
      </HStack>
    );
  }, [type, sharedTypeAliases]);

  const nameContent = useMemo(() => {
    return (
      <h2 className="anchor props-table-wrapper" id={name}>
        <VStack>
          <TextBody as="p">{name}</TextBody>
          <TextLabel2 spacingTop={0.5} as="p" color="foregroundMuted" overflow="break">
            {description}
          </TextLabel2>
        </VStack>
      </h2>
    );
  }, [description, name]);

  // The h2 with anchor class and id is what makes the table of contents (right side of page)
  // work with docusaurus setup.
  return (
    <TableRow key={name}>
      <TableCell>{nameContent}</TableCell>
      <TableCell>{tagComponents}</TableCell>
      <TableCell>{typeContent}</TableCell>
      <TableCell alignItems="flex-end">
        <TextBody as="span" align="end" mono>
          {defaultValue ?? '--'}
        </TextBody>
      </TableCell>
    </TableRow>
  );
});

export default PropsTableRow;
