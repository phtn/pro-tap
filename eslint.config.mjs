import neostandard, { plugins, resolveIgnoresFromGitignore } from "neostandard";
import stylistic from "@stylistic/eslint-config";

export default (config) => [
  ...neostandard({
    files: ["src/**/*.ts", "src/**/*.tsx"],
    ignores: resolveIgnoresFromGitignore,
    ts: true,
  }),
  plugins.n.configs["flat/recommended"],
  stylistic.configs.recommended,
];
