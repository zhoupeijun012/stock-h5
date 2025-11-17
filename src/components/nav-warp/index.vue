<template>
  <div class="nav-bar-wrap">
    <div class="nav-bar-top">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        class="nav-bar"
      />
    </div>
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="js">
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
}
</script>

<style  lang="less" scoped>
.nav-bar-wrap {
  height: 100%;
}
.nav-bar {
  /deep/.van-nav-bar__text {
    color: #000!important;
    font-size: 16px;
  }
  /deep/.van-icon {
    font-size: 18px;
    color: #000;
    line-height: 22px;
  }
}
.nav-bar-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.page-content {
  background-color: #f5f5f5;
  margin-top: 46px;
  height: calc(100% - 46px);
}
</style>
