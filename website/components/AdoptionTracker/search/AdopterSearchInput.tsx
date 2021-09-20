import { Select, Tag } from 'antd';
import React, { memo, useContext, useState } from 'react';
import { TextLabel1, TextLabel2 } from '@cbhq/cds-web/typography';
import { CustomTagProps } from 'rc-select/lib/interface/generator';
import { Box } from '@cbhq/cds-web/layout';
import {
  AdopterSearchResult,
  AdopterSearchResultType,
  ComponentData,
} from ':cds-website/components/AdoptionTracker/types';
import { AdopterSearchContext, AdopterSearchContextType } from './AdopterSearchProvider';
import './ant-styles.css';

const { Option, OptGroup } = Select;

type AdoptionTrackerSearchInputProps = {
  components: ComponentData[];
};

export const AdopterSearchPrefix = '~~~~~';
function generateComponentId(name: string) {
  return `component${AdopterSearchPrefix}${name}`;
}

function generatePropId(name: string) {
  return `prop${AdopterSearchPrefix}${name}`;
}

function getSearchResultFromId(id: string): AdopterSearchResult {
  const [type, val] = id.split(AdopterSearchPrefix);
  return {
    type: type as AdopterSearchResultType,
    val,
  };
}

const onPreventMouseDown = (event: React.MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

const tagStyle = {
  marginRight: 3,
};

function tagRender(props: CustomTagProps) {
  const { value, closable, onClose } = props;

  const { type, val } = getSearchResultFromId(value as string);

  return (
    <Tag onMouseDown={onPreventMouseDown} closable={closable} onClose={onClose} style={tagStyle}>
      <TextLabel2 as="span" spacingEnd={1}>
        {val}
      </TextLabel2>
      <TextLabel1 as="span">{type}</TextLabel1>
    </Tag>
  );
}

function getOptions(components: ComponentData[], searchValue: string) {
  const componentNames = [];
  const componentPropsSet = new Set<string>();

  const maxDropdownResults = 5;
  for (const component of components) {
    const { name, propsWithCallSites } = component;
    const props = propsWithCallSites ? Object.keys(propsWithCallSites) : [];

    if (componentNames.length < maxDropdownResults) {
      if (name.toLowerCase().includes(searchValue.toLowerCase())) {
        componentNames.push(name);
      }
    }

    for (const prop of props) {
      if (componentPropsSet.size < maxDropdownResults) {
        if (prop.toLowerCase().includes(searchValue.toLowerCase())) {
          componentPropsSet.add(prop);
        }
      } else {
        break;
      }
    }

    if (
      componentNames.length >= maxDropdownResults &&
      componentPropsSet.size >= maxDropdownResults
    ) {
      break;
    }
  }

  componentNames.sort((n1, n2) => n1.localeCompare(n2));
  const componentProps = Array.from(componentPropsSet).sort((p1, p2) => p1.localeCompare(p2));

  const componentNameOptions: React.ReactNode[] = componentNames.map((name: string) => (
    <Option key={generateComponentId(name)} value={generateComponentId(name)}>
      {name}
    </Option>
  ));

  const componentPropOptions: React.ReactNode[] = componentProps.map((name: string) => (
    <Option key={generatePropId(name)} value={generatePropId(name)}>
      {name}
    </Option>
  ));

  // support free text search
  if (searchValue !== '') {
    const searchValueWithQuotes = `"${searchValue}"`;
    componentNameOptions.push(
      <Option
        key={generateComponentId(searchValueWithQuotes)}
        value={generateComponentId(searchValueWithQuotes)}
      >
        {searchValueWithQuotes}
      </Option>,
    );

    componentPropOptions.push(
      <Option
        key={generatePropId(searchValueWithQuotes)}
        value={generatePropId(searchValueWithQuotes)}
      >
        {searchValueWithQuotes}
      </Option>,
    );
  }

  const groups: React.ReactNode[] = [];
  if (componentNameOptions.length > 0 && componentPropOptions.length > 0) {
    groups.push(
      <OptGroup key="components" label="Components">
        {componentNameOptions}
      </OptGroup>,
    );

    groups.push(
      <OptGroup key="props" label="Props">
        {componentPropOptions}
      </OptGroup>,
    );
  } else if (componentNameOptions.length > 0) {
    return componentNameOptions;
  } else if (componentPropOptions.length > 0) {
    return componentPropOptions;
  }

  return groups;
}

const selectStyle: React.CSSProperties = {
  width: '100%',
};

export const AdopterSearchInput = memo(({ components }: AdoptionTrackerSearchInputProps) => {
  const [searchValue, setSearchValue] = useState('');
  const { setResults } = useContext(AdopterSearchContext) as AdopterSearchContextType;

  function handleChange(values: string[]) {
    setSearchValue('');

    const results: AdopterSearchResult[] = values.map((id: string) => getSearchResultFromId(id));
    setResults(results);
  }

  function handleSearch(value: string) {
    setSearchValue(value);
  }

  return (
    <Box width={450} spacingBottom={2}>
      <Select
        mode="multiple"
        allowClear
        style={selectStyle}
        tagRender={tagRender}
        placeholder="Search"
        onChange={handleChange}
        onSearch={handleSearch}
        searchValue={searchValue}
        filterOption={false}
        listHeight={500}
      >
        {getOptions(components, searchValue)}
      </Select>
    </Box>
  );
});
