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
 * @LastEditTime: 2021-07-30 00:43:42
 * @FilePath: \src\utils\request.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
import axios from "axios";
import store from "@/store";
import router from "@/router";
//创建axios实例
const service = axios.create({
  baseURL: "/", //设置基础url
  timeout: 5000, //设置请求超时时间
  //withCredentials: true, 配置发送跨域请求时是否携带cokkie
});
// 拦截请求
service.interceptors.request.use(
  (config) => {
    const { authorization } = store.state.app; //获取state.app.authorization里面的token值
    if (authorization) {
      config.headers.Authorization = `Bearer ${authorization.token}`; //为每个请求添加token头部
    }
    return config;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);
service.interceptors.response.use((response) => {
  return response.data;
});
export default service;
