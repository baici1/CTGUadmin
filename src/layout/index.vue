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
 * @Date: 2021-07-30 14:27:10
 * @LastEditors: baici
 * @LastEditTime: 2021-08-02 14:27:59
 * @FilePath: \src\layout\index.vue
 * @Github: https://github.com/baici1/CTGUadmin
 -->
<template>
  <div class="wrapper">
    <Sidebar></Sidebar>
    <div class="right">
      <div class="top"><topbar></topbar></div>
      <div class="main">main</div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar/index.vue";
import Topbar from "./components/Topbar/index.vue";
export default {
  components: {
    Sidebar,
    Topbar,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  .right {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .top {
      background: #fff;
    }
    .main {
      flex: 1;
      background: #f5f5f5;
      padding: 16px;
      overflow: auto;
    }
  }
}
</style>
