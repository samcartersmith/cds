import { useCallback } from 'react';
import { css, cx } from 'linaria';

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

  &.single-platform {
    ul {
      display: flex;
      margin: 0;
      flex-wrap: wrap;
    }

    li {
      margin: 0;
      margin-right: 8px;
    }
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

export const ApiDetails = ({
  componentName,
  mobileOptions,
  webOptions,
  propertyName,
  defaultValue,
  required,
}: ApiDetailsProps) => {
  const formatOptions = useCallback(
    (options: string[]) => {
      if (propertyName.includes('spacing') || propertyName.includes('offset')) {
        return <code>0 - 10</code>;
      }

      if (propertyName === 'palette') {
        return <code>PartialPaletteConfig</code>;
      }

      if (propertyName === 'dangerouslySetStyle') {
        const styleType = componentName === 'Text' ? 'TextStyles' : 'ViewStyles';

        return (
          <code>{`StyleProp<${styleType}> | Animated.WithAnimatedValue<StyleProp<${styleType}>>`}</code>
        );
      }

      if (options.length === 2 && options.includes('true')) {
        return <code>boolean</code>;
      }

      if (options.length === 2 && options.includes('string')) {
        return <code>{`${options[0]} | ${options[1]}`}</code>;
      }

      if (
        options.length >= 1 &&
        options.includes('ReactElement<any, string | JSXElementConstructor<any>>') &&
        options.includes('ReactNodeArray')
      ) {
        return <code>ReactNode</code>;
      }

      if (options.length >= 10 && options.includes('allTimeHigh')) {
        return <code>IconName</code>;
      }

      return (
        <ul>
          {options.map((item) => (
            <li key={`${propertyName}_${item}`}>
              <code>{item}</code>
            </li>
          ))}
        </ul>
      );
    },
    [componentName, propertyName],
  );

  const formattedWebOptions = formatOptions(webOptions);
  const formattedMobileOptions = formatOptions(mobileOptions);
  const stringifiedWebOptions = JSON.stringify(webOptions.sort());
  const stringifiedMobileOptions = JSON.stringify(mobileOptions.sort());
  const optionsAreEqual = stringifiedWebOptions === stringifiedMobileOptions;
  const isSinglePlatform =
    (webOptions.length > 0 && mobileOptions.length === 0) ||
    (webOptions.length === 0 && mobileOptions.length > 0);

  return (
    <table className={cx(tableStyles, (optionsAreEqual || isSinglePlatform) && 'single-platform')}>
      <thead>
        <tr>
          {optionsAreEqual && <th>Options</th>}
          {!optionsAreEqual && webOptions.length > 0 && <th>Web options</th>}
          {!optionsAreEqual && mobileOptions.length > 0 && <th>Mobile options</th>}
          {required && <th>Required</th>}
          {!!defaultValue && <th>Default</th>}
        </tr>
      </thead>
      <tbody>
        <tr>
          {optionsAreEqual && <td>{formattedWebOptions}</td>}
          {!optionsAreEqual && webOptions.length > 0 && <td>{formattedWebOptions}</td>}
          {!optionsAreEqual && mobileOptions.length > 0 && <td>{formattedMobileOptions}</td>}
          {required && <td>{`${required}`}</td>}
          {!!defaultValue && <td>{`${defaultValue}`}</td>}
        </tr>
      </tbody>
    </table>
  );
};
