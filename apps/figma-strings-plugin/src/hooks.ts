import { useCallback, useEffect, useMemo, useState } from 'react';
import * as contentful from 'contentful';

import { DEFAULT_LOCALE } from './configs';
import { Content } from './types';

const client = contentful.createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_TOKEN,
  environment: import.meta.env.VITE_CONTENTFUL_ENV,
  host: !import.meta.env.PROD ? 'preview.contentful.com' : undefined, // use preview API for non-prod environment
});

export const useStrings = () => {
  const [strings, setStrings] = useState<Content[]>();

  const fetchStrings = useCallback(async () => {
    const response = await client.getEntries({
      content_type: 'string',
      limit: 1000,
      locale: '*',
    });

    const data = response.items.map((item) => item.fields);
    setStrings(data as Content[]);
  }, []);

  useEffect(() => {
    void fetchStrings();
  }, [fetchStrings]);

  return { strings, fetchStrings };
};

export const useLocales = () => {
  const [locales, setLocales] = useState<contentful.Locale[]>([]);

  const fetchLocales = useCallback(async () => {
    const response = await client.getLocales();
    const localeResponse = response.items;
    setLocales(localeResponse);
  }, []);

  useEffect(() => {
    void fetchLocales();
  }, [fetchLocales]);

  return { locales, defaultLocale: locales.find((l) => l.default)?.code };
};

export const useFilteredStrings = (strings?: Content[], localeOption?: string) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = useCallback((value: string) => setSearchTerm(value), []);

  return useMemo(() => {
    let filteredStrings: Content[] = [];

    if (strings && searchTerm) {
      try {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        // Filter by text only when locale is English
        if (localeOption === DEFAULT_LOCALE) {
          filteredStrings = strings?.filter(
            (str) =>
              str.text[localeOption].toLowerCase().includes(lowerCaseSearchTerm) ||
              str.key.en.toLowerCase().includes(lowerCaseSearchTerm),
          );
        }

        filteredStrings = strings?.filter((str) =>
          str.key.en.toLowerCase().includes(lowerCaseSearchTerm),
        );
      } catch {
        // eslint-disable-next-line no-console
        console.error('Something went wrong, please revise your search.');
      }
    }

    return {
      filteredStrings,
      handleSearchChange,
      searchTerm,
    };
  }, [searchTerm, strings, localeOption, handleSearchChange]);
};
