<!--
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐│
 *  ││Esc│!1 │@2 │#3 │$4 │%5 │^6 │&7 │*8 │(9 │)0 │_- │+= │|\ │`~ ││
 *  │├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┤│
 *  ││ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{[ │}] │ BS  ││
 *  │├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤│
 *  ││ Ctrl │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  ││
 *  │├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────┬───┤│
 *  ││ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│Shift │Fn ││
 *  │└─────┬──┴┬──┴──┬┴───┴───┴───┴───┴───┴──┬┴───┴┬──┴┬─────┴───┘│
 *  │      │Fn │ Alt │         Space         │ Alt │Win│   HHKB   │
 *  │      └───┴─────┴───────────────────────┴─────┴───┘          │
 *  └─────────────────────────────────────────────────────────────┘
 * 
 * @Date: 2021-07-30 16:26:45
 * @LastEditors: baici
 * @LastEditTime: 2021-08-01 00:05:05
 * @FilePath: \src\layout\components\Sidebar\Menus.vue
 * @Github: https://github.com/baici1/CTGUadmin
 -->
<template>
  <el-scrollbar class="scroll">
    <el-menu
      class="menu"
      mode="vertical"
      :collapse="collapse"
      :uniqueOpened="true"
      :router="true"
      :default-active="activePath"
      :background-color="variables.menuBg"
      :text-color="variables.menuTextColor"
      :active-text-color="variables.menuActiveTextColor"
    >
      <Submenu v-for="menu in menus" :key="menu.url" :menu="menu"></Submenu>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import Submenu from "./Submenu.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "@vue/runtime-core";
import config from "./config/menu.module.scss";
export default {
  components: {
    Submenu,
  },
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    console.log(
      "%c 🍜 store.state.menu.menus: ",
      "font-size:20px;background-color: #93C0A4;color:#fff;",
      store.state.menu.menus
    );
    return {
      //获取菜单信息
      menus: computed(() => store.state.menu.menus),

      //获取此时激活的菜单项
      activePath: computed(() => route.path),
      //颜色配置信息
      variables: computed(() => config),
    };
  },
};
</script>

<style lang="scss">
// menu hover
.el-menu-item,
.el-submenu__title {
  &:hover {
    background-color: $menuHover !important;
  }
}

.el-submenu {
  .el-menu-item,
  .el-submenu .el-submenu__title {
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}
.el-menu-item.is-active {
  background-color: $menuActiveBg !important;
  &:hover {
    background-color: $menuActiveBg !important;
  }
}

.el-menu--collapse {
  .el-menu-item.is-active,
  .el-submenu.is-active > .el-submenu__title {
    position: relative;
    background-color: $collapseMenuActiveBg !important;
    color: $collapseMenuActiveColor !important;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: $collapseMenuActiveBorderWidth;
      height: 100%;
      background-color: $collapseMenuActiveBorderColor;
    }
  }
}

.el-submenu__title i {
  color: $arrowColor;
}
</style>
<style lang="scss" scoped>
.scroll {
  height: auto;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  .menu {
    border: none;
  }
}
</style>
