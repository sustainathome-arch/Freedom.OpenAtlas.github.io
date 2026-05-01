import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import astro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';

export default [
  // Ignore patterns
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/.astro/**', '**/frontmatter/**', 'public/**'],
  },

  // Default rules for all files
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // TypeScript parser for .ts files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // TypeScript/JSX files
  {
    files: ['**/*.tsx'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Astro files - use astro-eslint-parser
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Disable TS rules in Astro files (frontmatter causes parsing issues)
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Strict rules for source TypeScript files
  {
    files: ['src/**/*.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'prefer-const': 'warn',
    },
  },
];
