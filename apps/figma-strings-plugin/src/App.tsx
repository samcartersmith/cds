import 'react-figma-plugin-ds/figma-plugin-ds.css';
import './styles.css';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Checkbox,
  Disclosure,
  Input,
  Select,
  SelectOption,
  Text,
} from 'react-figma-plugin-ds';
import * as contentful from 'contentful';

import type { Content, FigmaMessage, Locale } from './types';

const DEFAULT_LOCALE = 'en';

const client = contentful.createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_TOKEN,
  environment: import.meta.env.VITE_CONTENTFUL_ENV,
});

function App() {
  const [strings, setStrings] = useState<Content[]>();
  const [displayMode, setDisplayMode] = useState<'text' | 'key'>('text');
  const [localeOption, setLocaleOption] = useState<Locale>(DEFAULT_LOCALE);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStrings = useCallback(async () => {
    const response = await client.getEntries({
      content_type: 'localizedContent',
      limit: 1000,
      locale: '*',
    });

    const data = response.items.map((item) => item.fields);
    setStrings(data as Content[]);
  }, []);

  useEffect(() => {
    void fetchStrings();
  }, [fetchStrings]);

  const filteredStrings = useMemo(() => {
    if (strings && searchTerm) {
      return strings?.filter(
        (str) =>
          str.text[localeOption].includes(searchTerm) || str.key[localeOption].includes(searchTerm),
      );
    }
    return [];
  }, [searchTerm, strings, localeOption]);

  const handleSearchChange = useCallback((value: string) => setSearchTerm(value), []);

  const handlePostMessage = useCallback(
    (pluginMessage: FigmaMessage) => window?.parent.postMessage({ pluginMessage }, '*'),
    [],
  );

  const handleLocaleChange = useCallback((option: SelectOption) => {
    setLocaleOption(option.value as Locale);
  }, []);

  const localeOptions = useMemo(() => {
    return [
      {
        label: 'English',
        value: 'en',
      },
      {
        label: '中文',
        value: 'zh-CN',
      },
    ];
  }, []);

  const handleToggleDisplayMode = useCallback(() => {
    const targetMode = displayMode === 'text' ? 'key' : 'text';

    handlePostMessage({
      type: 'toggle-display-mode',
      strings,
      displayMode: targetMode,
      locale: localeOption,
    });
    setDisplayMode(targetMode);
  }, [displayMode, handlePostMessage, localeOption, strings]);

  const handleApply = useCallback(() => {
    handlePostMessage({
      type: 'populate-strings',
      strings,
      locale: localeOption,
    });
  }, [localeOption, strings, handlePostMessage]);

  const stringList = searchTerm ? filteredStrings : strings;

  return (
    <div className="App" tabIndex={-1}>
      <div className="selection-controls">
        <Button isSecondary onClick={fetchStrings}>
          Refresh
        </Button>
        <Checkbox
          label={`Show ${displayMode === 'text' ? 'key' : 'text'}`}
          onChange={handleToggleDisplayMode}
          type="switch"
        />
      </div>
      <div className="search-input">
        <Input icon="search" onChange={handleSearchChange} placeholder="Search strings" />
      </div>
      <Disclosure isSection label="Strings">
        {stringList?.map((string) => (
          <div key={string.key[DEFAULT_LOCALE]}>
            <Text>
              {string.key[DEFAULT_LOCALE]}: {string.text[localeOption]}
            </Text>
          </div>
        ))}
      </Disclosure>
      <div className="divider" />
      <div className="selection-controls">
        <div>
          <Select
            defaultValue={localeOption}
            onChange={handleLocaleChange}
            options={localeOptions}
            placeholder="Select Locale"
          />
        </div>
        <Button onClick={handleApply}>Apply</Button>
      </div>
    </div>
  );
}

export default App;
