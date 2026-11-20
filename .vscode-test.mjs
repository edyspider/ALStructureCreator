import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
  files: 'out/test/integration/**/*.test.js',
  workspaceFolder: './test-fixtures/workspace',
  mocha: {
    ui: 'tdd',
    timeout: 20000,
  },
});
