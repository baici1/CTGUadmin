/*
 * @Date: 2021-07-28 16:13:41
 * @LastEditors: baici
 * @LastEditTime: 2021-07-28 20:59:50
 * @FilePath: \src\main.js
 */
import { createApp } from 'vue'
// 引入store
import store from './store'
//引入路由
import router from './router'
//引入element-plus
import ElementPlus from 'element-plus'
//设置Dayjs国际化
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
//引入element-theme颜色变量
import './assets/style/element-variables.scss'
import App from './App.vue'

createApp(App).use(ElementPlus, { locale }).use(store).use(router).mount('#app')
