/*
 *           佛曰:
 *                   写字楼里写字间，写字间里程序员；
 *                   程序人员写程序，又拿程序换酒钱。
 *                   酒醒只在网上坐，酒醉还来网下眠；
 *                   酒醉酒醒日复日，网上网下年复年。
 *                   但愿老死电脑间，不愿鞠躬老板前；
 *                   奔驰宝马贵者趣，公交自行程序员。
 *                   别人笑我忒疯癫，我笑自己命太贱；
 *                   不见满街漂亮妹，哪个归得程序员？
 *
 * @Date: 2021-07-29 22:07:05
 * @LastEditors: baici
 * @LastEditTime: 2021-07-30 00:32:33
 * @FilePath: \src\store\modules\app.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
import { getItem, setItem, removeItem } from "@/utils/storage"; //getItem和setItem是封装的操作localStorage的方法
import { toRaw } from "vue";
export const TOKEN = "TOKEN";
const COLLAPSE = "COLLAPSE";
export default {
  namespaced: true, //属性用于解决不同模块的命名冲突问题
  state: {
    title: "CTGU Admin", //网站标题
    authorization: getItem(TOKEN), //授权 token
    sidebar: {
      collapse: getItem(COLLAPSE),
    }, //判断是否是pc还是移动
    device: "desktop",
  },
  mutations: {
    //设置token
    //token存到vuex以及localstorage
    setToken(state, data) {
      state.authorization = data;
      // 保存到localStorage
      setItem(TOKEN, data);
    },
    //清除token
    clearToken(state) {
      state.authorization = "";

      removeItem(TOKEN);
    },
    //设置机型
    setCollapse(state, data) {
      state.sidebar.collapse = data;
      // 保存到localStorage
      setItem(COLLAPSE, data);
    },
    //清除
    clearCollapse(state) {
      state.sidebar.collapse = "";

      removeItem(COLLAPSE);
    },
    //设置pc端还是移动端
    setDevice(state, device) {
      state.device = device;
    },
  },
  actions: {
    clearToken({ commit }) {
      // 清除token
      commit("clearToken");
      // 清除用户信息
      commit("account/clearUserinfo", "", { root: true });
    },
    setScreenCode({ commit, state }, password) {
      const authorization = toRaw(state.authorization);

      if (!password) {
        try {
          delete authorization.screenCode;
        } catch (err) {
          console.log(err);
        }
        commit("setToken", authorization);

        return;
      }

      // 对密码加密
      //  const screenCode = new AesEncryption().encryptByAES(password);

      commit("setToken", {
        ...authorization,
        password,
      });
    },
  },
};
