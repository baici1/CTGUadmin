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
 * @Date: 2021-07-30 16:26:25
 * @LastEditors: baici
 * @LastEditTime: 2021-07-31 23:57:11
 * @FilePath: \src\layout\components\Sidebar\Item.vue
 * @Github: https://github.com/baici1/CTGUadmin
 -->
<template>
  <!-- 是否有element-plus的图标，有就使用 -->
  <i v-if="isElementIcon" :class="`icon ${icon}`"></i>
  <!-- 同时你也可以自己使用icon -->
  <svg-icon class="icon" v-else :name="Icon"></svg-icon>
  <!-- 名称 -->
  <span>{{ title }}</span>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  setup({ icon }) {
    //判断是否是element-plus的图标
    const isElementIcon = computed(() => icon && icon.startsWith("el-icon"));
    return { isElementIcon, Icon: computed(() => icon || "home") };
  },
};
</script>

<style lang="scss" scoped>
.icon {
  margin-right: 10px;
  width: 16px !important;
  height: 16px !important;
  font-size: 16px;
  text-align: center;
  color: currentColor;
}
</style>
