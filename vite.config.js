/*
 *                   ___====-_  _-====___
 *             _--^^^#####//      \\#####^^^--_
 *          _-^##########// (    ) \\##########^-_
 *         -############//  |\^^/|  \\############-
 *       _/############//   (@::@)   \############\_
 *      /#############((     \\//     ))#############\
 *     -###############\\    (oo)    //###############-
 *    -#################\\  / VV \  //#################-
 *   -###################\\/      \//###################-
 *  _#/|##########/\######(   /\   )######/\##########|\#_
 *  |/ |#/\#/\#/\/  \#/\##\  |  |  /##/\#/  \/\#/\#/\#| \|
 *  `  |/  V  V  `   V  \#\| |  | |/#/  V   '  V  V  \|  '
 *     `   `  `      `   / | |  | | \   '      '  '   '
 *                      (  | |  | |  )
 *                     __\ | |  | | /__
 *                    (vvv(VVV)(VVV)vvv)
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *                神兽保佑            永无BUG
 *
 * @Date: 2021-07-28 16:13:41
 * @LastEditors: baici
 * @LastEditTime: 2021-07-28 23:57:20
 * @FilePath: \vite.config.js
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default env => {
  console.log(
    '%c 🍕 env: ',
    'font-size:20px;background-color: #F5CE50;color:#fff;',
    env
  )
  return defineConfig({
    plugins: [
      vue(),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: env.command === 'serve',
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // 设置全局变量
          additionalData: '@import "./src/assets/style/global-variables.scss";',
        },
      },
    },
    resolve: {
      //设置@的代表的位置
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    //解决跨域
    // server: {
    //   open: true,
    //   proxy: {
    //     '/api': {
    //       target: 'http://dev.api.xxx.com', // 后端接口的域名
    //       changeOrigin: true,
    //     },
    //   },
    // },
    esbuild: false,
  })
}
