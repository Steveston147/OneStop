import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals'],
    rules: {
      // Current site photography is explicitly temporary, external design-review imagery.
      // Keep native img elements until approved production assets replace these mock images.
      '@next/next/no-img-element': 'off',
    },
  }),
  {
    ignores: ['.next/**', 'node_modules/**', 'playwright-report/**', 'test-results/**'],
  },
];

export default eslintConfig;
