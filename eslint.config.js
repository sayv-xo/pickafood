import globals from 'globals';
import eslintPluginNode, { rules } from 'eslint-plugin-node';
import { plugins } from 'eslint-plugin-node/lib/configs/recommended-module';

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