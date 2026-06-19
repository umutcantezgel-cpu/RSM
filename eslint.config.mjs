import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Reference/Design folders
    "RSM Systembau Design-Relaunch/**",
    "Wieder verwerten für RSM agents/**",
    "Wieder verwerten für RSM agents/**",
    ".agents/**",
    "agents/**",
  ]),
  {
    files: ["app/**/*.tsx", "components/**/*.tsx"],
    ignores: ["**/__tests__/**"],
    rules: {
      "react/jsx-no-literals": "error"
    }
  }
]);

export default eslintConfig;
