/*
 *                   江城子 . 程序员之歌
 *
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 *
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 *
 *
 * @Date: 2021-07-29 21:46:25
 * @LastEditors: baici
 * @LastEditTime: 2021-07-30 00:06:46
 * @FilePath: \src\api\login.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
import request from "@/utils/request";
// 登录接口
export const Login = (data) => {
  return request({
    url: "/api/login",
    method: "post",
    data,
  });
};

// 获取登录用户信息
export const GetUserinfo = () => {
  return request({
    url: "/api/userinfo",
    method: "get",
  });
};
