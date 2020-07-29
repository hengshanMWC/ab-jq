import validateNpmPackageName from 'validate-npm-package-name'
import camelcase from 'camelcase'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import tscompile from 'typescript'
import pkg from './package.json'
let moduleName = pkg.name
// 检查是否是合法的 npm 包名
if (!validateNpmPackageName(moduleName)) {
  throw new Error(`${moduleName} 不是一个合法的 npm 包名`)
}

// 对于 npm 私有包，取 @scope 后面的部分作为包名
if (/^@.+\//g.test(moduleName)) {
  moduleName = moduleName.split('/')[1]
}

// 将其他形式的命名规则转换为驼峰命名
moduleName = camelcase(moduleName)
export default [
  {
    input: './src/index.ts',
    output: {
      file: `dist/${moduleName}.global.min.js`,
      format: 'iife',
      name: '$'
    },
    plugins: [
      typescript({
        typescript: tscompile
      }),
      // terser({
      //   compress: {
      //     pure_getters: true,
      //     unsafe: true,
      //     unsafe_comps: true,
      //     warnings: false
      //   }
      // })
    ]
  }
]