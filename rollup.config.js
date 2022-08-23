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
        dir: 'dist',
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
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
  },
]
