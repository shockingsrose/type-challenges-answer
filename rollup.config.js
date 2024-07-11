import { nodeResolve } from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'index.js', // 入口文件
  output: {
    file: 'bundle.js', // 打包后的文件
  },
  plugins: [
    nodeResolve(), // 解析Node模块
  ],
}
