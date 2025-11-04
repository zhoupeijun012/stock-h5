<template>
  <div class="app-container">
    <main class="main-content">
      <router-view></router-view>
    </main>

    <van-tabbar class="app-tabbar" :value="$route.name" route>
      <van-tabbar-item replace name="home" to="/" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace name="strategy" to="/strategy" icon="bars">策略</van-tabbar-item>
      <van-tabbar-item replace name="favorite" to="/favorite" icon="star-o">收藏</van-tabbar-item>
      <van-tabbar-item replace name="profile" to="/profile" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { detectPwaMode } from "@/utils/tool.js";
import { Dialog } from "vant";
export default {
  name: "App",
  components: {},
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
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 50px;
}

.app-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
