<template>
  <i
    class="el-icon-s-fold fold-btn"
    :class="{ collapse: collapse }"
    @click="handleToggleMenu"
  >
  </i>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const collapse = computed(() => !!store.state.app.sidebar.collapse);
    const handleToggleMenu = () => {
      store.commit("app/setCollapse", +!collapse.value);
    };
    return {
      collapse,
      handleToggleMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.fold-btn {
  line-height: 48px;
  padding: 0 10px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
  &.collapse {
    transform: scale(-1, 1);
  }
}
</style>
