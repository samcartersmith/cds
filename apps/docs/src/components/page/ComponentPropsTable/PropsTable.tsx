import React from 'react';

import PropsTableRow from './PropsTableRow';
import { PropsTableProps } from './types';

function PropsTable({ props, sharedTypeAliases, searchTerm }: PropsTableProps) {
  return (
    <div
      style={{
        maxWidth: '100%',
        overflow: 'hidden',
        borderRadius: 'var(--borderRadius-400)',
      }}
    >
      <table>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Name</th>
            <th style={{ width: '40%' }}>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {props.map((item) => (
            <PropsTableRow
              key={item.name}
              prop={item}
              searchTerm={searchTerm}
              sharedTypeAliases={sharedTypeAliases}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropsTable;
