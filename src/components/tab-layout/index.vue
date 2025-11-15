<template>
  <div id="app">
    <div class="nav-bar" v-if="showNav">
      <van-nav-bar
        title="股票"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="app-container">
      <main class="main-content" :style="contentStyle">
        <keep-alive :include="tabs">
          <router-view></router-view>
        </keep-alive>
      </main>
    </div>
    <div class="tab-bar" v-if="showTab">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabs: ["home", "strategy", "favorite", "profile"],
    };
  },
  computed: {
    showTab() {
      return this.$route.meta?.showTab;
    },
    showNav() {
      return this.$route.meta?.showNav;
    },
    contentStyle() {
      const marginTop = this.showNav ? "46px" : "0px";
      const marginBottom = this.showTab ? "50px" : "0px";
      const height = `calc(100% - ${marginTop} - ${marginBottom})`;
      return {
        marginTop,
        marginBottom,
        height,
        backgroundColor: 'red',
      };
    },
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>
<style lang="less" scoped>
#app {
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  position: relative;
}
.app-container {
  height: 100%;
  overflow: hidden;
}
.nav-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

.tab-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
