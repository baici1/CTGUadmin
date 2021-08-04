/*
 *
 * 　　┏┓　　　┏┓+ +
 * 　┏┛┻━━━┛┻┓ + +
 * 　┃　　　　　　　┃
 * 　┃　　　━　　　┃ ++ + + +
 *  ████━████ ┃+
 * 　┃　　　　　　　┃ +
 * 　┃　　　┻　　　┃
 * 　┃　　　　　　　┃ + +
 * 　┗━┓　　　┏━┛
 * 　　　┃　　　┃
 * 　　　┃　　　┃ + + + +
 * 　　　┃　　　┃
 * 　　　┃　　　┃ +  神兽保佑
 * 　　　┃　　　┃    代码无bug
 * 　　　┃　　　┃　　+
 * 　　　┃　 　　┗━━━┓ + +
 * 　　　┃ 　　　　　　　┣┓
 * 　　　┃ 　　　　　　　┏┛
 * 　　　┗┓┓┏━┳┓┏┛ + + + +
 * 　　　　┃┫┫　┃┫┫
 * 　　　　┗┻┛　┗┻┛+ + + +
 *
 *
 * @Date: 2021-08-03 15:57:07
 * @LastEditors: baici
 * @LastEditTime: 2021-08-04 16:43:50
 * @FilePath: \src\layout\components\Tagsbar\hook\useTags.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
import { computed, nextTick, onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useScrollbar } from "./useScrollbar";
export const isAffix = (tag) => {
  return !!tag.meta && !!tag.meta.affix;
};
export const useTags = () => {
  const store = useStore();
  const router = useRouter();
  const route = router.currentRoute; //获取当前路由
  const routes = computed(() => router.getRoutes()); //获取全部路由
  const tagList = computed(() => store.state.tags.tagList); //获取全部tag
  const tagsItem = ref([]);
  const setItemRef = (i, el) => {
    tagsItem.value[i] = el;
  };
  //处理此时滚轮事件
  const scrollbar = useScrollbar(tagsItem);
  //监控taglist
  watch(
    () => tagList.value.length,
    () => {
      tagsItem.value = [];
    }
  );
  //筛选固定的路由
  const filtersAffixTags = (routes) => {
    return routes.filter((route) => isAffix(route));
  };
  //初始化tags，添加固钉
  const initTags = () => {
    const affixTags = filtersAffixTags(routes.value);

    for (const tag of affixTags) {
      if (tag.name) {
        store.dispatch("tags/addTag", tag);
      }
    }
  };
  //添加tag
  const addTag = () => {
    const tag = route.value;

    if (!!tag.name && tag.matched[0].components.default.name === "layout") {
      store.dispatch("tags/addTag", tag);
    }
  };
  //获取激活的页面的位置
  const saveActivePosition = (tag) => {
    const index = tagList.value.findIndex(
      (item) => item.fullPath == tag.fullPath
    );
    store.dispatch("tags/saveActivePosition", Math.max(0, index));
  };
  //激活现在路由的tag
  const moveToCurrentTag = () => {
    //需要在 DOM 更新之后再执行一段代码时
    nextTick(() => {
      for (const tag of tagsItem.value) {
        if (!!tag && tag.to.path === route.value.path) {
          scrollbar.moveToTarget(tag);

          if (tag.to.fullPath !== route.value.fullPath) {
            store.dispatch("tags/updateTagList", route.value);
          }
          break;
        }
      }
    });
  };
  onBeforeMount(() => {
    initTags();
    addTag();
    moveToCurrentTag();
  });
  //监控此时路由，
  watch(route, (newRoute, oldRoute) => {
    saveActivePosition(oldRoute); //？？？
    addTag();
    moveToCurrentTag();
  });
  return {
    tagList,
    setItemRef,
    isAffix,
    ...scrollbar,
  };
};
