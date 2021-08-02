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
 * @Date: 2021-08-02 16:19:13
 * @LastEditors: baici
 * @LastEditTime: 2021-08-02 20:48:34
 * @FilePath: \src\layout\components\Topbar\Breadcrumbs.vue
 * @Github: https://github.com/baici1/CTGUadmin
 -->
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbs"
      :key="index"
      :class="{ no_link: index === breadcrumbs.length - 1 }"
      :to="index < breadcrumbs.length - 1 ? item.path : ''"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { useRouter } from "vue-router";
import { onBeforeMount, ref, watch } from "vue";
export default {
  setup(props, { emit }) {
    const router = useRouter();
    const route = router.currentRoute; //获取当前路由
    const breadcrumbs = ref([]);
    const getBreadcrumbs = (route) => {
      const home = [{ path: "/", meta: { title: "首页" } }];
      // if (route.name === "home") {
      //   return home;
      // } else {
      //获取有meta以及title的路由项
      const matched = route.matched.filter(
        (item) => !!item.meta && !!item.meta.title
      );
      //用首页作为面包屑第一个
      return [...home, ...matched];
    };
    onBeforeMount(() => {
      breadcrumbs.value = getBreadcrumbs(route.value);
    });
    // 第一个参数是一个响应式对象
    // 第二个是对象发生变化时执行的函数体
    // 回调函数包含两个参数，分别为 newValue ，oldValue
    // 可以监听多个对象，第一项改为数组即可
    // 如果监听reactive对象时，需要使用函数返回值的方法
    //监听;
    watch(
      route,
      (newRoute) => {
        breadcrumbs.value = getBreadcrumbs(route.value);
        ///触发当前实例上的事件
        emit("on-breadcrumbs-change", breadcrumbs.value.length > 1);
      },
      {
        immediate: true, //第一次就会执行回调
      }
    );
    return {
      breadcrumbs,
    };
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ::v-deep(a),
  ::v-deep(.is-link) {
    font-weight: normal;
  }
  ::v-deep(.el-breadcrumb__item) {
    float: none;
  }
  .no_link {
    ::v-deep(.el-breadcrumb__inner) {
      color: #97a8be !important;
    }
  }
  &.mobile {
    display: none;
  }
}
</style>
<style lang="scss">
.el-breadcrumb__inner {
  &.is-link,
  a {
    color: #5c5c5c;
  }
}
</style>
