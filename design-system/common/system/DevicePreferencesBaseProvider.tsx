import type { RootScalePreference, RootSpectrumPreference } from '../index';

export type DevicePreferencesBaseProviderProps = {
  /** Only use if you are passing in a value from a user preference since this will override device scale preference. You are also able to update the root scale imperatively via useRootScaleUpdater. */
  scale?: RootScalePreference;
  /** Pass in value from React Native's useColorScheme or some other user preference. You are also able to update the root spectrum imperatively via useRootSpectrumPreferenceUpdater. */
  spectrum?: RootSpectrumPreference;
};
