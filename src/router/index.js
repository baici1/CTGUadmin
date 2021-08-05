/*
 *                   江城子 . 程序员之歌
 *
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 *
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 *
 *
 * @Date: 2021-07-28 20:13:10
 * @LastEditors: baici
 * @LastEditTime: 2021-08-05 01:18:01
 * @FilePath: \src\router\index.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
import { createRouter, createWebHashHistory } from "vue-router";
import login from "./modules/login";
import home from "./modules/home";
import test from "./modules/test";
import redirect from "./modules/redirect";
/* 菜单栏的路由 */
// 固定菜单
export const fixedRoutes = [];
// 动态菜单
export const asyncRoutes = [...home, ...test];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    ...login,
    //...redirect, // 统一的重定向配置
    ...asyncRoutes,
  ],
  scrollBehavior(to, from, savedPosition) {
    // savedPosition 会在你使用浏览器前进或后退按钮时候生效
    // 这个跟你使用 router.go() 或 router.back() 效果一致
    //这里主要处理当你的home滚动再底部，跳转页面也是底部的bug情况
    //主要是让页面回到顶部
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
export default router;
