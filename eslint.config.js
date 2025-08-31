// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'dist/*',
      'node_modules/*',
      '.expo/*',
      'babel.config.js',
      'metro.config.js',
      'tailwind.config.js',
      '**/*.d.ts'
    ],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      // TypeScript specific rules (non-type-aware)
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports'
      }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      // React/React Native specific rules
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],

      // General code quality rules
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-duplicate-imports': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',

      // Import/Export rules
      'import/order': ['error', {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }],

      // Performance and best practices
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed']
    }
  },
  {
    files: ['**/*.test.{ts,tsx,js,jsx}', '**/__tests__/**/*'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
]);
