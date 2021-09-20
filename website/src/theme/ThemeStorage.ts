import { Spectrum } from '@cbhq/cds-common';

const themeStorageKey = 'cds-website-theme';
export function updateThemeStorage(spectrum: Spectrum) {
  localStorage?.setItem(themeStorageKey, spectrum);
}

export function getThemeStorage(): Spectrum {
  return localStorage?.getItem(themeStorageKey) as Spectrum;
}
