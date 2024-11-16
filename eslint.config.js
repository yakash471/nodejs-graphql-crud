import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier'; // Disable conflicting rules
import prettierPlugin from 'eslint-plugin-prettier'; // Add Prettier as an ESLint rule

const config = [
  {
    // Apply to TypeScript files
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['jest.config.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest', // Use the latest ECMAScript version
        sourceType: 'module', // Enable ES Modules
        project: './tsconfig.json', // Path to tsconfig.json for type-aware linting
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // Include recommended TypeScript rules
      ...typescriptPlugin.configs.recommended.rules,
      ...prettierConfig.rules, // Disable ESLint rules that conflict with Prettir
      // Custom rule overrides
      'prettier/prettier': 'error', // Treat Prettier formatting issues as errors
      '@typescript-eslint/no-unused-vars': ['warn'], // Warn for unused variables
      '@typescript-eslint/no-explicit-any': 'off', // Disable 'any' warnings
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true }, // Allow short-circuiting
      ],
      '@typescript-eslint/explicit-function-return-type': 'off', // Optional function return types
      '@typescript-eslint/ban-ts-comment': 'warn', // Warn for ts-ignore comments
    },
  },
  {
    // Apply to all JavaScript files
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['warn'],
      'no-console': 'warn', // Warn on console.log
    },
  },
];

export default config;
