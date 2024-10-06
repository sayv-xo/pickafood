import globals from 'globals';
import eslintPluginNode from 'eslint-plugin-node';

export default [
  {
    // ignore node_modules
    ignores: ['node_modules'],
    // all files in projects
    files: ['**/*.js'],
    languageOptions: { globals: globals.node },
    plugins: {
      'node': eslintPluginNode,
    },
    rules: {
      'node/no-unsupported-features/es-syntax': 'off',
      'node/no-missing-import': 'off',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-console': 'off',
      'indent': ['error', 2],
    },
  },
]