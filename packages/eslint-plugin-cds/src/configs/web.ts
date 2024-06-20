/**
 * For web, Coinbase's cbhq eslint rules use jsx-a11y rules as part of the eslint-plugin-airbnb a11y rules.
 * We need to ensure that we override the jsx-a11y/control-has-associated-label.
 *
 * Note: We have jsx-a11y as a plugin. This makes the plugin's rules available to be turned on or off in our configuration.
 * It's a more selective approach that requires you to manually specify which rules to enable.
 * (As opposed to extending which is used to inherit configurations from a set of predefined rules.)
 */

export const webConfig = {
  plugins: ['jsx-a11y'],
  rules: {
    '@cbhq/cds/control-has-associated-label-extended': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'jsx-a11y/control-has-associated-label': [
          'warn',
          {
            controlComponents: [
              'Button',
              'Checkbox',
              'InputChip',
              'IconButton',
              'IconCounterButton',
              'Pressable',
              'Switch',
              'TextInput',
            ],
            depth: 3,
            labelAttributes: ['label', 'accessibilityLabel'],
          },
        ],
      },
    },
  ],
};
