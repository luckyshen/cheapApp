<template>
  <ul class="menuBottomLine">
    <li class="li1"></li>
    <li class="li2"></li>
    <li class="li3"></li>
    <li class="li4"></li>
  </ul>
</template>

<script>
export default {
  props: ["text"]
};
</script>

<style lang="less" scoped>
@import '../assets/styles/mixin.less';
.menuBottomLine {
  display: flex;
  width: 100%;
  height: 10px;
  li {
    flex: 1;
    height: 100%;
  }
  .li1 {
    background-color: #665eff;
  }
  .li2 {
    background: #5773ff;
  }
  .li3 {
    background: #3497fd;
  }
  .li4 {
    background: #3acce1;
  }
}
</style>
