/*
 * _______________#########_______________________
 * ______________############_____________________
 * ______________#############____________________
 * _____________##__###########___________________
 * ____________###__######_#####__________________
 * ____________###_#######___####_________________
 * ___________###__##########_####________________
 * __________####__###########_####_______________
 * ________#####___###########__#####_____________
 * _______######___###_########___#####___________
 * _______#####___###___########___######_________
 * ______######___###__###########___######_______
 * _____######___####_##############__######______
 * ____#######__#####################_#######_____
 * ____#######__##############################____
 * ___#######__######_#################_#######___
 * ___#######__######_######_#########___######___
 * ___#######____##__######___######_____######___
 * ___#######________######____#####_____#####____
 * ____######________#####_____#####_____####_____
 * _____#####________####______#####_____###______
 * ______#####______;###________###______#________
 * ________##_______####________####______________
 *
 * @Date: 2021-07-28 20:36:28
 * @LastEditors: baici
 * @LastEditTime: 2021-08-01 00:31:27
 * @FilePath: \src\permission.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
//路由前权限的操作
import router from "@/router";
import store from "@/store";
import { TOKEN } from "@/store/modules/app";

//获取title以及设置page的title
const getPageTitle = (title) => {
  const appTitle = store.state.app.title;
  if (title) {
    return `${title}-${appTitle}`;
  }
  return appTitle;
};
router.beforeEach(async (to) => {
  document.title = getPageTitle(!!to.meta && to.meta.title);
  //判断是否由token
  if (!window.localStorage[TOKEN]) {
    //没有就直接返回到登录页
    return {
      name: "login",
      query: {
        redirect: to.fullPath, // redirect是指登录之后可以跳回到redirect指定的页面
      },
      replace: true,
    };
  } else {
    //token存在
    //获取此时用户角色信息，根据角色判断权限
    let userinfo = store.state.account.userinfo;
    //判断是否有角色信息
    if (!userinfo) {
      try {
        //发起请求，获取用户信息
        userinfo = await store.dispatch("account/getUserinfo");
      } catch (err) {
        return false;
      }
    }
    if (store.state.menu.menus.length <= 0) {
      try {
        console.log(
          "%c 🍐 userinfo: ",
          "font-size:20px;background-color: #F5CE50;color:#fff;",
          userinfo
        );
        await store.dispatch("menu/generateMenus", userinfo.role);

        return to.fullPath; // 添加动态路由后，必须加这一句触发重定向，否则会404
      } catch (err) {
        return false;
      }
    }
  }
});
