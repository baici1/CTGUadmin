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
 *        佛曰:
 *                写字楼里写字间，写字间里程序员；
 *                程序人员写程序，又拿程序换酒钱。
 *                酒醒只在网上坐，酒醉还来网下眠；
 *                酒醉酒醒日复日，网上网下年复年。
 *                但愿老死电脑间，不愿鞠躬老板前；
 *                奔驰宝马贵者趣，公交自行程序员。
 *                别人笑我忒疯癫，我笑自己命太贱；
 *                不见满街漂亮妹，哪个归得程序员？
 *
 * @Date: 2021-08-01 21:48:56
 * @LastEditors: baici
 * @LastEditTime: 2021-08-02 19:51:44
 * @FilePath: \src\router\modules\test.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
const Layout = () => import("@/layout/index.vue");
const Test = () => import("@/views/test/index.vue");
export default [
  {
    path: "/test1",
    name: "测试",
    component: Layout,
    meta: {
      title: "测试1",
    },
    icon: "el-icon-s-home",
    children: [
      {
        path: "/test2",
        name: "test2",
        component: Test,
        icon: "el-icon-s-home",
        meta: {
          title: "测试2",
          roles: ["visitor"],
        },
      },
      {
        path: "/test3",
        name: "test3",
        component: Test,
        icon: "el-icon-s-home",
        meta: {
          title: "测试3",
          roles: ["visitor"],
        },
      },
    ],
  },
];
