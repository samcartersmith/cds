const isTestingEnvironment = process.env.NODE_ENV === 'test';

module.exports = {
  plugins: [],
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [
    {
      presets: ['@babel/preset-flow'],
      test: /node_modules\/((jest-)?react-native|@react-native(-community)?)/iu,
    },
  ],
};

const plugins = [];

const envOptions = {
  bugfixes: true,
  modules: isTestingEnvironment ? 'auto' : false,
  exclude: [
    // Preserve native async/await
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-transform-async-to-generator',
  ],
  useBuiltIns: 'usage',
  corejs: '3.16.2', // Matches the version from yarn.lock
};

const overrides = [
  {
    test: /node_modules/iu,
    presets: [
      [
        '@babel/preset-env',
        {
          ...envOptions,
          useBuiltIns: false,
          corejs: undefined, // we could leave this but it prints warnings
        },
      ],
    ],
  },
];

overrides.push({
  presets: ['@babel/preset-flow'],
  test: /node_modules\/((jest-)?react-native|@react-native(-community)?)/iu,
});

const presets = [
  'module:metro-react-native-babel-preset',
  ['@babel/preset-env', envOptions],
  ['@babel/preset-react', { runtime: 'automatic' }],
  '@babel/preset-typescript',
];

module.exports = {
  plugins,
  presets,
  overrides,
};
