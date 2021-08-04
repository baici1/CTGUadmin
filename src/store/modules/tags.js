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
 * @Date: 2021-08-02 23:39:16
 * @LastEditors: baici
 * @LastEditTime: 2021-08-03 15:03:32
 * @FilePath: \src\store\modules\tags.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
//关于tag的操作
//增
//删除当前
//删除满足条件的
//删除除当前以外的
//删除全部
//保存当前位置
import { getItem, setItem, removeItem } from "@/utils/storage"; //getItem和setItem是封装的操作localStorage的方法
const TAGLIST = "TAGLIST";
const state = {
  tagList: getItem(TAGLIST) || [], //获取标签的数组
  cacheList: [],
  activePosition: -1, //激活页面的位置
};
const mutations = {
  ADD_TAG_LIST: (state, { path, fullPath, name, meta, params, query }) => {
    //如果当前的路由存在taglist里面就不添加
    if (state.tagList.some((v) => v.path === path)) return false;
    //所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
    const target = Object.assign(
      {},
      { path, fullPath, name, meta, params, query },
      { title: meta.title || "未命名", fullPath: fullPath || path }
    );
    if (state.activePosition === -1) {
      //如果此时路由名称是home，添加到list的头部
      if (name === "home") {
        state.tagList.unshift(target);
      } else {
        //添加标签
        state.tagList.push(target);
      }
    } else {
      //处于当前的标签，点击其他页面，往后添加标签
      state.tagList.splice(state.activePosition + 1, 0, target);
    }
    setItem(TAGLIST, state.tagList);
  },
  ADD_CACHE_LIST: (state, tag) => {
    //此时tage是否有存在cache里
    if (state.cacheList.includes(tag.name)) return;
    //添加cache
    if (!tag.meta.noCache) {
      state.cacheList.push(tag.name);
    }
  },
  //标签有四个选项
  //关闭当前
  //关闭全部
  //关闭右侧
  //关闭其他
  //等。。。。
  //删除当前
  DEL_TAG_LIST: (state, tag) => {
    state.tagList = state.tagList.filter((v) => v.path != tag.path);
    setItem(TAGLIST, state.tagList);
  },
  DEL_CACHE_LIST: (state, tag) => {
    state.cacheList = state.cacheList.filter((v) => v != tag.name);
  },
  //删除其他
  DEL_OTHER_TAG_LIST: (state, tag) => {
    state.tagList = state.tagList.filter(
      (v) => !!v.meta.affix || v.path == tag.path
    );
    setItem(TAGLIST, state.tagList);
  },
  DEL_OTHER_CACHE_LIST: (state, tag) => {
    state.cacheList = state.cacheList.filter((v) => v === tag.name);
  },
  //删除满足条件
  DEL_SOME_TAG_LIST: (state, tags) => {
    state.tagList = state.tagList.filter(
      (v) => !!v.meta.affix || tags.every((tag) => tag.path !== v.path)
    );
    setItem(TAGLIST, state.tagList);
  },
  DEL_SOME_CACHE_LIST: (state, tags) => {
    state.cacheList = state.cacheList.filter((v) =>
      tags.every((tag) => tag.name != v)
    );
  },
  //删除全部，除固定以外
  DEL_ALL_TAG_LIST: (state) => {
    state.tagList = state.tagList.filter((v) => !!v.meta.affix);
    removeItem(TAGLIST);
  },
  DEL_ALL_CAHCE_LIST: (state) => {
    state.cacheList = [];
  },
  //??????
  UPDATE_TAG_LIST: (state, tag) => {
    const index = state.tagList.findIndex((v) => v.path === tag.path);
    if (index > -1) {
      state.tagList[index] = Object.assign({}, state.tagList[index], tag);
      setItem(TAGLIST, state.tagList);
    }
  },
  //保存当前页面位置
  SAVE_ACTIVE_POSITION: (state, index) => {
    state.activePosition = index;
  },
};
const actions = {
  saveActivePosition({ commit }, index) {
    commit("SAVE_ACTIVE_POSITION", index);
  },
  addTag({ commit }, tag) {
    commit("ADD_TAG_LIST", tag);
    commit("ADD_CACHE_LIST", tag);
  },
  delTag({ commit }, tag) {
    commit("DEL_TAG_LIST", tag);
    commit("DEL_CACHE_LIST", tag);
  },
  delOtherTags({ commit }, tags) {
    commit("DEL_OTHER_TAG_LIST", tags);
    commit("DEL_OTHER_CACHE_LIST", tags);
  },
  delSomeTags({ commit }, tags) {
    commit("DEL_SOME_TAG_LIST", tags);
    commit("DEL_SOME_CACHE_LIST", tags);
  },
  delAllTags({ commit }) {
    commit("DEL_ALL_TAG_LIST");
    commit("DEL_ALL_CACHE_LIST");
  },
  updateTagList({ commit }, { path, fullPath, name, meta, params, query }) {
    commit("UPDATE_TAG_LIST", { path, fullPath, name, meta, params, query });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
