import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    rules: { "react-hooks/set-state-in-effect": "off" },
  },
  globalIgnores([".output/**", "dist/**", "src/routeTree.gen.ts"]),
]);
