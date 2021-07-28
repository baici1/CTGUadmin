/*
 *
 *    ┏┓　　　┏┓
 *  ┏┛┻━━━┛┻┓
 *  ┃　　　　　　　┃
 *  ┃　　　━　　　┃
 *  ┃　＞　　　＜　┃
 *  ┃　　　　　　　┃
 *  ┃...　⌒　...　┃
 *  ┃　　　　　　　┃
 *  ┗━┓　　　┏━┛
 *      ┃　　　┃
 *      ┃　　　┃
 *      ┃　　　┃
 *      ┃　　　┃  神兽保佑
 *      ┃　　　┃  代码无bug
 *      ┃　　　┃
 *      ┃　　　┗━━━┓
 *      ┃　　　　　　　┣┓
 *      ┃　　　　　　　┏┛
 *      ┗┓┓┏━┳┓┏┛
 *        ┃┫┫　┃┫┫
 *        ┗┻┛　┗┻┛
 *
 * @Date: 2021-07-28 20:28:45
 * @LastEditors: baici
 * @LastEditTime: 2021-07-28 21:50:15
 * @FilePath: \src\utils\request.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
import axios from 'axios'
//创建axios实例
const service = axios.create({
  baseURL: '/', //设置基础url
  timeout: 5000, //设置请求超时时间
  //withCredentials: true, 配置发送跨域请求时是否携带cokkie
})
