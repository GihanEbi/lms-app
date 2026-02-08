import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";

// Load the .env.test file manually to override the normal .env
dotenv.config({ path: ".env.test" });

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"], // We will name our test files like 'login.test.ts'
    setupFiles: ["./src/setup-tests.ts"],
    hookTimeout: 20000,
    fileParallelism: false,
  },
});
