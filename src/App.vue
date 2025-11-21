<template>
  <div id="app">
    <main class="main-content" :style="contentStyle">
      <router-cache>
        <router-view></router-view>
      </router-cache>
    </main>
    <div class="tab-bar" v-if="showTab">
      <van-tabbar
        class="app-tabbar"
        active-color="#00c9a7"
        :value="$route.name"
        route
      >
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
import { detectPwaMode } from "@/utils/tool.js";
import AliveView from "@/components/alive-view";
import { Dialog } from "vant";
export default {
  name: "App",
  components: {
    AliveView,
  },
  computed: {
    showTab() {
      return this.$route.meta?.showTab;
    },
    contentStyle() {
      const marginBottom = this.showTab ? "50px" : "0px";
      const height = `calc(100% - ${marginBottom})`;
      return {
        marginBottom,
        height,
      };
    },
  },
  data() {
    return {};
  },
  mounted() {
    if (!detectPwaMode()) {
      navigator
        .getInstalledRelatedApps()
        .then((relatedApps) => {
          if (relatedApps.length > 0) {
            console.log("PWA已安装到主屏幕");
          } else {
            setTimeout(() => {
              if (window.pwaInstaller) {
                Dialog.confirm({
                  title: "提示",
                  message: "是否安装至桌面以提升体验?",
                })
                  .then(() => {
                    window.pwaInstaller.prompt();
                    window.pwaInstaller = null;
                  })
                  .catch(() => {
                    window.pwaInstaller = null;
                  });
              }
            }, 500);
          }
        })
        .catch((error) => {
          console.log("检测失败:", error);
        });
    }

    const channel = new BroadcastChannel("service-work");
    channel.onmessage = (event) => {
      const status = event.data;
      if (status == "UPDATED") {
        Dialog.confirm({
          title: "提示",
          message: "后台更新成功,是否使用最新版本?",
        })
          .then(() => {
            window.location.reload();
          })
          .catch(() => {});
      }
    };
  },
};
</script>

<style lang="less" scoped>
#app {
  box-sizing: border-box;
  overflow: hidden;
  margin-top: env(safe-area-inset-top);
  margin-bottom: env(safe-area-inset-bottom);
  height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  position: relative;
  background: rgb(243, 244, 245);
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
  /deep/.van-tabbar-item {
    font-weight: 700;
  }
}
</style>
