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
 * @Date: 2021-07-30 00:32:54
 * @LastEditors: baici
 * @LastEditTime: 2021-08-02 20:49:16
 * @FilePath: \src\store\modules\account.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
//专门处理用户信息
import { GetUserinfo } from "@/api/login";
export default {
  namespaced: true,
  state: {
    userinfo: null,
  },
  mutations: {
    // 保存用户信息
    setUserinfo(state, data) {
      state.userinfo = data;
    },
    // 清除用户信息
    clearUserinfo(state) {
      state.userinfo = null;
    },
  },
  actions: {
    //获取用户信息
    async getUserinfo({ commit }) {
      const { code, data } = await GetUserinfo();
      if (+code === 200) {
        commit("setUserinfo", data);
        return Promise.resolve(data);
      }
    },
  },
};
