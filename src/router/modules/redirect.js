/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑       永不宕机     永无BUG
 *
 * @Date: 2021-08-04 15:25:32
 * @LastEditors: baici
 * @LastEditTime: 2021-08-04 15:25:43
 * @FilePath: \src\router\modules\redirect.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
const Layout = () => import("@/layout/index.vue");
const Redirect = () => import("@/views/redirect/index.vue");

export default [
  {
    path: "/redirect/:path(.*)",
    component: Layout,
    children: [
      {
        path: "",
        component: Redirect,
      },
    ],
  },
];
