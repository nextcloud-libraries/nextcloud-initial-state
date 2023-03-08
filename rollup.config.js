import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: './lib/index.ts',
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: { target: 'es5' },
      }),
    ],
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    input: 'lib/index.ts',
    plugins: [typescript()],
    output: [
      {
        file: 'dist/index.es.mjs',
        format: 'esm',
        sourcemap: true,
      },
    ],
  },
]
