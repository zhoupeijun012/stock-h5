<template>
  <div class="app-container">
    <main class="main-content">
      <router-view></router-view>
    </main>

    <van-tabbar class="app-tabbar" :value="$route.name" route>
      <van-tabbar-item replace name="home" to="/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace name="strategy" to="/strategy" icon="bars"
        >策略</van-tabbar-item
      >
      <van-tabbar-item replace name="favorite" to="/favorite" icon="star-o"
        >收藏</van-tabbar-item
      >
      <van-tabbar-item replace name="profile" to="/profile" icon="user-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
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
