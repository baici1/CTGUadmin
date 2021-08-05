/*
 * @Date: 2021-07-28 16:13:41
 * @LastEditors: baici
 * @LastEditTime: 2021-08-05 01:08:55
 * @FilePath: \src\main.js
 */
import { createApp } from "vue";
const app = createApp(App);
// 引入store
import store from "./store";
//引入路由
import router from "./router";
//引入element-plus
import ElementPlus from "element-plus";
//设置Dayjs国际化
import locale from "element-plus/lib/locale/lang/zh-cn";
import "dayjs/locale/zh-cn";
//引入element-theme颜色变量
import "./assets/style/element-variables.scss";
// 引入svg图标注册脚本
import "vite-plugin-svg-icons/register";
// 注册全局组件
import * as Components from "./global-components";
Object.entries(Components).forEach(([key, component]) => {
  app.component(key, component);
}); //参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组
// 权限控制
import "./permission";
import App from "./App.vue";

app.use(ElementPlus, { locale }).use(store).use(router).mount("#app");
