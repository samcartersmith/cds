import React from 'react';
import { Box, VStack } from '@cbhq/cds-web/layout';
import { TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';

import type { FigmaNodeData } from '../../../shared/FigmaNodeData';
import { fetchFigma } from '../../fetchFigma';

type FigmaNodeListItemProps = FigmaNodeData & {
  depth: number;
  checkedNodes: string[];
  setCheckedNodes: React.Dispatch<React.SetStateAction<string[]>>;
};

/**
 *
 * Recursively renders a tree of FigmaNodeData
 */
export const FigmaNodeListItem = ({
  type,
  name,
  id,
  text,
  children,
  depth,
  checkedNodes,
  setCheckedNodes,
}: FigmaNodeListItemProps) => {
  const isTextNode = type === 'TEXT';
  const htmlId = `node-${id}`;
  const checked = checkedNodes.includes(id);
  const paddingStyle = { paddingLeft: `calc((${depth} * 8px) + 16px)` };
  const highlightFigmaNode = () => void fetchFigma('highlight-node', id);
  const toggleChecked = () =>
    setCheckedNodes((s) => (s.includes(id) ? s.filter((i) => i !== id) : [...s, id]));

  return (
    <VStack gap={1}>
      {isTextNode ? (
        <label htmlFor={htmlId}>
          <Box
            bordered
            background={checked ? 'primaryWash' : 'background'}
            borderColor="secondary"
            borderRadius="roundedSmall"
            elevation={checked ? 0 : 1}
            onMouseEnter={highlightFigmaNode}
            style={{
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <input
              checked={checked}
              id={htmlId}
              onChange={toggleChecked}
              style={{ position: 'absolute', left: 0, cursor: 'pointer' }}
              type="checkbox"
            />
            <VStack style={paddingStyle}>
              <TextLabel1 as="span">{name}</TextLabel1>
              <TextLabel2 as="span" color="foregroundMuted">
                {text}
              </TextLabel2>
            </VStack>
          </Box>
        </label>
      ) : (
        <TextLabel1
          as="span"
          color={isTextNode ? undefined : 'foregroundMuted'}
          style={paddingStyle}
        >
          {name}
        </TextLabel1>
      )}
      {children?.map((nodeData) => (
        <FigmaNodeListItem
          key={nodeData.id}
          checkedNodes={checkedNodes}
          depth={depth + 1}
          setCheckedNodes={setCheckedNodes}
          {...nodeData}
        />
      ))}
    </VStack>
  );
};
