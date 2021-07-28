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
 * @Date: 2021-07-28 20:13:56
 * @LastEditors: baici
 * @LastEditTime: 2021-07-28 20:28:15
 * @FilePath: \src\store\index.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
import { createStore } from 'vuex'
//知识点1： 可用于模块的批量导入，类同于import引入同一文件夹下多个文件。
//支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块，
const modulesFiles = import.meta.globEager('./modules/*.js')
// 知识点2：reduce(()=> {total, currentValue, currentIndex, arr}, initValue)
// 参数： 1. 执行每条数据的函数 2. 传递给函数的初始值，可选（以前没发现初始值的妙用-可用于统计个数、去重等）
// 函数的参数
// 1. total 必需。初始值, 或者计算结束后的返回值。如果设置初始值就用初始值，否则就是函数的第一条数据
// 2. currentValue 必需。当前元素
const modules = Object.entries(modulesFiles).reduce((modules, [path, mod]) => {
  const moduleName = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  modules[moduleName] = mod.default
  return modules
}, {})

export default createStore({
  modules,
})
