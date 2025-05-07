import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jestPlugin from 'eslint-plugin-jest';
import prettierPlugin from 'eslint-plugin-prettier';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // JS base
  js.configs.recommended,

  // TS support
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        chrome: 'readonly'
      }
    },
    plugins: { '@typescript-eslint': ts },
    rules: ts.configs.recommended.rules
  },

  // Jest overrides
  {
    files: ['**/__tests__/**'],
    plugins: { jest: jestPlugin },
    languageOptions: {
      globals: { ...globals.jest }
    },
    rules: jestPlugin.configs.recommended.rules
  },

  // Prettier last
  {
    plugins: { prettier: prettierPlugin },
    rules: prettier.rules
  },

  // Ignore build artefacts
  { ignores: ['dist/**', 'node_modules/**'] }
];