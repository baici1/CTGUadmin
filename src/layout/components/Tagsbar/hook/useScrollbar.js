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
 * @Date: 2021-08-04 14:49:08
 * @LastEditors: baici
 * @LastEditTime: 2021-08-04 16:16:41
 * @FilePath: \src\layout\components\Tagsbar\hook\useScrollbar.js
 * @Github: https://github.com/baici1/CTGUadmin
 */
//专门处理，tag处于的位置。
//如果此时tag超出了长度，隐藏起来，这个专门移动滑轮显示tag
import { ref } from "vue";

export const useScrollbar = (tagsItem) => {
  const scrollContainer = ref(null);

  const handleScroll = (e) => {
    const eventDelta = e.wheelDelta || -e.deltaY;
    scrollContainer.value.wrap.scrollLeft -= eventDelta / 4;
  };

  const moveToTarget = (currentTag) => {
    const containerWidth = scrollContainer.value.scrollbar.offsetWidth;
    const scrollWrapper = scrollContainer.value.wrap;
    const tagList = tagsItem.value;

    let firstTag = null;
    let lastTag = null;

    if (tagList.length > 0) {
      firstTag = tagList[0];
      lastTag = tagList[tagList.length - 1];
    }
    if (firstTag === currentTag) {
      scrollWrapper.scrollLeft = 0;
    } else if (lastTag === currentTag) {
      scrollWrapper.scrollLeft = scrollWrapper.scrollWidth - containerWidth;
    } else {
      const el = currentTag.$el.nextElementSibling;
      scrollWrapper.scrollLeft =
        el.offsetLeft + el.offsetWidth > containerWidth
          ? el.offsetLeft - el.offsetWidth
          : 0;
    }
  };

  return {
    scrollContainer,
    handleScroll,
    moveToTarget,
  };
};
