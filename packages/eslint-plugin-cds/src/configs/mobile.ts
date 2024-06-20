/**
 * For mobile, Coinbase's cbhq eslint rules use react-native-a11y rules.
 * We need to ensure that we override the react-native-a11y/has-accessibility-hint.
 *
 * Note: We have react-native-a11y as a plugin. This makes the plugin's rules available to be turned on or off in our configuration.
 * It's a more selective approach that requires you to manually specify which rules to enable.
 * (As opposed to extending which is used to inherit configurations from a set of predefined rules.)
 */

export const mobileConfig = {
  plugins: ['react-native-a11y'],
  rules: {
    'react-native-a11y/has-accessibility-hint': 'off',
    '@cbhq/cds/has-valid-accessibility-descriptors-extended': 'warn',
  },
};
