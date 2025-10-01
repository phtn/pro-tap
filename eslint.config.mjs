import neostandard from 'neostandard'

export default [
  ...neostandard({
    ts: true,
    noJsx: true,
    noStyle: true,
    filesTs: ['**/*.ts', '**/*.tsx'],
    ignores: ['node_modules', '.next/**', 'dist/**', 'build/**', '**/*.json'],
  }),
  // neostandard.plugins.n.configs['flat/recommended'],
]
