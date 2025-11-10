import globals from 'globals'
import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin-js'

export default defineConfig([
  js.configs.recommended, // js 预定义规则
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest'
    }
  },
  {
    // stylistic
    plugins: {
      '@stylistic/js': stylistic
    },
    rules: {
      // 配置格式要求
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error', // 检查相等使用 === 来检查的
      'no-trailing-spaces': 'error', // 行末不允许有空格
      'object-curly-spacing': ['error', 'always'], // 大括号前必须有空格
      'arrow-spacing': ['error', { before: true, after: true }], // 箭头函数两侧必须有空格
      'no-console': 'off', // 不检查 console.log
    }
  },
  {
    // 不检查 dist 文件下的所有文档
    ignores: ['dist/**']
  }
])
