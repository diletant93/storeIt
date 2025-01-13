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
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error', // Run Prettier as ESLint rule
      'no-unused-vars': 'off', // Disable unused variable rule
      '@typescript-eslint/no-unused-vars': 'off', // Disable TypeScript unused variable rule
    },
  },
  ...compat.extends('prettier'), // Add Prettier config
];

export default eslintConfig;
