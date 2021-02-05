import React from 'react';

import { css } from 'linaria';

const tableStyles = css`
  display: table;
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  text-align: left;
  li {
    list-style-type: none;
  }
  ul {
    padding-left: 0;
    margin-bottom: 0;
  }

  thead,
  tbody,
  tr,
  th,
  td {
    width: 100%;
  }

  td {
    vertical-align: top;
  }
`;

type ApiDetailsProps = {
  componentName: string;
  propertyName: string;
  required: boolean;
  mobileOptions: string[];
  webOptions: string[];
  defaultValue?: string;
};

const offsetSpacingProps = ['all', 'top', 'bottom', 'start', 'end', 'horizontal', 'vertical'];

export const ApiDetails = ({
  componentName,
  mobileOptions,
  webOptions,
  propertyName,
  defaultValue,
  required,
}: ApiDetailsProps) => {
  const formatOptions = React.useCallback(
    (options: string[]) => {
      if (options.length === 2 && options.includes('true')) {
        return <code>boolean</code>;
      }

      if (options.length === 2 && options.includes('string')) {
        return <code>{`${options[0]} | ${options[1]}`}</code>;
      }

      if (
        propertyName.includes('spacing') ||
        (componentName === 'Offset' && offsetSpacingProps.includes(propertyName))
      ) {
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
    },
    [componentName, propertyName]
  );

  const formattedWebOptions = formatOptions(webOptions);
  const formattedMobileOptions = formatOptions(mobileOptions);
  const stringifiedWebOptions = JSON.stringify(webOptions.sort());
  const stringifiedMobileOptions = JSON.stringify(mobileOptions.sort());
  const optionsAreEqual = stringifiedWebOptions === stringifiedMobileOptions;

  return (
    <table className={tableStyles}>
      <thead>
        <tr>
          {optionsAreEqual && <th>Options</th>}
          {!optionsAreEqual && webOptions.length > 0 && <th>Web options</th>}
          {!optionsAreEqual && mobileOptions.length > 0 && <th>Mobile options</th>}
          {required && <th>Required</th>}
          {defaultValue && <th>Default</th>}
        </tr>
      </thead>
      <tbody>
        <tr>
          {optionsAreEqual && <td>{formattedWebOptions}</td>}
          {!optionsAreEqual && webOptions.length > 0 && <td>{formattedWebOptions}</td>}
          {!optionsAreEqual && mobileOptions.length > 0 && <td>{formattedMobileOptions}</td>}
          {required && <td>{`${required}`}</td>}
          {defaultValue && <td>{`${defaultValue}`}</td>}
        </tr>
      </tbody>
    </table>
  );
};
