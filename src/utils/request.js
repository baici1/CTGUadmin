import axios from "axios";
import store from "@/store";
import router from "@/router";
import { ElMessage } from "element-plus";
// 创建axios实例
const service = axios.create({
  baseURL: "/", // 设置基础url
  timeout: 5000, // 设置请求超时时间
  // withCredentials: true, 配置发送跨域请求时是否携带cokkie
});
// 拦截请求
service.interceptors.request.use(
  (config) => {
    const { authorization } = store.state.app; // 获取state.app.authorization里面的token值
    if (authorization) {
      config.headers.Authorization = `Bearer ${authorization.token}`; // 为每个请求添加token头部
    }
    return config;
  },
  (error) =>
    // console.log(error);
    Promise.reject(error)
);
service.interceptors.response.use(
  (response) => response.data,
  // 请求响应后，我们需要对响应做什么！
  // 1.token失效，我们要更新token
  // 2.获取token失效，我们要重新回到登录页
  async (error) => {
    // 如果响应码是 401 ，则当前token失效需要请求获取新的 token，利用refresh_token刷新token
    // 响应拦截器中的 error 就是那个响应的错误对象
    if (error.response && error.response.status === 401) {
      const { authorization } = store.state.app; // 获取token
      // 如果不存在token和refreshtoken
      if (!authorization || !authorization.refresh_token) {
        // 回到登录页，随后跳转回来
        const redirect = encodeURIComponent(window.location.href);
        router.push(`/login?redirect=${redirect}`);
        // 清除token
        store.dispatch("app/clearToken");
      }
      // 如果有refresh_token，则请求获取新的 token
      try {
        const res = await axios({
          method: "PUT",
          url: "/api/authorizations",
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${authorization.refresh_token}`,
          },
        });
        // 获取token成功后，就进行更新token
        store.commit("api/setToken", {
          token: res.data.data.token, // 最新获取的可用 token
          refresh_token: authorization.refresh_token, // 还是原来的 refresh_token
        });
        // 把之前失败的用户请求继续发出去
        // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
        // return 把 request 的请求结果继续返回给发请求的具体位置
        return service(error.config); // 对失败的api进行再一次请求
      } catch (err) {
        // 如果此时还是失败了，说明refresh_token也失效
        const redirect = encodeURIComponent(window.location.href);
        router.push(`/login?redirect=${redirect}`);
        // 清除token
        store.dispatch("app/clearToken");
        return Promise.reject(error);
      }
    }
    // 发出错误信息
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);
export default service;
