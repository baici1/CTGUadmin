<!--
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
 * @Date: 2021-07-30 16:26:17
 * @LastEditors: baici
 * @LastEditTime: 2021-08-02 14:44:46
 * @FilePath: \src\layout\components\Sidebar\index.vue
 * @Github: https://github.com/baici1/CTGUadmin
 -->
<template>
  <div class="left" :class="{ collapse: collapse }">
    <Logo></Logo>
    <menus :collapse="collapse"></menus>
  </div>
</template>

<script>
import Logo from "./Logo.vue";
import Menus from "./Menus.vue";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  components: {
    Logo,
    Menus,
  },
  setup() {
    const store = useStore();
    return {
      collapse: computed(() => !!store.state.app.sidebar.collapse),
      device: computed(() => store.state.app.device),
      closeSidebar: () => {
        store.commit("app/setCollapse", 1);
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.left {
  width: 210px;
  background: $menuBg;
  transition: all 0.3s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &.collapse {
    width: 64px;
    ::v-deep(.brand .title) {
      display: none;
    }
  }
}
</style>
