<!--
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *                               神兽保佑            永无BUG
 * 
 * @Date: 2021-07-29 21:22:05
 * @LastEditors: baici
 * @LastEditTime: 2021-07-30 01:05:37
 * @FilePath: \src\views\login\components\LoginForm.vue
 * @Github: https://github.com/baici1/CTGUadmin
 -->
<template>
  <el-form
    :model="loginUser"
    :rules="rules"
    ref="loginForm"
    label-width="100px"
    class="loginForm sign-in-form"
  >
    <el-form-item label="手机" prop="phone">
      <el-input
        clearable
        v-model="loginUser.phone"
        prefix-icon="el-icon-phone"
        placeholder="请输入手机号"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="loginUser.password"
        clearable
        show-password
        type="password"
        prefix-icon="el-icon-lock"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        :loading="loading"
        @click="login()"
        type="primary"
        class="submit-btn"
        >提交</el-button
      >
    </el-form-item>

    <!-- 找回密码 -->
    <div class="tiparea">
      <p>
        忘记密码？
        <a>立即找回</a>
      </p>
    </div>
  </el-form>
</template>

<script>
import { Login } from "@/api/login";
import { reactive, toRefs, ref } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "LoginForm",
  setup() {
    const store = useStore(); //this.$store
    const router = useRouter(); //VueRouter的一个对象
    const route = useRoute(); //一个跳转的路由对象
    const state = reactive({
      loginUser: {
        phone: "123456",
        password: "123456",
      },
      rules: {
        //表单预验证规则
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
      loading: false,
      loginForm: ref(null),
    });
    const login = () => {
      if (state.loaidng) {
        return;
      }
      state.loginForm.validate(async (valid) => {
        if (valid) {
          state.loading = true;
          const { code, data, message } = await Login(state.loginUser);
          console.log(
            "%c 🍠 code: ",
            "font-size:20px;background-color: #4b4b4b;color:#fff;",
            code
          );
          if (+code === 200) {
            ElMessage.success({
              message: "登录成功",
              type: "success",
              duration: 1000, //显示时间, 毫秒。设为 0 则不会自动关闭
            });
            const targetPath = decodeURIComponent(route.query);
            //获取当前redict地址进行跳转
            if (targetPath.startsWith("http")) {
              // 如果是一个url地址
              window.location.href = targetPath;
            } else if (targetPath.startsWith("/")) {
              //如果因为token失效导致到login，那么重新登录回立即跳转
              // 如果是内部路由地址
              router.push(targetPath);
            } else {
              router.push("/");
            }
            //保存token到storage 以及 保存到state.authorization里面
            store.commit("app/setToken", data);
          } else {
            ElMessage({
              showClose: true,
              message: message,
              type: "error",
            });
          }

          state.loading = false;
        }
      });
    };

    return {
      ...toRefs(state),
      login,
    };
  },
};
</script>
<style scoped>
/* form */
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
