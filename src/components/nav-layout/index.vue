<template>
  <div class="app-container">
    <van-nav-bar
        title="股票"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
}
</script>
<style lang="less" scoped>
.app-container {
  height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  width: 100%;
  position: relative;
  left: 0;
  top: 0;
}

.main-content {
  overflow-y: auto;
  height: calc(100% - 50px);
}

.app-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
