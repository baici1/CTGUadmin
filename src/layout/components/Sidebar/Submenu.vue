<!--
 *                        .::::.
 *                      .::::::::.
 *                     :::::::::::
 *                  ..:::::::::::'
 *               '::::::::::::'
 *                 .::::::::::
 *            '::::::::::::::..
 *                 ..::::::::::::.
 *               ``::::::::::::::::
 *                ::::``:::::::::'        .:::.
 *               ::::'   ':::::'       .::::::::.
 *             .::::'      ::::     .:::::::'::::.
 *            .:::'       :::::  .:::::::::' ':::::.
 *           .::'        :::::.:::::::::'      ':::::.
 *          .::'         ::::::::::::::'         ``::::.
 *      ...:::           ::::::::::::'              ``::.
 *     ````':.          ':::::::::'                  ::::..
 *                        '.:::::'                    ':'````..
 * 
 * @Date: 2021-07-30 23:46:37
 * @LastEditors: baici
 * @LastEditTime: 2021-08-01 00:30:31
 * @FilePath: \src\layout\components\Sidebar\Submenu.vue
 * @Github: https://github.com/baici1/CTGUadmin
 -->
<template>
  <!-- 判断此菜单项是否有子菜单项 -->
  <!-- 如果没有则直接显示 -->
  <el-menu-item v-if="!menu.children" :index="menu.url">
    <Item :icon="menu.icon" :title="menu.title" />
  </el-menu-item>
  <!-- 如果有则形成新的菜单，逐渐循环下去 -->
  <el-submenu v-else :index="menu.url">
    <!-- 菜单项的标题 -->
    <template #title>
      <Item :icon="menu.icon" :title="menu.title" />
    </template>
    <!-- 菜单项 -->
    <submenu
      v-for="submenu in menu.children"
      :key="submenu.url"
      :is-nest="true"
      :menu="submenu"
    >
    </submenu>
  </el-submenu>
</template>
<script>
import Item from "./Item.vue";
export default {
  name: "Submenu",
  components: {
    Item,
  },
  props: {
    menu: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
