/*
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
 * @Date: 2021-08-03 15:31:33
 * @LastEditors: baici
 * @LastEditTime: 2021-08-04 16:51:28
 * @FilePath: \src\layout\components\Tagsbar\hook\useContextMenu.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
import { reactive, onMounted, onBeforeUnmount, toRefs } from "vue";
import { nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { isAffix } from "./useTags";
//处理关闭事件
export const useContextMenu = (tagList) => {
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const state = reactive({
    visible: false,
    top: 0,
    left: 0,
    selectedTag: {},
    openMenu(tag, e) {
      state.visible = true; //是否显示
      state.left = e.clientX;
      state.top = e.clientY;
      state.selectedTag = tag; //被选中的tag
    },
    closeMenu() {
      state.visible = false;
    },
    //刷新
    refreshSelectedTag(tag) {
      store.commit("tags/DEL_CACHE_LIST", tag);
      const { fullPath } = tag;
      //进行重定向
      nextTick(() => {
        router.replace({ path: "/redirect" + fullPath });
      });
    },
    //关闭当前
    closeTag(tag) {
      if (isAffix(tag)) return;
      const closesTagIndex = tagList.value.findIndex(
        (item) => item.fullPath === tag.fullPath
      );
      store.dispatch("tags/delTag", tag);
      //如果当前tag执行关闭
      if (isActive(tag)) {
        //要去到上一个tag
        toLastTag(closesTagIndex - 1);
      }
    },
    //关闭其他
    closeOtherTags() {
      store.dispatch("tags/delOtherTags", state.selectedTag);
      console.log(
        "%c 🍹 state.selectedTag: ",
        "font-size:20px;background-color: #ED9EC7;color:#fff;",
        state.selectedTag
      );
      router.push(state.selectedTag);
    },
    //关闭一些
    closeSomeTags(direction) {
      const index = tagList.value.findIndex(
        (item) => item.fullPath === state.selectedTag.fullPath
      );
      //边界情况
      if (
        (direction == "left" && index <= 0) ||
        (direction == "right" && index >= tagList.value.length)
      ) {
        return;
      }
      const needToclose =
        direction === "left"
          ? tagList.value.slice(0, index)
          : tagList.value.slice(index + 1);

      store.dispatch("acttags/delSomeTagsion", needToclose);
      router.push(state.selectedTag);
    },
    //关闭左侧
    closeLeftTags() {
      state.closeSomeTags("left");
    },
    //关闭右侧
    closeRightTags() {
      state.closeSomeTags("right");
    },
    //关闭全部
    closeAllTags() {
      store.dispatch("tags/delAllTags");
      router.push("/");
    },
  });
  //判断是否是当前tag
  const isActive = (tag) => {
    return tag.fullPath === route.fullPath;
  };
  //去到上一个tag,否则回到首页
  const toLastTag = (lastTagIndex) => {
    const LastTag = tagList.value[lastTagIndex];
    if (LastTag) {
      router.push(LastTag.fullPath);
    } else {
      router.push("/");
    }
  };
  //加入点击事件
  onMounted(() => {
    document.addEventListener("click", state.closeMenu);
  });
  //关闭点击事件
  onBeforeUnmount(() => {
    document.removeEventListener("click", state.closeMenu);
  });
  return toRefs(state);
};
