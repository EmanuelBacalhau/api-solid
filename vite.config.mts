import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // run test only folder controller controller, run environment vitest-enviroment-prisma
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})
