/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import React, { useCallback } from 'react';
import type { Property } from 'csstype';
import type { ThemeConfig } from '@cbhq/cds-web2/core/theme';
import { Dropdown } from '@cbhq/cds-web2/dropdown';
import { Box, VStack } from '@cbhq/cds-web2/layout';
import { Pressable } from '@cbhq/cds-web2/system';
import { defaultTheme } from '@cbhq/cds-web2/themes/defaultTheme';

import {
  useDocsTheme,
  usePlaygroundTheme,
} from '../../../theme/Layout/Provider/UnifiedThemeContext';

const COLOR_OPTIONS: {
  label: string;
  lightValue: Property.Color;
  darkValue: Property.Color;
}[] = [
  {
    label: 'Green theme',
    lightValue: `rgb(${defaultTheme.lightSpectrum.green50})`,
    darkValue: `rgb(${defaultTheme.darkSpectrum.green60})`,
  },
  {
    label: 'Red theme',
    lightValue: `rgb(${defaultTheme.lightSpectrum.red50})`,
    darkValue: `rgb(${defaultTheme.darkSpectrum.red60})`,
  },
  {
    label: 'Purple theme',
    lightValue: `rgb(${defaultTheme.lightSpectrum.purple50})`,
    darkValue: `rgb(${defaultTheme.darkSpectrum.purple60})`,
  },
  {
    label: 'Blue theme',
    lightValue: `rgb(${defaultTheme.lightSpectrum.blue50})`,
    darkValue: `rgb(${defaultTheme.darkSpectrum.blue70})`,
  },
] as const;

const NavbarThemeToggle = () => {
  const { theme: docsTheme, setTheme: setDocsTheme, colorScheme } = useDocsTheme();
  const { setTheme: setPlaygroundTheme } = usePlaygroundTheme();

  /**
   * Core theme update function that handles updating both the docs and playground themes.
   * Takes a color option containing both light and dark values and updates the respective
   * theme configurations with those colors.
   *
   * @param option Object containing lightValue and darkValue for the selected color
   */
  const toggleTheme = useCallback(
    (option: { lightValue: Property.Color; darkValue: Property.Color }) => {
      const newDocsTheme = {
        ...docsTheme,
        light: {
          ...defaultTheme.light,
          ...docsTheme.light,
          bgPrimary: option.lightValue,
          fgPrimary: option.lightValue,
        },
        dark: {
          ...defaultTheme.dark,
          ...docsTheme.dark,
          bgPrimary: option.darkValue,
          fgPrimary: option.darkValue,
        },
      } satisfies ThemeConfig;

      const newPlaygroundTheme = {
        ...defaultTheme,
        light: {
          ...defaultTheme.light,
          bgPrimary: option.lightValue,
          fgPrimary: option.lightValue,
        },
        dark: {
          ...defaultTheme.dark,
          bgPrimary: option.darkValue,
          fgPrimary: option.darkValue,
        },
      } satisfies ThemeConfig;

      setDocsTheme(newDocsTheme);
      setPlaygroundTheme(newPlaygroundTheme);
    },
    [docsTheme, setDocsTheme, setPlaygroundTheme],
  );

  /**
   * Handles direct clicks on the radio buttons in the dropdown content.
   * Converts a color option to the appropriate color value based on the current
   * color scheme and passes it to handleDropdownChange to maintain consistency
   * with the dropdown's value.
   *
   * @param option The color option object from COLOR_OPTIONS
   */
  const handleClick = useCallback(
    (option: (typeof COLOR_OPTIONS)[number]) => {
      const value = colorScheme === 'light' ? option.lightValue : option.darkValue;
      const selectedOption = COLOR_OPTIONS.find(
        (option) => option[colorScheme === 'light' ? 'lightValue' : 'darkValue'] === value,
      );
      if (selectedOption) toggleTheme(selectedOption);
    },
    [colorScheme, toggleTheme],
  );

  /**
   * Handles keyboard interactions (Enter/Space) for accessibility.
   * When a valid key is pressed, prevents default behavior and
   * triggers the same flow as clicking the radio button.
   *
   * @param option The color option object from COLOR_OPTIONS
   * @returns Event handler for keydown events
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, option: (typeof COLOR_OPTIONS)[number]) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick(option);
      }
    },
    [handleClick],
  );

  const currentColor = docsTheme[colorScheme]?.bgPrimary;

  return (
    <Dropdown
      aria-label="Open theme color selector"
      content={
        <VStack
          alignItems="center"
          alignSelf="center"
          aria-label="Theme color options"
          background="bgSecondary"
          gap={1.5}
          padding={1.5}
          role="radiogroup"
        >
          {COLOR_OPTIONS.map((option) => {
            const value = colorScheme === 'light' ? option.lightValue : option.darkValue;
            return (
              <Box
                key={option.label}
                aria-checked={currentColor === value}
                aria-label={option.label}
                as="button"
                borderRadius={1000}
                height={16}
                onClick={() => handleClick(option)}
                onKeyDown={(event) => handleKeyDown(event, option)}
                role="radio"
                style={{
                  background: value,
                  cursor: 'pointer',
                  border: currentColor === value ? '2px solid currentColor' : 'none',
                }}
                tabIndex={0}
                width={16}
              />
            );
          })}
        </VStack>
      }
      contentPosition={{ gap: 0.5, skid: 0 }}
      value={currentColor}
    >
      <Pressable
        alignContent="center"
        alignItems="center"
        aria-label="Current theme color"
        as="button"
        background="bgSecondary"
        borderRadius={1000}
        height={40}
        justifyContent="center"
        style={{ cursor: 'pointer' }}
        width={40}
      >
        <Box background="bgPrimary" borderRadius={1000} padding={1} />
      </Pressable>
    </Dropdown>
  );
};

export default NavbarThemeToggle;
