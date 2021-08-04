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
 * @Date: 2021-08-02 23:36:43
 * @LastEditors: baici
 * @LastEditTime: 2021-08-04 16:28:56
 * @FilePath: \src\layout\components\Tagsbar\index.vue
 * @Github: https://github.com/baici1/CTGUadmin
 -->
<template>
  <div class="tags-container">
    <el-scrollbar
      ref="scrollContainer"
      class="scroll-container"
      :vertical="false"
      @wheel.prevent="onScroll"
    >
      <router-link
        v-for="(tag, i) in tagList"
        :key="tag.fullPath"
        :to="tag"
        :ref="(el) => setItemRef(i, el)"
        custom
        v-slot="{ navigate, isExactActive }"
      >
        <div
          class="tags-item"
          :class="isExactActive ? 'active' : ''"
          @click="navigate"
          @click.middle="closeTag(tag)"
          @contextmenu.prevent="openMenu(tag, $event)"
        >
          <span class="title">{{ tag.title }}</span>
          <span
            v-if="!isAffix(tag)"
            class="el-icon-close"
            @click.prevent.stop="closeTag(tag)"
          />
        </div>
      </router-link>
    </el-scrollbar>
  </div>
  <ul
    v-show="visible"
    :style="{ left: left + 'px', top: top + 'px' }"
    class="contextmenu"
  >
    <li @click="refreshSelectedTag(selectedTag)">刷新</li>
    <li v-if="!isAffix(selectedTag)" @click="closeTag(selectedTag)">关闭</li>
    <li @click="closeOtherTags">关闭其他</li>
    <li @click="closeLeftTags">关闭左侧</li>
    <li @click="closeRightTags">关闭右侧</li>
    <li @click="closeAllTags">关闭全部</li>
  </ul>
</template>

<script>
import { useTags } from "./hook/useTags";
import { useContextMenu } from "./hook/useContextMenu";
export default {
  name: "tagsbar",
  setup() {
    const tags = useTags();
    console.log(
      "%c 🍪 tags: ",
      "font-size:20px;background-color: #7F2B82;color:#fff;",
      tags
    );
    const contextMenu = useContextMenu(tags.tagList);
    //绑定关于鼠标滑轮事件
    const onScroll = (e) => {
      tags.handleScroll(e);
      contextMenu.closeMenu.value();
    };

    return {
      onScroll,
      ...tags,
      ...contextMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.tags-container {
  height: 32px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #e0e4ef;
  &.hide {
    display: none;
  }
  .scroll-container {
    white-space: nowrap;
    overflow: hidden;
    ::v-deep(.el-scrollbar__bar) {
      bottom: 0px;
    }
  }

  .tags-item {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    color: #5c5c5c;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: -1px;
    vertical-align: bottom;
    cursor: pointer;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #303133;
      background: #f5f5f5;
    }
    .title {
      display: inline-block;
      vertical-align: top;
      max-width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .el-icon-close {
      color: #5c5c5c;
      margin-left: 8px;
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.8);
        display: inline-block;
        vertical-align: -2px;
      }
      &:hover {
        background-color: #333;
        color: #fff;
      }
    }
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: fixed;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  li {
    margin: 0;
    padding: 8px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
