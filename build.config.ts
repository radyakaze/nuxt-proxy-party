import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: './src/core',
      name: 'core',
    },
    {
      builder: 'mkdist',
      input: 'src/bin',
      outDir: 'dist/bin',
    },
  ],
  externals: ['h3', 'consola'],
})
