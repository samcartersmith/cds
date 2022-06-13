import React, { memo, useMemo } from 'react';
import JSDocTag, { JSDOC_TAG_VARIANTS, JSDocTagVariant } from '@theme/JSDocTag';
import ModalLink from '@theme/ModalLink';
import type { PropsTableRowProps, TypeAliasModalContentProps } from '@theme/PropsTableRow';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { listHeight } from '@cbhq/cds-common/tokens/cell';
import { Cell } from '@cbhq/cds-web/cells/Cell';
import { VStack } from '@cbhq/cds-web/layout';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { TextBody } from '@cbhq/cds-web/typography/TextBody';
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
      <TextBody as="p" mono>
        {type}
      </TextBody>
    );
  }, [type, sharedTypeAliases]);

  const minHeight = useScaleConditional(listHeight);

  // The h2 > a with anchor and hash-link classNames is what makes the table of contents (right side of page)
  // work with docusaurus setup.
  return (
    <h2 className="anchor props-table-wrapper" id={name}>
      <Cell minHeight={minHeight}>
        <HStack alignItems="center" justifyContent="space-between" gap={1}>
          <VStack width="30%" gap={1} flexWrap="wrap">
            <TextBody as="div">{name}</TextBody>
            <TextBody as="div" color="foregroundMuted" overflow="wrap">
              {description}
            </TextBody>
          </VStack>
          <VStack width="10%">{tagComponents}</VStack>
          <VStack width="30%" dangerouslySetClassName="type-aliases-link">
            <TextBody as="div" mono overflow="wrap">
              {typeContent}
            </TextBody>
          </VStack>
          <VStack width="30%">
            <TextBody as="div" align="center" mono>
              {defaultValue ?? '--'}
            </TextBody>
          </VStack>
        </HStack>
      </Cell>
    </h2>
  );
});

export default PropsTableRow;
