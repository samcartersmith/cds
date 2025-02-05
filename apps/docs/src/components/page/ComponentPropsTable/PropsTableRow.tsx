import React, { useMemo } from 'react';
import { cx } from '@linaria/core';
import { VStack } from '@cbhq/cds-web2/layout';
import { TextBody } from '@cbhq/cds-web2/typography/TextBody';
import { TextLabel2 } from '@cbhq/cds-web2/typography/TextLabel2';
import { SharedTypeAliases } from '@cbhq/docusaurus-plugin-docgen';
import { ProcessedPropItem } from '@cbhq/docusaurus-plugin-docgen/types';

import ModalLink from './ModalLink';
import styles from './styles.module.css';

export type TypeAliasModalContentProps = {
  typeAlias: string;
};

export function TypeAliasModalContent({ typeAlias }: TypeAliasModalContentProps) {
  const values = useMemo(() => typeAlias.split('|'), [typeAlias]);

  return (
    <VStack gap={1}>
      {values.map((item) => (
        <span key={item}>
          <code>{item}</code>
        </span>
      ))}
    </VStack>
  );
}

export type PropsTableRowProps = {
  prop: ProcessedPropItem;
  sharedTypeAliases: SharedTypeAliases;
  searchTerm?: string;
};

function highlightText(text: string, highlight: string) {
  if (!highlight.trim()) {
    return text;
  }

  // Match at word start or after a capital letter
  const regex = new RegExp(`(?:^|(?<=[A-Z]))(${highlight})`, 'gi');
  const matches = Array.from(text.matchAll(regex));

  if (!matches.length) return text;

  let lastIndex = 0;
  const elements = [];

  matches.forEach((match) => {
    const [matchedText] = match;
    const { index } = match;

    // Add text before match
    if (index > lastIndex) {
      elements.push(text.slice(lastIndex, index));
    }

    // Add highlighted match
    elements.push(
      <span
        key={`${matchedText}-${index}`}
        style={{
          backgroundColor: 'rgba(var(--blue20), 0.5)',
        }}
      >
        {matchedText}
      </span>,
    );

    lastIndex = index + matchedText.length;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
}

function PropsTableRow({ prop, sharedTypeAliases, searchTerm = '' }: PropsTableRowProps) {
  const { defaultValue, name, description, type, required } = prop;

  const highlightedName = useMemo(() => highlightText(name, searchTerm), [name, searchTerm]);

  const nameContent = useMemo(() => {
    return (
      <VStack as="h3" className={cx(styles.propsTableWrapper, 'anchor')} id={name}>
        <TextBody as="p">
          {highlightedName}
          {required && <span style={{ color: 'rgb(var(--red50))' }}>*</span>}
        </TextBody>
        <TextLabel2 as="p" color="textForegroundMuted" overflow="break" paddingTop={0.5}>
          {description}
        </TextLabel2>
      </VStack>
    );
  }, [description, name, required, highlightedName]);
  const typeContent = useMemo(() => {
    if (type in sharedTypeAliases) {
      const typeAlias = sharedTypeAliases[type];
      return (
        <ModalLink mono content={<TypeAliasModalContent typeAlias={typeAlias} />} font="body">
          {type}
        </ModalLink>
      );
    }
    return (
      <TextBody mono font="body" overflow="break">
        {type}
      </TextBody>
    );
  }, [sharedTypeAliases, type]);
  return (
    <tr>
      <td>{nameContent}</td>
      <td>{typeContent}</td>
      <td>
        <TextBody mono as="span">
          {defaultValue ?? '--'}
        </TextBody>
      </td>
    </tr>
  );
}

export default PropsTableRow;
