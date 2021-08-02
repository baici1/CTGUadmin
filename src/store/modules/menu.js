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
 * @Date: 2021-07-31 15:29:16
 * @LastEditors: baici
 * @LastEditTime: 2021-08-01 22:37:13
 * @FilePath: \src\store\modules\menu.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
import { asyncRoutes } from "@/router";
//判断路由的权限是否此时用户身份
const hasPermission = (role, route) => {
  console.log(
    "%c 🍅 role: ",
    "font-size:20px;background-color: #F5CE50;color:#fff;",
    role
  );
  //判断meta是否存在
  //判断是否有roles
  //判断role是否存在roles
  if (!!route.meta && !!route.meta.roles && !route.meta.roles.includes(role)) {
    return false;
  }
  return true;
};
//获得准确的url
const generateUrl = (path, parentPath) => {
  return path.startsWith("/")
    ? path
    : path
    ? `${parentPath}/${path}`
    : parentPath;
};
//获得筛选权限后的路由信息
const getFilterMenus = (arr, role, parentPath = "") => {
  const menus = [];
  arr.forEach((item) => {
    if (hasPermission(role, item) && !item.hidden) {
      const menu = {
        url: generateUrl(item.path, parentPath),
        title: item.meta.title,
        icon: item.icon,
      };

      //如果有孩子路由
      if (item.children) {
        //排除hidden的孩子路由
        if (item.children.filter((child) => !child.hidden).length <= 1) {
          //孩子只有一个，那么此时的menu.url就会发生改变
          menu.url = generateUrl(item.children[0].path, menu.url);
          menu.title = item.children[0].meta.title;
        } else {
          menu.children = getFilterMenus(item.children, role, menu.url);
        }
      }

      menus.push(menu);
    }
  });
  return menus;
};
//处理当此时一个菜单项全是一个身份时候，此时不应该产生
const handleMenus = (menus) => {
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].children.length == 0) {
      console.log(
        "%c 🍋 menus[i]: ",
        "font-size:20px;background-color: #93C0A4;color:#fff;",
        menus[i]
      );
      menus.splice(i, 1);
    }
  }
  return menus;
};
export default {
  namespaced: true,
  state: {
    menus: [
      //测试
      // { url: "/home", title: "工作台", icon: "el-icon-s-home" },
      // {
      //   url: "/test",
      //   title: "测试页面",
      //   icon: "el-icon-location",
      //   children: [{ url: "/test", title: "列表", icon: undefined }],
      // },
    ],
  },
  mutations: {
    SET_MENUS(state, data) {
      state.menus = data;
    },
  },
  actions: {
    async generateMenus({ commit }, role) {
      const menus = handleMenus(getFilterMenus(asyncRoutes, role));
      commit("SET_MENUS", menus);
    },
  },
};
