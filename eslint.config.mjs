import neostandard, { plugins, resolveIgnoresFromGitignore } from "neostandard";

export default (config) => [
  ...neostandard({
    files: ["src/**/*.ts", "src/**/*.tsx"],
    ignores: resolveIgnoresFromGitignore,
    ts: true,
  }),
  plugins.n.configs["flat/recommended"],
];
