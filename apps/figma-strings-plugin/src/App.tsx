/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import 'react-figma-plugin-ds/figma-plugin-ds.css';
import './styles.css';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, Icon, Input, Select, SelectOption, Text } from 'react-figma-plugin-ds';
import {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
  init as InitAnalytics,
  logEvent,
  PlatformName,
} from '@cbhq/client-analytics';

import { useFilteredStrings, useLocales, useStrings } from './hooks';
import type { FigmaMessage } from './types';

InitAnalytics({
  batchEventsPeriod: 0,
  isProd: import.meta.env.PROD,
  showDebugLogging: !import.meta.env.PROD,
  platform: PlatformName.ios,
  projectName: 'cds_strings_plugin',
  version: '1.0.0',
});

let currentUser: User | null = null;

window?.addEventListener('message', (event) => {
  if (event.data.pluginMessage.type === 'current-user') {
    currentUser = event.data.pluginMessage.user as User;
  }
});

function App() {
  const [displayMode, setDisplayMode] = useState<'text' | 'key'>('text');
  const [localeOption, setLocaleOption] = useState<string>();
  const [isStringsVisible, setIsStringsVisible] = useState(false);
  const { strings, fetchStrings } = useStrings();
  const { locales, defaultLocale } = useLocales();
  const { filteredStrings, searchTerm, handleSearchChange } = useFilteredStrings(
    strings,
    localeOption,
  );

  useEffect(() => {
    if (defaultLocale) {
      setLocaleOption(defaultLocale);
    }
  }, [defaultLocale]);

  const handlePostMessage = useCallback(
    (pluginMessage: FigmaMessage) => window?.parent.postMessage({ pluginMessage }, '*'),
    [],
  );

  const handleLocaleChange = useCallback((option: SelectOption) => {
    setLocaleOption(option.value as string);
  }, []);

  const localeOptions = useMemo(() => {
    return locales.map((locale) => ({
      label: locale.name,
      value: locale.code,
    }));
  }, [locales]);

  const handleToggleDisplayMode = useCallback(() => {
    const targetMode = displayMode === 'text' ? 'key' : 'text';

    if (localeOption) {
      handlePostMessage({
        type: 'toggle-display-mode',
        strings,
        displayMode: targetMode,
        locale: localeOption,
      });
    }
    setDisplayMode(targetMode);
  }, [displayMode, handlePostMessage, localeOption, strings]);

  const handleApply = useCallback(() => {
    logEvent(
      'apply_strings',
      {
        action: ActionType.click,
        componentType: ComponentType.unknown,
        selectedLocale: localeOption,
        figmaUserId: currentUser?.id,
        figmaUserName: currentUser?.name,
      },
      AnalyticsEventImportance.high,
    );

    if (localeOption) {
      handlePostMessage({
        type: 'populate-strings',
        strings,
        locale: localeOption,
      });
    }
  }, [localeOption, strings, handlePostMessage]);

  const toggleStringsVisibility = useCallback(() => {
    setIsStringsVisible(!isStringsVisible);
  }, [isStringsVisible]);

  const stringList = searchTerm ? filteredStrings : strings;

  if (!defaultLocale) {
    return null;
  }

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
      <div className="strings-list-container">
        <div className="strings-toggle" onClick={toggleStringsVisibility}>
          <Icon name={isStringsVisible ? 'caret-down' : 'caret-right'} />
          <Text weight="bold">{isStringsVisible ? 'Hide' : 'Show'} strings</Text>
        </div>
        {isStringsVisible && (
          <>
            <Input icon="search" onChange={handleSearchChange} placeholder="Search strings" />
            <div className="strings-list">
              {stringList?.map((string) => {
                const key = string.key[defaultLocale];
                const text = localeOption && string.text[localeOption];

                return (
                  <Text key={key}>
                    {key}: {text}
                  </Text>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="divider" />
      <div className="selection-controls">
        <Select
          defaultValue={defaultLocale}
          onChange={handleLocaleChange}
          options={localeOptions}
          placeholder="Select Locale"
        />
        <Button onClick={handleApply}>Apply</Button>
      </div>
    </div>
  );
}

export default App;
