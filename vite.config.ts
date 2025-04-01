import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      all: false
    },
    workspace: [ 
      {
        extends: true,
        test: {
          include: ['src/http/controllers/**/*.test.ts'],
          name: 'e2e',
          environment: './prisma/vitest-environment-prisma/prisma-test-environment.ts',
        },
      },
      {
        extends: true,
        test: {
          environment: 'node',
          include: ['src/use-cases/**/*.test.ts'],
          name: 'unit',
        },
      },
    ], 
  },
});
