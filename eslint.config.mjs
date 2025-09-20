import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
    rules: {
      // Possible Errors
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-empty': 'warn',
      'no-extra-semi': 'warn',

      // Best Practices
      'eqeqeq': ['warn', 'always'],
      // 'curly': ['warn', 'all'],
      'no-eval': 'warn',
      'no-implied-eval': 'warn',
      'no-param-reassign': 'warn',
      'consistent-return': 'warn',

      // Variables
      'no-unused-vars': ['warn', { 'args': 'none', 'ignoreRestSiblings': true }],
      'no-undef': 'warn',

      // ES6
      'no-var': 'warn',
      'prefer-const': 'warn',

      // React/Next.js specific (recommended to warn here)
      'react/jsx-uses-react': 'warn',
      'react/jsx-uses-vars': 'warn',
      'react/react-in-jsx-scope': 'off',

      // TypeScript-specific (using eslint's typescript rules via plugin assumed from config)
      '@typescript-eslint/no-unused-vars': ['warn', { 'args': 'none', 'ignoreRestSiblings': true }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];

export default eslintConfig;
