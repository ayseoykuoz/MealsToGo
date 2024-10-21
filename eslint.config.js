// eslint.config.js

export default [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    extends: [
      '@react-native-community',
      'plugin:prettier/recommended', // Add Prettier plugin and config
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      quotes: ['error', 'double', { avoidEscape: true }],
      'prettier/prettier': ['error'], // This will show Prettier formatting issues as ESLint errors
    },
  },
];
