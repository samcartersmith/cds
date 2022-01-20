/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */

import { ThemeConfig } from '../types';

const palette = {
  foreground: 'gray100',
  foregroundMuted: 'gray60',
  background: 'gray0',
  backgroundAlternate: 'gray5',
  backgroundOverlay: ['gray80', 0.33],
  line: ['gray60', 0.2],
  lineHeavy: ['gray60', 0.66],
  primary: 'blue60',
  primaryWash: 'blue0',
  primaryForeground: 'gray0',
  negative: 'red60',
  negativeForeground: 'gray0',
  positive: 'green60',
  positiveForeground: 'gray0',
  secondary: 'gray0',
  secondaryForeground: 'gray100',
  transparent: ['gray0', 0],
} as const;

const config = {
  name: 'base',
  light: {
    palette,
    rgbaStrings: {
      foreground: 'rgba(10,11,13,1)',
      foregroundMuted: 'rgba(91,97,110,1)',
      background: 'rgba(255,255,255,1)',
      backgroundAlternate: 'rgba(238,240,243,1)',
      backgroundOverlay: 'rgba(50,53,61,0.33)',
      line: 'rgba(91,97,110,0.2)',
      lineHeavy: 'rgba(91,97,110,0.66)',
      primary: 'rgba(0,82,255,1)',
      primaryWash: 'rgba(245,248,255,1)',
      primaryForeground: 'rgba(255,255,255,1)',
      negative: 'rgba(207,32,47,1)',
      negativeForeground: 'rgba(255,255,255,1)',
      positive: 'rgba(9,133,81,1)',
      positiveForeground: 'rgba(255,255,255,1)',
      secondary: 'rgba(255,255,255,1)',
      secondaryForeground: 'rgba(10,11,13,1)',
      transparent: 'rgba(255,255,255,0)',
    },
    hexValues: {
      foreground: '#0a0b0d',
      foregroundMuted: '#5b616e',
      background: '#ffffff',
      backgroundAlternate: '#eef0f3',
      backgroundOverlay: '#32353d',
      line: '#5b616e',
      lineHeavy: '#5b616e',
      primary: '#0052ff',
      primaryWash: '#f5f8ff',
      primaryForeground: '#ffffff',
      negative: '#cf202f',
      negativeForeground: '#ffffff',
      positive: '#098551',
      positiveForeground: '#ffffff',
      secondary: '#ffffff',
      secondaryForeground: '#0a0b0d',
      transparent: '#ffffff',
    },
    interactableTokens: {
      foreground: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(162, 162, 163)' },
        pressed: { contentOpacity: 0.82, backgroundColor: 'rgb(54, 55, 57)' },
      },
      foregroundMuted: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(193, 195, 200)' },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(80, 85, 96)' },
      },
      background: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(255, 255, 255)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(235, 235, 236)' },
      },
      backgroundAlternate: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(249, 249, 250)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(220, 222, 225)' },
      },
      backgroundOverlay: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(177, 178, 181)' },
        pressed: { contentOpacity: 0.84, backgroundColor: 'rgb(83, 85, 92)' },
      },
      line: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(193, 195, 200)' },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(80, 85, 96)' },
      },
      lineHeavy: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(193, 195, 200)' },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(80, 85, 96)' },
      },
      primary: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(158, 189, 255)' },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(1, 72, 221)' },
      },
      primaryWash: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(251, 252, 255)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(226, 229, 236)' },
      },
      primaryForeground: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(255, 255, 255)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(235, 235, 236)' },
      },
      negative: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(237, 170, 176)' },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(179, 29, 42)' },
      },
      negativeForeground: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(255, 255, 255)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(235, 235, 236)' },
      },
      positive: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(162, 209, 189)' },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(9, 116, 71)' },
      },
      positiveForeground: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(255, 255, 255)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(235, 235, 236)' },
      },
      secondary: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(255, 255, 255)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(235, 235, 236)' },
      },
      secondaryForeground: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(162, 162, 163)' },
        pressed: { contentOpacity: 0.82, backgroundColor: 'rgb(54, 55, 57)' },
      },
      transparent: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'transparent' },
        pressed: { contentOpacity: 0.82, backgroundColor: 'transparent' },
      },
    },
    name: 'base-light',
  },
  dark: {
    palette,
    rgbaStrings: {
      foreground: 'rgba(255,255,255,1)',
      foregroundMuted: 'rgba(138,145,158,1)',
      background: 'rgba(10,11,13,1)',
      backgroundAlternate: 'rgba(20,21,25,1)',
      backgroundOverlay: 'rgba(193,198,207,0.33)',
      line: 'rgba(138,145,158,0.2)',
      lineHeavy: 'rgba(138,145,158,0.66)',
      primary: 'rgba(55,115,245,1)',
      primaryWash: 'rgba(0,16,51,1)',
      primaryForeground: 'rgba(10,11,13,1)',
      negative: 'rgba(240,97,109,1)',
      negativeForeground: 'rgba(10,11,13,1)',
      positive: 'rgba(39,173,117,1)',
      positiveForeground: 'rgba(10,11,13,1)',
      secondary: 'rgba(10,11,13,1)',
      secondaryForeground: 'rgba(255,255,255,1)',
      transparent: 'rgba(10,11,13,0)',
    },
    hexValues: {
      foreground: '#ffffff',
      foregroundMuted: '#8a919e',
      background: '#0a0b0d',
      backgroundAlternate: '#141519',
      backgroundOverlay: '#c1c6cf',
      line: '#8a919e',
      lineHeavy: '#8a919e',
      primary: '#3773f5',
      primaryWash: '#001033',
      primaryForeground: '#0a0b0d',
      negative: '#f0616d',
      negativeForeground: '#0a0b0d',
      positive: '#27ad75',
      positiveForeground: '#0a0b0d',
      secondary: '#0a0b0d',
      secondaryForeground: '#ffffff',
      transparent: '#0a0b0d',
    },
    interactableTokens: {
      foreground: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(103, 104, 105)' },
        pressed: { contentOpacity: 0.82, backgroundColor: 'rgb(211, 211, 211)' },
      },
      foregroundMuted: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(59, 62, 68)' },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(154, 160, 172)' },
      },
      background: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(10, 11, 13)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(30, 31, 32)' },
      },
      backgroundAlternate: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(14, 15, 18)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(39, 40, 43)' },
      },
      backgroundOverlay: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(80, 82, 87)' },
        pressed: { contentOpacity: 0.84, backgroundColor: 'rgb(164, 168, 176)' },
      },
      line: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(59, 62, 68)' },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(154, 160, 172)' },
      },
      lineHeavy: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(59, 62, 68)' },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(154, 160, 172)' },
      },
      primary: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(27, 51, 101)' },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(83, 135, 246)' },
      },
      primaryWash: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(6, 13, 27)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(20, 35, 67)' },
      },
      primaryForeground: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(10, 11, 13)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(30, 31, 32)' },
      },
      negative: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(97, 44, 49)' },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(242, 119, 129)' },
      },
      negativeForeground: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(10, 11, 13)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(30, 31, 32)' },
      },
      positive: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(21, 73, 53)' },
        pressed: { contentOpacity: 0.86, backgroundColor: 'rgb(69, 184, 136)' },
      },
      positiveForeground: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(10, 11, 13)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(30, 31, 32)' },
      },
      secondary: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(10, 11, 13)' },
        pressed: { contentOpacity: 0.92, backgroundColor: 'rgb(30, 31, 32)' },
      },
      secondaryForeground: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'rgb(103, 104, 105)' },
        pressed: { contentOpacity: 0.82, backgroundColor: 'rgb(211, 211, 211)' },
      },
      transparent: {
        disabled: { contentOpacity: 0.38, backgroundColor: 'transparent' },
        pressed: { contentOpacity: 0.82, backgroundColor: 'transparent' },
      },
    },
    name: 'base-dark',
  },
} as const;

export const themeBase: ThemeConfig = config;
