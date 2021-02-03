import React from 'react';

import { css } from 'linaria';

const tableStyles = css`
  display: table;
  border-collapse: collapse;
  width: 100%;

  thead,
  tbody,
  tr,
  th,
  td {
    width: 100%;
    white-space: nowrap;
  }

  thead th:first-child {
    text-align: left;
  }

  td {
    vertical-align: top;
  }
`;

type ApiDetailsProps = {
  propertyName: string;
  required: boolean;
  mobileOptions: string[];
  webOptions: string[];
  webReference?: string;
  webDescription?: string;
  mobileReference?: string;
  mobileDescription?: string;
  defaultValue?: string;
};

export const ApiDetails = ({
  // mobileOptions,
  webOptions,
  propertyName,
  defaultValue,
  required,
}: ApiDetailsProps) => {
  // TODO: show web and mobile options as separate content in same table
  const options = webOptions;
  const formattedOptions = React.useMemo(() => {
    if (options.length === 2 && options.includes('true')) {
      return <code>boolean</code>;
    }

    if (options.length === 2 && options.includes('string')) {
      return <code>{`${options[0]} | ${options[1]}`}</code>;
    }

    if (propertyName.includes('spacing')) {
      return <code>{'0 - 10'}</code>;
    }

    return (
      <ul>
        {options.map(item => (
          <li key={`${propertyName}_${item}`}>
            <code>{item}</code>
          </li>
        ))}
      </ul>
    );
  }, [options, propertyName]);

  return (
    <table className={tableStyles}>
      <thead>
        <tr>
          <th>Options</th>
          {required && <th>Required</th>}
          {defaultValue && <th>Default</th>}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{formattedOptions}</td>
          {required && <td>{`${required}`}</td>}
          {defaultValue && <td>{`${defaultValue}`}</td>}
        </tr>
      </tbody>
    </table>
  );
};
